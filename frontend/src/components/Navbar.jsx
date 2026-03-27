import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar-wrap">
      <div className="container navbar">
        <Link to="/" className="brand">
          <span className="brand-badge">A</span>
          <div>
            <div className="brand-name">Agrotech</div>
            <div className="brand-sub">Agro marketplace platformasi</div>
          </div>
        </Link>
        <nav className="nav-links">
          <NavLink to="/">Bosh sahifa</NavLink>
          <NavLink to="/marketplace">Marketplace</NavLink>
          <NavLink to="/mahsulot-qoshish">Mahsulot qo‘shish</NavLink>
          <NavLink to="/xarajatlar">Xarajatlar</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </div>
    </header>
  );
}
