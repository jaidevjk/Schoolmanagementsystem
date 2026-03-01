import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <>
      <div className="marquee-strip">
        <marquee>
          🎓 Admissions Open 2026 | Classes LKG to Grade 10 | Smart Classrooms | Holistic Education
          <Link to="/admission" className="marquee-cta">Apply Now →</Link>
        </marquee>
      </div>

      <section className="page-hero">
        <img src="/photos/school image.JPG" alt="Contact" className="page-hero-bg" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h2>Contact Us</h2>
          <p><Link to="/">Home</Link> <span className="mx-2">|</span> Contact</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-form-card">
          <h3>Get in Touch</h3>
          <p>Have questions about admissions or academics? Fill out the form and we'll get back to you.</p>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea rows="5" placeholder="Your Message" />
            <button type="submit" className="btn-contact">Send Message</button>
          </form>
        </div>
        <div className="contact-info-block">
          <div className="map-wrap">
            <iframe
              title="V Blooms D World School"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.0805541430377!2d77.71910077366789!3d12.773280519198186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6fe888a18521%3A0x7728675bf9806ac1!2sV%20Blooms%20D%20World%20School%20KA-455%20%2C%20KIDZEE!5e0!3m2!1sen!2sin!4v1770393772537!5m2!1sen!2sin"
              style={{ border: 0, width: '100%', height: '100%' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="contact-details">
            <h3>Quick Contact</h3>
            <p><i className="fas fa-envelope text-green-700" /> vbloomsdworldschool@email.com</p>
            <p><i className="fas fa-phone text-green-700" /> +91 7259411201</p>
            <p><i className="fas fa-map-marker-alt text-green-700" /> QPFC+8M Madivala, Karnataka</p>
          </div>
        </div>
      </section>
    </>
  );
}
