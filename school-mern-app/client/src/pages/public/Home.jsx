import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="marquee-strip">
        <marquee>
          🎓 Admissions Open 2026 | Classes LKG to Grade 10 | Smart Classrooms | Holistic Education
          <Link to="/admission" className="marquee-cta">Apply Now →</Link>
        </marquee>
      </div>

      <section className="hero-section">
        <img src="/photos/school image.JPG" alt="V Blooms D World School" className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h2>Shaping Young Minds for a Bright Future</h2>
          <p className="hero-tagline">Quality Education • Strong Values • Modern Learning</p>
          <p className="hero-desc">
            At V Blooms D World School, we provide a safe, engaging, and
            student-centered environment where children grow academically,
            socially, and emotionally.
          </p>
          <Link to="/about" className="btn-hero">Discover Our School</Link>
        </div>
      </section>

      <section className="highlights-section">
        <div className="highlight-card">
          <i className="fas fa-chalkboard-teacher" />
          <h3>Expert Faculty</h3>
          <p>Qualified & caring teachers</p>
        </div>
        <div className="highlight-card">
          <i className="fas fa-laptop" />
          <h3>Smart Learning</h3>
          <p>Digital classrooms & labs</p>
        </div>
        <div className="highlight-card">
          <i className="fas fa-book-reader" />
          <h3>Strong Academics</h3>
          <p>Concept-based curriculum</p>
        </div>
        <div className="highlight-card">
          <i className="fas fa-heart" />
          <h3>Holistic Growth</h3>
          <p>Sports, values & life skills</p>
        </div>
      </section>

      <section className="about-preview section-alt">
        <img src="/photos/about image 1.jfif" alt="Why Choose Us" className="about-preview-img" />
        <div>
          <h3>Why Choose Us?</h3>
          <p>
            We believe every child is unique. Our teaching approach focuses on
            academic excellence, discipline, creativity, and moral values.
          </p>
          <Link to="/about" className="link-green">Learn More →</Link>
        </div>
      </section>

      <section className="cta-section">
        <h3>Admissions Open for 2026</h3>
        <p>
          Give your child the best start with quality education, experienced faculty,
          and a caring learning environment at V Blooms D World School.
        </p>
        <div className="cta-buttons">
          <Link to="/admission" className="btn-cta primary">Apply for Admission</Link>
          <Link to="/contact" className="btn-cta outline">Contact Us</Link>
        </div>
      </section>

      <section className="gallery-preview">
        <h2>Life at Our School</h2>
        <div className="gallery-grid">
          <img src="/photos/gallery 1.JPG" alt="Gallery" />
          <img src="/photos/gallery 2.JPG" alt="Gallery" />
          <img src="/photos/gallery 3.JPG" alt="Gallery" />
          <img src="/photos/gallery 4.JPG" alt="Gallery" />
        </div>
        <Link to="/gallery" className="btn-gallery">View Full Gallery →</Link>
      </section>
    </>
  );
}
