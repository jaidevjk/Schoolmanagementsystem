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

const campusImgs = galleryImages.slice(0, 6);
const culturalsImgs = galleryImages.slice(0, 6).reverse();
const sportsImgs = galleryImages.slice(1, 7);
const eventsImgs = ['/photos/gallery 1.JPG', '/photos/gallery 3.JPG', '/photos/gallery 2.JPG', '/photos/gallery 4.JPG'];
const activitiesImgs = galleryImages.concat(galleryImages);
const yogaImgs = galleryImages.slice(0, 5);

export default function Gallery() {
  return (
    <div className="gallery-page">
      {/* MARQUEE */}
      <div className="marquee-strip">
        <marquee>
          🎓 Admissions Open 2026 | Classes LKG to Grade 10 | Smart Classrooms | Holistic Education
          <Link to="/admission" className="marquee-cta">Apply Now →</Link>
        </marquee>
      </div>
      {/* header removed (use app-level header) */}

      {/* HERO */}
      <section style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
        <img src="/photos/school image.JPG" alt="school" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(4,120,87,0.8), rgba(16,185,129,0.3), transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: '#fff', padding: '0 16px' }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 8 }}>Our Gallery</h2>
            <p style={{ color: '#bbf7d0', fontSize: 18 }}>Celebrating Learning, Creativity & Achievements</p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section style={{ padding: 40, background: '#fff', textAlign: 'center' }}>
        <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Life at V Blooms D World School</h3>
        <p style={{ maxWidth: 880, margin: '0 auto', color: '#4b5563', lineHeight: 1.7 }}>
          Our gallery reflects the vibrant atmosphere of our school campus, showcasing joyful learning moments,
          celebrations, sports activities, and student achievements that shape confident and responsible learners.
        </p>
      </section>

      {/* CAMPUS */}
      <section style={{ padding: 40, background: '#f3f4f6' }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>Campus</h3>
        <p style={{ textAlign: 'center', color: '#4b5563', maxWidth: 640, margin: '0 auto 18px' }}>A safe, spacious, and child-friendly campus designed to encourage learning, creativity, and overall development.</p>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 16, animation: 'scroll 25s linear infinite' }}>
            {campusImgs.map((src, i) => (
              <img key={i} src={src} alt={`campus-${i}`} style={{ height: 192, borderRadius: 8, objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* Culturals */}
      <section style={{ padding: 40, background: '#fff' }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>Culturals</h3>
        <p style={{ textAlign: 'center', color: '#4b5563', maxWidth: 640, margin: '0 auto 18px' }}>Festivals, annual days, competitions, and cultural programs help students express creativity, confidence, and teamwork.</p>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 16, animation: 'scroll 30s linear infinite' }}>
            {culturalsImgs.map((src, i) => (
              <img key={i} src={src} alt={`cultural-${i}`} style={{ height: 192, borderRadius: 8, objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* SPORTS */}
      <section style={{ padding: 40, background: '#f3f4f6' }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>Sports</h3>
        <p style={{ textAlign: 'center', color: '#4b5563', maxWidth: 640, margin: '0 auto 18px' }}>Physical education and sports activities build discipline, teamwork, leadership qualities, and a healthy lifestyle among students.</p>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 16, animation: 'scroll 28s linear infinite' }}>
            {sportsImgs.map((src, i) => (
              <img key={i} src={src} alt={`sports-${i}`} style={{ height: 192, borderRadius: 8, objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section style={{ padding: 40, background: '#fff' }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>Events</h3>
        <p style={{ textAlign: 'center', color: '#4b5563', maxWidth: 640, margin: '0 auto 18px' }}>Our school celebrates various events such as Annual Day, Festivals, Competitions, Educational Programs, and Special Assemblies that encourage student participation, confidence, and cultural awareness.</p>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 16, animation: 'scroll 30s linear infinite' }}>
            {eventsImgs.map((src, i) => (
              <img key={i} src={src} alt={`event-${i}`} style={{ height: 192, borderRadius: 8, objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section style={{ padding: 40, background: '#f3f4f6' }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>Activities</h3>
        <p style={{ textAlign: 'center', color: '#4b5563', maxWidth: 640, margin: '0 auto 18px' }}>A variety of classroom and outdoor activities such as art & craft, drawing, storytelling, science experiments, yoga, music, dance, and group activities help students develop creativity, discipline, and life skills.</p>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 16, animation: 'scroll 28s linear infinite' }}>
            {activitiesImgs.slice(0, 12).map((src, i) => (
              <img key={i} src={src} alt={`activity-${i}`} style={{ height: 192, borderRadius: 8, objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* YOGA & WELLNESS */}
      <section style={{ padding: 40, background: '#fff' }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>Yoga & Wellness</h3>
        <p style={{ textAlign: 'center', color: '#4b5563', maxWidth: 640, margin: '0 auto 18px' }}>Yoga is an integral part of our school curriculum. Regular yoga sessions help students improve concentration, flexibility, discipline, and mental well-being.</p>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 16, animation: 'scroll 27s linear infinite' }}>
            {yogaImgs.map((src, i) => (
              <img key={i} src={src} alt={`yoga-${i}`} style={{ height: 192, borderRadius: 8, objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* footer removed (use app-level footer) */}
      <style>{`@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
