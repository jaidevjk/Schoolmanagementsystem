import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />

            {/* ================= MARQUEE ================= */}
            <marquee className="bg-gradient-to-r from-blue-900 to-purple-800 text-white py-2 font-semibold">
                🎓 Admissions Open 2026 | Classes LKG to Grade 10 | Smart Classrooms | Holistic Education
                <Link to="/admission" className="ml-4 bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded-full font-bold inline-block no-underline">
                    Apply Now →
                </Link>
            </marquee>

            {/* ================= HERO ================= */}
            <section className="relative h-[420px]">
                {/* Background Image */}
                <img
                    src="/photos/school image.JPG"
                    className="h-full w-full object-cover"
                    alt="School Building"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-green-800/50 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                            Shaping Young Minds for a Bright Future
                        </h2>

                        <p className="text-lg md:text-xl text-green-200 font-semibold mb-3">
                            Quality Education • Strong Values • Modern Learning
                        </p>

                        <p className="max-w-3xl mx-auto text-gray-100 leading-7 mb-6">
                            At V Blooms D World School, we provide a safe, engaging, and
                            student-centered environment where children grow academically,
                            socially, and emotionally.
                        </p>

                        <Link to="/about" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg inline-block">
                            Discover Our School
                        </Link>
                    </div>
                </div>
            </section>

            {/* ================= HIGHLIGHTS ================= */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-10 bg-white text-center">
                <div className="p-6 rounded shadow bg-green-50">
                    <i className="fas fa-chalkboard-teacher text-4xl text-green-700 mb-3"></i>
                    <h3 className="font-bold text-lg">Expert Faculty</h3>
                    <p className="text-gray-600 text-sm">Qualified & caring teachers</p>
                </div>

                <div className="p-6 rounded shadow bg-blue-50">
                    <i className="fas fa-laptop text-4xl text-blue-700 mb-3"></i>
                    <h3 className="font-bold text-lg">Smart Learning</h3>
                    <p className="text-gray-600 text-sm">Digital classrooms & labs</p>
                </div>

                <div className="p-6 rounded shadow bg-orange-50">
                    <i className="fas fa-book-reader text-4xl text-orange-600 mb-3"></i>
                    <h3 className="font-bold text-lg">Strong Academics</h3>
                    <p className="text-gray-600 text-sm">Concept-based curriculum</p>
                </div>

                <div className="p-6 rounded shadow bg-purple-50">
                    <i className="fas fa-heart text-4xl text-purple-700 mb-3"></i>
                    <h3 className="font-bold text-lg">Holistic Growth</h3>
                    <p className="text-gray-600 text-sm">Sports, values & life skills</p>
                </div>
            </section>

            {/* ================= ABOUT PREVIEW ================= */}
            <section className="p-10 bg-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <img src="/photos/home image.jpeg" alt="Home"
                    className="w-full h-72 object-cover rounded shadow"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Home+Image' }}
                />

                <div>
                    <h3 className="text-3xl font-bold mb-3">Why Choose Us?</h3>
                    <p className="text-gray-700 leading-7 mb-4">
                        We believe every child is unique. Our teaching approach focuses on
                        academic excellence, discipline, creativity, and moral values.
                    </p>
                    <Link to="/about" className="text-green-700 font-semibold">
                        Learn More →
                    </Link>
                </div>
            </section>

            {/* ================= GREEN CTA STRIP ================= */}
            <section className="bg-gradient-to-r from-green-700 to-green-900 text-white p-12 text-center">
                <h3 className="text-3xl font-bold mb-3">Admissions Open for 2026</h3>
                <p className="max-w-3xl mx-auto mb-6 text-green-100">
                    Give your child the best start with quality education, experienced faculty,
                    and a caring learning environment at V Blooms D World School.
                </p>

                <div className="flex justify-center gap-6 flex-wrap">
                    <Link to="/admission" className="bg-white text-green-800 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-100 inline-block">
                        Apply for Admission
                    </Link>
                    <Link to="/contact" className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-800 inline-block">
                        Contact Us
                    </Link>
                </div>
            </section>

            {/* ================= GALLERY ================= */}
            <section className="p-10 bg-white">
                <h2 className="text-3xl font-bold mb-6 text-center">Life at Our School</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <img src="/photos/gallery 1.JPG" className="h-40 w-full object-cover rounded shadow" alt="Gallery 1" />
                    <img src="/photos/annual day 8.jpeg" className="h-40 w-full object-cover rounded shadow" alt="Gallery 2"
                        onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Gallery+2' }} />
                    <img src="/photos/gallery 3.JPG" className="h-40 w-full object-cover rounded shadow" alt="Gallery 3"
                        onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Gallery+3' }} />
                    <img src="/photos/event 3.jpeg" className="h-40 w-full object-cover rounded shadow" alt="Gallery 4"
                        onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Gallery+4' }} />
                </div>

                <div className="text-center mt-6">
                    <Link to="/gallery" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow">
                        View Full Gallery →
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
