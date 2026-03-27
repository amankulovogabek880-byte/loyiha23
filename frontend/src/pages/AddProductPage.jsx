import { useState } from 'react';
import { api } from '../api/client';
import SectionTitle from '../components/SectionTitle';

const initialForm = {
  farmerName: '',
  title: '',
  category: '',
  description: '',
  quantity: '',
  price: '',
  region: '',
  phone: '',
  image: '',
};

export default function AddProductPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.createProduct(form);
      setMessage('Mahsulot muvaffaqiyatli qo‘shildi');
      setError('');
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  }

  return (
    <section className="section">
      <div className="container narrow">
        <SectionTitle
          eyebrow="Yangi mahsulot"
          title="Agrotech marketplace uchun mahsulot joylang"
          text="Bu yerga kiritilgan ma’lumotlar real backendga saqlanadi va marketplace sahifasida ko‘rinadi."
        />
        <form className="card form-grid" onSubmit={handleSubmit}>
          <input placeholder="Dehqon ismi" value={form.farmerName} onChange={(e) => setForm({ ...form, farmerName: e.target.value })} required />
          <input placeholder="Mahsulot nomi" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input placeholder="Kategoriya" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
          <input placeholder="Hudud" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} required />
          <input placeholder="Miqdor (kg)" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required />
          <input placeholder="Narx (so‘m)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <input placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <input placeholder="Rasm URL (ixtiyoriy)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          <textarea placeholder="Mahsulot tavsifi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="5" />
          <button className="btn btn-primary full" type="submit">Mahsulotni saqlash</button>
          {message && <p className="success-text">{message}</p>}
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </section>
  );
}
