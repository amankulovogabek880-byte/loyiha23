import { useEffect, useState } from 'react';
import { api } from '../api/client';
import SectionTitle from '../components/SectionTitle';

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.getDashboard().then(setData);
  }, []);

  if (!data) {
    return <section className="section"><div className="container"><p>Dashboard yuklanmoqda...</p></div></section>;
  }

  const { stats, recentProducts, recentExpenses, recentLeads } = data;

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Dashboard"
          title="Agrotech boshqaruv paneli"
          text="Investor ko‘rsa tushunadigan, siz ishlatsangiz qulay bo‘ladigan asosiy ko‘rsatkichlar."
        />

        <div className="grid-four">
          <div className="card stat-box"><span>Jami mahsulot</span><strong>{stats.totalProducts}</strong></div>
          <div className="card stat-box"><span>Jami lead</span><strong>{stats.totalLeads}</strong></div>
          <div className="card stat-box"><span>Jami xarajat</span><strong>{stats.totalExpenseAmount.toLocaleString()} so‘m</strong></div>
          <div className="card stat-box"><span>O‘rtacha narx</span><strong>{stats.averageProductPrice.toLocaleString()} so‘m</strong></div>
        </div>

        <div className="two-col dashboard-lists">
          <div className="card list-box">
            <h3>So‘nggi mahsulotlar</h3>
            {recentProducts.map((item) => (
              <div className="list-row" key={item.id}><b>{item.title}</b><span>{item.region} • {item.price.toLocaleString()} so‘m</span></div>
            ))}
            {recentProducts.length === 0 && <p>Mahsulotlar hali yo‘q.</p>}
          </div>
          <div className="card list-box">
            <h3>So‘nggi xarajatlar</h3>
            {recentExpenses.map((item) => (
              <div className="list-row" key={item.id}><b>{item.title}</b><span>{item.amount.toLocaleString()} so‘m • {item.date}</span></div>
            ))}
            {recentExpenses.length === 0 && <p>Xarajatlar hali yo‘q.</p>}
          </div>
        </div>

        <div className="card list-box mt-24">
          <h3>So‘nggi leadlar</h3>
          {recentLeads.map((item) => (
            <div className="list-row" key={item.id}><b>{item.buyerName}</b><span>{item.productTitle} • {item.buyerPhone}</span></div>
          ))}
          {recentLeads.length === 0 && <p>Hozircha lead yo‘q.</p>}
        </div>
      </div>
    </section>
  );
}
