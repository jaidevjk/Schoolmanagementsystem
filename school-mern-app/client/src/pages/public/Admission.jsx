import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function Admission() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [form, setForm] = useState({
    parentName: '',
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    grade: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: '', text: '' });
    try {
      await api.post('/enquiry', {
        parentName: form.parentName,
        name: form.name,
        email: form.email,
        phonenumber: form.phone,
        dob: form.dob,
        gender: form.gender,
        address: form.address,
        grade: form.grade,
      });
      setMessage({ type: 'success', text: 'Enquiry Submitted Successfully! We will contact you soon.' });
      setForm({ parentName: '', name: '', email: '', phone: '', dob: '', gender: '', address: '', grade: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="marquee-strip">
        <marquee>
          🎓 Admissions Open 2026 | Classes LKG to Grade 10 | Smart Classrooms | Holistic Education
          <Link to="/admission" className="marquee-cta">Apply Now →</Link>
        </marquee>
      </div>

      <section className="page-hero">
        <img src="/photos/school image.JPG" alt="Admissions" className="page-hero-bg" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h2>Admissions Open 2026</h2>
          <p className="hero-tagline">LKG to Grade 10</p>
          <p>Begin your child's journey towards academic excellence, strong values, and holistic development at V Blooms D World School.</p>
        </div>
      </section>

      <section className="section-center">
        <h3>Why Choose V Blooms?</h3>
        <p>Our admissions process is simple, transparent, and parent-friendly. We focus on nurturing every child in a safe, disciplined, and joyful learning environment.</p>
      </section>

      <section className="section-alt">
        <h3 className="text-center">Classes Offered</h3>
        <div className="classes-grid">
          <div className="class-card">
            <i className="fas fa-child text-green-700" />
            <h4>Pre-Primary</h4>
            <p className="text-muted">LKG – UKG</p>
            <p>Play-based learning, phonics, rhymes, storytelling, and activity learning.</p>
          </div>
          <div className="class-card">
            <i className="fas fa-book text-blue-700" />
            <h4>Primary School</h4>
            <p className="text-muted">Grade 1 – Grade 5</p>
            <p>Strong foundation in academics, creativity, and life skills.</p>
          </div>
          <div className="class-card">
            <i className="fas fa-graduation-cap text-orange-600" />
            <h4>Middle & High School</h4>
            <p className="text-muted">Grade 6 – Grade 10</p>
            <p>Concept-based learning, exam preparation, and career guidance.</p>
          </div>
        </div>
      </section>

      <section className="section-center">
        <h3>Admission Process</h3>
        <div className="process-steps">
          <div className="process-step"><h4>Step 1</h4><p>Enquiry & Registration</p></div>
          <div className="process-step"><h4>Step 2</h4><p>Application Form</p></div>
          <div className="process-step"><h4>Step 3</h4><p>Interaction / Assessment</p></div>
          <div className="process-step"><h4>Step 4</h4><p>Admission Confirmation</p></div>
          <div className="process-step"><h4>Step 5</h4><p>Fee Payment & Enrollment</p></div>
        </div>
      </section>

      <section className="section-two-col section-alt apply-section">
        <div>
          <h3>Apply for Admission</h3>
          <p>Fill in the enquiry form and our admission team will contact you with complete details regarding the admission process.</p>
          <ul className="list-disc">
            <li>Transparent admission procedure</li>
            <li>Limited seats per class</li>
            <li>Safe & student-friendly environment</li>
          </ul>
        </div>
        <div className="form-card">
          <h4>Admission Enquiry</h4>
          <form onSubmit={handleSubmit}>
            <input name="parentName" value={form.parentName} onChange={handleChange} placeholder="Parent Name" required />
            <input name="name" value={form.name} onChange={handleChange} placeholder="Student Name" required />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
            <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
            <select name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
            <input name="grade" value={form.grade} onChange={handleChange} placeholder="Class Applying For" required />
            {message.text && <p className={message.type === 'success' ? 'form-success' : 'form-error'}>{message.text}</p>}
            <button type="submit" className="btn-submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Enquiry'}</button>
          </form>
        </div>
      </section>
    </>
  );
}
