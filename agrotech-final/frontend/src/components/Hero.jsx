import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="pill">Agrotech • Uzbekistan uchun</span>
          <h1>Dehqon mahsulotini tez sotadigan va xaridorni tez topadigan platforma</h1>
          <p>
            Agrotech orqali mahsulot joylang, xaridor toping, xarajatlarni kuzating va biznesingizni bitta joydan boshqaring.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/mahsulot-qoshish">Mahsulot qo‘shish</Link>
            <Link className="btn btn-secondary" to="/marketplace">Marketplace ko‘rish</Link>
          </div>
          <div className="hero-points">
            <span>• Real saqlanadigan ma’lumotlar</span>
            <span>• To‘liq o‘zbekcha interfeys</span>
            <span>• Xarajat hisobi bor</span>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-top">
            <strong>Bugungi imkoniyat</strong>
            <span>Investor-ready MVP</span>
          </div>
          <div className="hero-stats">
            <div><b>Marketplace</b><span>Mahsulotlar va lead tracking</span></div>
            <div><b>Xarajat</b><span>Foyda va sarfni nazorat qilish</span></div>
            <div><b>Dashboard</b><span>Hammasi bitta joyda</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
