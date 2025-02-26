import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await api.get(`/products/${id}`);
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load product');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await api.delete(`/products/${id}`);
      navigate('/');
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!product) return <div className="text-center">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={product.image_url || 'https://via.placeholder.com/300'}
              alt={product.name}
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
              <p className="text-2xl font-bold text-blue-600">${product.price}</p>
            </div>
            <p className="mt-4 text-gray-600">{product.description}</p>
            <p className="mt-2 text-gray-500">Stock: {product.stock} units</p>

            {user && (
              <div className="mt-6 flex gap-4">
                <Link
                  to={`/products/edit/${id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails; 