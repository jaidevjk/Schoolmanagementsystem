import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <div className="marquee-strip">
        <marquee>
          🎓 Admissions Open 2026 | Classes LKG to Grade 10 | Smart Classrooms | Holistic Education
          <Link to="/admission" className="marquee-cta">Apply Now →</Link>
        </marquee>
      </div>

      <section className="page-hero">
        <img src="/photos/school image.JPG" alt="About" className="page-hero-bg" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h2>About Our School</h2>
          <p>A place where knowledge meets values, learning meets creativity, and students grow into confident and responsible individuals.</p>
        </div>
      </section>

      <section className="section-two-col">
        <img src="/photos/about images 2.jfif" alt="Who We Are" className="section-img" />
        <div>
          <h3 className="text-green-800">Who We Are</h3>
          <p>V Blooms D World School is committed to providing quality education in a safe, supportive, and disciplined environment. We focus on nurturing young minds with strong academic foundations and moral values.</p>
          <p>Our experienced faculty believes in personalized attention, helping each child discover their strengths and build confidence.</p>
          <p>With modern facilities and innovative teaching methods, we prepare students for academic success and life beyond classrooms.</p>
        </div>
      </section>

      <section className="philosophy-section">
        <h3>Our Philosophy</h3>
        <div className="philosophy-grid">
          <div className="philosophy-card">
            <img src="/photos/about image 1.jfif" alt="Mission" className="philosophy-icon" />
            <h4 className="text-green-700">Our Mission</h4>
            <p>To create a nurturing learning environment that inspires academic excellence, ethical values, confidence, and lifelong learning.</p>
          </div>
          <div className="philosophy-card">
            <img src="/photos/about images 4.jfif" alt="Learn" className="philosophy-icon" />
            <h4 className="text-blue-700">Learn</h4>
            <p>We encourage curiosity and creativity through interactive teaching, activity-based learning, smart classrooms, and practical exposure.</p>
          </div>
          <div className="philosophy-card">
            <img src="/photos/about images 3.jfif" alt="Grow" className="philosophy-icon" />
            <h4 className="text-purple-700">Grow</h4>
            <p>Our focus extends beyond academics, helping students develop leadership, discipline, emotional intelligence, and social responsibility.</p>
          </div>
        </div>
      </section>

      <section className="section-two-col facilities-section">
        <div>
          <h3 className="text-green-800">Our Facilities</h3>
          <p>Our campus is equipped with modern infrastructure to support effective learning and student development.</p>
          <ul className="list-disc">
            <li>Smart & spacious classrooms</li>
            <li>Science and computer laboratories</li>
            <li>Library with academic resources</li>
            <li>Sports ground & activity areas</li>
            <li>Safe & secure campus</li>
          </ul>
        </div>
        <img src="/photos/about images 5.jfif" alt="Facilities" className="section-img" />
      </section>

      <section className="cta-section">
        <h3>Want to Know More?</h3>
        <p>We welcome parents and guardians to visit our campus and interact with us.</p>
        <Link to="/contact" className="btn-cta primary">Contact Us</Link>
      </section>
    </>
  );
}
