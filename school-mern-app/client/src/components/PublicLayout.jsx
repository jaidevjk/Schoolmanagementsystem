import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/academics', label: 'Academics' },
  { to: '/admission', label: 'Admissions' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export default function PublicLayout() {
  const [logoError, setLogoError] = useState(false);
  return (
    <div className="public-site">
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand">
            {!logoError ? (
              <img src="/photos/WhatsApp Image 2026-02-03 at 12.16.48 PM.jpeg" alt="V Blooms D World School" className="logo-img" onError={() => setLogoError(true)} />
            ) : (
              <span className="logo-fallback">VB</span>
            )}
            <h1 className="brand-title">V BLOOMS D WORLD SCHOOL</h1>
          </NavLink>
          <nav className="site-nav">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>
            ))}
            <NavLink to="/login" className="nav-link login-link">Login</NavLink>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <h3>Contact Us</h3>
            <p>Email: vbloomsdworldschool@email.com</p>
            <p>Phone: +91 7259411201</p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/academics">Academics</NavLink></li>
              <li><NavLink to="/admission">Admissions</NavLink></li>
            </ul>
          </div>
          <div>
            <h3>Follow Us</h3>
            <div className="footer-social">
              <i className="fab fa-facebook" aria-hidden></i>
              <i className="fab fa-instagram" aria-hidden></i>
              <i className="fab fa-twitter" aria-hidden></i>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
