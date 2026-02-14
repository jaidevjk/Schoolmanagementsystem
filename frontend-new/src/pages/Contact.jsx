import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />

            {/* ================= HERO ================= */}
            <section className="relative h-[420px]">
                <img src="/photos/school image.JPG" className="h-full w-full object-cover" alt="Contact Hero" />

                <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-green-800/50 to-transparent"></div>

                <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Contact Us</h2>
                        <p className="text-lg md:text-xl text-green-200 font-semibold">
                            <Link to="/" className="hover:underline">Home</Link> <span className="mx-2">|</span> Contact
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= CONTACT SECTION ================= */}
            <section className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white">

                {/* Contact Form */}
                <div className="bg-green-50 p-8 rounded shadow">
                    <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                    <p className="text-gray-700 mb-6">
                        Have questions about admissions or academics? Fill out the form and we’ll get back to you.
                    </p>

                    <form className="space-y-4">
                        <input type="text" placeholder="Your Name"
                            className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-green-600" />

                        <input type="email" placeholder="Your Email"
                            className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-green-600" />

                        <textarea rows="5" placeholder="Your Message"
                            className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-green-600"></textarea>

                        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded font-semibold">
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Map + Info */}
                <div className="space-y-6">

                    {/* Google Map */}
                    <div className="h-72 w-full rounded shadow overflow-hidden">
                        <iframe
                            className="w-full h-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.0805541430377!2d77.71910077366789!3d12.773280519198186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6fe888a18521%3A0x7728675bf9806ac1!2sV%20Blooms%20D%20World%20School%20KA-455%20%2C%20KIDZEE!5e0!3m2!1sen!2sin!4v1770393772537!5m2!1sen!2sin"
                            title="School Location"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-green-50 p-6 rounded shadow space-y-3">
                        <h3 className="text-xl font-bold">Quick Contact</h3>

                        <p className="flex items-center gap-2">
                            <i className="fas fa-envelope text-green-700"></i>
                            vbloomsdworldschool@email.com
                        </p>

                        <p className="flex items-center gap-2">
                            <i className="fas fa-phone text-green-700"></i>
                            +91 7259411201
                        </p>

                        <p className="flex items-center gap-2">
                            <i className="fas fa-map-marker-alt text-green-700"></i>
                            QPFC+8M Madivala, Karnataka
                        </p>

                        <a href="/photos/School_Profile.pdf"
                            className="inline-block mt-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold">
                            Download School Profile
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};
export default Contact;
