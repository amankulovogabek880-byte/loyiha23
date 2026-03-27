import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import ExpenseCard from '../components/ExpenseCard';
import SectionTitle from '../components/SectionTitle';

const emptyForm = { title: '', amount: '', category: '', date: '', note: '' };

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [categoryFilter, setCategoryFilter] = useState('');

  async function loadExpenses() {
    const data = await api.getExpenses();
    setExpenses(data);
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  const filtered = useMemo(() => {
    if (!categoryFilter) return expenses;
    return expenses.filter((item) => item.category.toLowerCase().includes(categoryFilter.toLowerCase()));
  }, [expenses, categoryFilter]);

  const total = filtered.reduce((sum, item) => sum + item.amount, 0);

  async function handleSubmit(e) {
    e.preventDefault();
    await api.createExpense(form);
    setForm(emptyForm);
    loadExpenses();
  }

  async function handleDelete(id) {
    if (!confirm('Xarajatni o‘chirmoqchimisiz?')) return;
    await api.deleteExpense(id);
    loadExpenses();
  }

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Xarajat hisoblovchi"
          title="Fermangizdagi sarf-xarajatlarni kuzating"
          text="Urug‘, transport, ishchi kuchi va boshqa xarajatlarni yozib boring."
        />

        <div className="stats-row">
          <div className="card stat-box"><span>Jami yozuv</span><strong>{filtered.length}</strong></div>
          <div className="card stat-box"><span>Jami xarajat</span><strong>{total.toLocaleString()} so‘m</strong></div>
          <div className="card stat-box"><span>Filtr</span><input placeholder="Kategoriya bo‘yicha" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} /></div>
        </div>

        <div className="two-col">
          <form className="card form-grid" onSubmit={handleSubmit}>
            <h3>Yangi xarajat qo‘shish</h3>
            <input placeholder="Xarajat nomi" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <input placeholder="Summasi" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            <input placeholder="Kategoriya" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            <textarea placeholder="Izoh" rows="4" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
            <button className="btn btn-primary full" type="submit">Xarajatni saqlash</button>
          </form>

          <div className="stack-list">
            {filtered.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} onDelete={handleDelete} />
            ))}
            {filtered.length === 0 && <div className="empty-box">Hozircha xarajat yozuvi yo‘q.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
