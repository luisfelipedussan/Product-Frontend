import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(isEditing);
  const [productData, setProductData] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm();

  useEffect(() => {
    if (isEditing) {
      loadProduct();
    }
  }, [id]);

  useEffect(() => {
    if (productData) {
      setValue('name', productData.name);
      setValue('description', productData.description);
      setValue('price', productData.price);
      setValue('stock', productData.stock);
    }
  }, [productData, setValue]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await api.getProduct(id);
      setProductData(data);
    } catch (error) {
      console.error('Failed to load product:', error);
      toast.error('Failed to load product');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await api.updateProduct(id, data);
        toast.success('Product updated successfully!');
      } else {
        await api.createProduct(data);
        toast.success('Product created successfully!');
      }
      navigate('/products');
    } catch (error) {
      console.error('Failed to save product:', error);
      toast.error(error.message || 'Failed to save product');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
            {...register('name', { 
              required: 'Name is required',
              minLength: { value: 3, message: 'Name must be at least 3 characters' }
            })}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            {...register('description', { 
              required: 'Description is required',
              minLength: { value: 10, message: 'Description must be at least 10 characters' }
            })}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.stock && (
            <span className="text-red-500 text-sm">{errors.stock.message}</span>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm; 