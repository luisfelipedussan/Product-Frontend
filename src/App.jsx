import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
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
        <div className="flex flex-col min-h-screen w-full bg-gray-50">
          <Navbar />
          <div className="flex-grow w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
              <main className="py-10">
                <Routes>
                  {/* Public Route */}
                  <Route path="/login" element={<Login />} />

                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute />}>
                    {/* More specific routes first */}
                    <Route path="/products/new" element={<ProductForm />} />
                    <Route path="/products/edit/:id" element={<ProductForm />} />
                    {/* Then dynamic routes */}
                    <Route path="/products/:id" element={<ProductDetails />} />
                    {/* Then general routes */}
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/" element={<Navigate to="/products" replace />} />
                  </Route>

                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/products" replace />} />
                </Routes>
              </main>
            </div>
          </div>
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
