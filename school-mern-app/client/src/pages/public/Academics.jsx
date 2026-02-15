import { Link } from 'react-router-dom';

export default function Academics() {
  return (
    <>
      <div className="marquee-strip">
        <marquee>
          🎓 Admissions Open 2026 | Classes LKG to Grade 10 | Smart Classrooms | Holistic Education
          <Link to="/admission" className="marquee-cta">Apply Now →</Link>
        </marquee>
      </div>

      <section className="page-hero">
        <img src="/photos/school image.JPG" alt="Academics" className="page-hero-bg" />
        <div className="page-hero-overlay academics-overlay" />
        <div className="page-hero-content">
          <h2>Academics</h2>
          <p className="hero-tagline">From Strong Foundations to Future Success</p>
          <p>Our academic framework focuses on conceptual clarity, confidence building, discipline, and holistic development from early years to high school.</p>
        </div>
      </section>

      <section className="section-center">
        <h3>Academic Excellence</h3>
        <p>V Blooms D World School follows a structured, student-friendly curriculum that balances academics, values, and life skills. Our approach nurtures curiosity, creativity, and critical thinking at every stage of learning.</p>
      </section>

      <section className="curriculum-section">
        <div className="curriculum-card">
          <i className="fas fa-child text-green-700" />
          <h4>Pre-Primary</h4>
          <p className="text-muted">LKG – UKG</p>
          <p>Play-based learning through rhymes, storytelling, art, and activities that develop language, numeracy, motor skills, and social confidence.</p>
        </div>
        <div className="curriculum-card">
          <i className="fas fa-book-open text-green-700" />
          <h4>Primary School</h4>
          <p className="text-muted">Grade 1 – Grade 5</p>
          <p>Strong foundation in languages, mathematics, EVS, computers, and creative subjects through activity-based and experiential learning.</p>
        </div>
        <div className="curriculum-card">
          <i className="fas fa-graduation-cap text-green-700" />
          <h4>Middle & High School</h4>
          <p className="text-muted">Grade 6 – Grade 10</p>
          <p>Concept-driven, exam-oriented curriculum with science, mathematics, languages, social studies, and career readiness guidance.</p>
        </div>
      </section>

      <section className="section-center">
        <h3>Subjects Offered</h3>
        <div className="subjects-two-col">
          <ul className="list-disc">
            <li>English Language & Literature</li>
            <li>Mathematics</li>
            <li>Science (Physics, Chemistry, Biology)</li>
            <li>Social Studies</li>
            <li>Environmental Studies</li>
          </ul>
          <ul className="list-disc">
            <li>Computer Science</li>
            <li>Second & Third Languages</li>
            <li>General Knowledge</li>
            <li>Value & Moral Education</li>
            <li>Physical Education & Yoga</li>
          </ul>
        </div>
      </section>

      <section className="section-two-col section-alt">
        <div>
          <h3>Teaching Methodology</h3>
          <p>Smart classrooms, interactive teaching, digital tools, group activities, and hands-on learning make lessons engaging and effective.</p>
          <p>Continuous assessment and personalized feedback help students improve academically and build confidence.</p>
        </div>
        <img src="/photos/gallery 4.JPG" alt="Teaching" className="section-img" />
      </section>

      <section className="strengths-section">
        <h3>Our Academic Strengths</h3>
        <div className="strengths-grid">
          <div className="strength-card">
            <i className="fas fa-lightbulb text-green-700" />
            <h4>Concept-Based Learning</h4>
            <p>Focus on understanding concepts clearly rather than rote memorization.</p>
          </div>
          <div className="strength-card">
            <i className="fas fa-brain text-blue-700" />
            <h4>Critical Thinking</h4>
            <p>Encouraging analytical thinking, problem-solving, and creativity.</p>
          </div>
          <div className="strength-card">
            <i className="fas fa-user-check text-orange-600" />
            <h4>Individual Attention</h4>
            <p>Personalized mentoring and remedial support for every learner.</p>
          </div>
        </div>
      </section>
    </>
  );
}
