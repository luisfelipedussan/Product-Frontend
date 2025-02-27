const API_URL = 'http://localhost:8000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_URL}/${endpoint}`;
    
    // Debug log
    console.log('Making request to:', url, {
      method: options.method || 'GET',
      body: options.body
    });

    const response = await fetch(url, {
      ...options,
      headers: this.getHeaders(),
    });

    // For DELETE requests that return 204 No Content
    if (response.status === 204) {
      return null;
    }

    // For other responses
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    const data = await response.json();

    // Debug logs
    console.log('API Request:', {
      url,
      method: options.method || 'GET',
      status: response.status,
      response: data
    });

    return data;
  }

  // Auth endpoints
  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // Update these methods to NOT include /api prefix since it's in API_URL
  login(credentials) {
    return this.request('login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  logout() {
    return this.request('logout', {
      method: 'POST',
    });
  }

  // Products endpoints
  getProducts() {
    return this.request('products');
  }

  getProduct(id) {
    return this.request(`products/${id}`);
  }

  createProduct(data) {
    return this.request('products', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  updateProduct(id, data) {
    return this.request(`products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  deleteProduct(id) {
    return this.request(`products/${id}`, {
      method: 'DELETE'
    });
  }
}

export const api = new ApiService(); 