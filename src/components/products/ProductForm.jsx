import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isEditing) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await api.get(`/products/${id}`);
      reset(data);
    } catch (error) {
      console.error('Failed to load product:', error);
      navigate('/');
    }
  };

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await api.put(`/products/${id}`, data);
      } else {
        await api.post('/products', data);
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Product' : 'Create New Product'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="w-full p-2 border rounded"
            rows="4"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description.message}</span>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            step="0.01"
            {...register('price', { 
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' }
            })}
            className="w-full p-2 border rounded"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Stock</label>
          <input
            type="number"
            {...register('stock', { 
              required: 'Stock is required',
              min: { value: 0, message: 'Stock must be positive' }
            })}
            className="w-full p-2 border rounded"
          />
          {errors.stock && (
            <span className="text-red-500 text-sm">{errors.stock.message}</span>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Saving...' : 'Save Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm; 