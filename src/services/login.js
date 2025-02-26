const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      console.log('Intentando login con:', { 
        email, 
        passwordLength: password.length 
      });
  
      const response = await login({ email, password });
      console.log('Login exitoso:', response);
      navigate(from, { replace: true });
  
    } catch (err) {
      console.error('Error en login:', err);
      
      // Manejar diferentes tipos de errores
      if (err.response?.status === 401) {
        setError('Credenciales incorrectas');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al intentar iniciar sesión');
      }
    } finally {
      setIsLoading(false);
    }
  };