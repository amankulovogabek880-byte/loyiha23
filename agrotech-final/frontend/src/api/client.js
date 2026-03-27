const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'So‘rovda xatolik' }));
    throw new Error(error.message || 'So‘rovda xatolik');
  }

  return res.json();
}

export const api = {
  getProducts: (params = '') => request(`/products${params}`),
  getDashboard: () => request('/dashboard'),
  getExpenses: () => request('/expenses'),
  getLeads: () => request('/leads'),
  createProduct: (data) => request('/products', { method: 'POST', body: JSON.stringify(data) }),
  deleteProduct: (id) => request(`/products/${id}`, { method: 'DELETE' }),
  createExpense: (data) => request('/expenses', { method: 'POST', body: JSON.stringify(data) }),
  deleteExpense: (id) => request(`/expenses/${id}`, { method: 'DELETE' }),
  createLead: (data) => request('/leads', { method: 'POST', body: JSON.stringify(data) }),
};
