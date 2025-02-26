import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

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
      setLoading(true);
      const response = await api.getProduct(id);
      console.log('Product data:', response);

      if (response && response.data) {
        setProduct(response.data);
      } else if (response) {
        setProduct(response);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (err) {
      console.error('Error loading product:', err);
      setError('Failed to load product');
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await api.deleteProduct(id);
      toast.success('Product deleted successfully');
      navigate('/products');
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
      toast.error('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button
          onClick={loadProduct}
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <div className="text-gray-500 text-lg">Product not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
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
                  className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
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