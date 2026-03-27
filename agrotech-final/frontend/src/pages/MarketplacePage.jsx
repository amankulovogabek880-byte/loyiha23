import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';

export default function MarketplacePage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ search: '', category: '', region: '', sort: 'newest' });
  const [leadForm, setLeadForm] = useState({ open: false, productId: null, buyerName: '', buyerPhone: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.region) params.append('region', filters.region);
    if (filters.sort) params.append('sort', filters.sort);
    const q = params.toString();
    return q ? `?${q}` : '';
  }, [filters]);

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await api.getProducts(query);
      setProducts(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, [query]);

  async function handleDelete(id) {
    if (!confirm('Mahsulotni o‘chirmoqchimisiz?')) return;
    await api.deleteProduct(id);
    loadProducts();
  }

  async function submitLead(e) {
    e.preventDefault();
    await api.createLead({
      productId: leadForm.productId,
      buyerName: leadForm.buyerName,
      buyerPhone: leadForm.buyerPhone,
    });
    alert('Bog‘lanish so‘rovi yuborildi');
    setLeadForm({ open: false, productId: null, buyerName: '', buyerPhone: '' });
  }

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Marketplace"
          title="Real mahsulotlar bozori"
          text="Fake data yo‘q. Siz qo‘shgan mahsulotlar backendga saqlanadi va shu yerda ko‘rinadi."
        />

        <div className="card filter-bar">
          <input placeholder="Mahsulot qidirish" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
          <input placeholder="Kategoriya" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} />
          <input placeholder="Hudud" value={filters.region} onChange={(e) => setFilters({ ...filters, region: e.target.value })} />
          <select value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
            <option value="newest">Eng yangi</option>
            <option value="price_asc">Narx o‘sish bo‘yicha</option>
            <option value="price_desc">Narx kamayish bo‘yicha</option>
          </select>
        </div>

        {loading ? <p>Yuklanmoqda...</p> : error ? <p className="error-text">{error}</p> : null}

        <div className="grid-products">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onConnect={(p) => setLeadForm({ open: true, productId: p.id, buyerName: '', buyerPhone: '' })}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {!loading && products.length === 0 && <div className="empty-box">Hozircha mahsulot yo‘q. Birinchi mahsulotni o‘zingiz qo‘shing.</div>}

        {leadForm.open && (
          <div className="modal-backdrop">
            <div className="modal card">
              <h3>Bog‘lanish so‘rovi</h3>
              <form onSubmit={submitLead} className="form-grid">
                <input placeholder="Ismingiz" value={leadForm.buyerName} onChange={(e) => setLeadForm({ ...leadForm, buyerName: e.target.value })} required />
                <input placeholder="Telefon raqamingiz" value={leadForm.buyerPhone} onChange={(e) => setLeadForm({ ...leadForm, buyerPhone: e.target.value })} required />
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setLeadForm({ open: false, productId: null, buyerName: '', buyerPhone: '' })}>Bekor qilish</button>
                  <button type="submit" className="btn btn-primary">Yuborish</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
