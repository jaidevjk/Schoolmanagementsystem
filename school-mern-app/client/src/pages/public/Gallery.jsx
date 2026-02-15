import { Link } from 'react-router-dom';

const galleryImages = [
  '/photos/gallery 1.JPG',
  '/photos/gallery 2.JPG',
  '/photos/gallery 3.JPG',
  '/photos/gallery 4.JPG',
  '/photos/about image 1.jfif',
  '/photos/about images 2.jfif',
  '/photos/about images 3.jfif',
  '/photos/about images 4.jfif',
  '/photos/about images 5.jfif',
];

export default function Gallery() {
  return (
    <>
      <div className="marquee-strip">
        <marquee>
          🎓 Admissions Open 2026 | Classes LKG to Grade 10 | Smart Classrooms | Holistic Education
          <Link to="/admission" className="marquee-cta">Apply Now →</Link>
        </marquee>
      </div>

      <section className="page-hero">
        <img src="/photos/school image.JPG" alt="Gallery" className="page-hero-bg" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h2>Our Gallery</h2>
          <p>Celebrating Learning, Creativity & Achievements</p>
        </div>
      </section>

      <section className="section-center">
        <h3>Life at V Blooms D World School</h3>
        <p>Our gallery reflects the vibrant atmosphere of our school campus, showcasing joyful learning moments, celebrations, sports activities, and student achievements that shape confident and responsible learners.</p>
      </section>

      <section className="gallery-grid-section">
        <h3>Campus & Activities</h3>
        <p className="gallery-intro">A safe, spacious, and child-friendly campus designed to encourage learning, creativity, and overall development.</p>
        <div className="gallery-masonry">
          {galleryImages.map((src, i) => (
            <img key={i} src={src} alt={`Gallery ${i + 1}`} className="gallery-item" />
          ))}
        </div>
      </section>
    </>
  );
}
