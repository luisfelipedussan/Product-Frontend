import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import ProductList from './components/products/ProductList';
import ProductDetails from './components/products/ProductDetails';
import ProductForm from './components/products/ProductForm';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/products/edit/:id" element={<ProductForm />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
