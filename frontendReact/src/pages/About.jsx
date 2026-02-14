import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />

            {/* ================= HERO ================= */}
            <section className="relative h-[420px]">
                <img src="/photos/school image.JPG" className="h-full w-full object-cover" alt="School" />

                <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-black/50
                    flex flex-col justify-center items-center text-center px-6">
                    <h2 className="text-4xl font-extrabold text-white mb-3">About Our School</h2>
                    <p className="text-green-100 max-w-3xl leading-7">
                        A place where knowledge meets values, learning meets creativity,
                        and students grow into confident and responsible individuals.
                    </p>
                </div>
            </section>

            {/* ================= ABOUT INTRO ================= */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-white items-center">

                <img src="/photos/campus 6.jpeg" alt="Campus"
                    className="w-full h-72 object-cover rounded-xl shadow-lg"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Campus+Image' }}
                />

                <div>
                    <h3 className="text-3xl font-bold mb-4 text-green-800">Who We Are</h3>
                    <p className="text-gray-700 leading-7 mb-4">
                        V Blooms D World School is committed to providing quality education
                        in a safe, supportive, and disciplined environment. We focus on
                        nurturing young minds with strong academic foundations and moral values.
                    </p>
                    <p className="text-gray-700 leading-7 mb-4">
                        Our experienced faculty believes in personalized attention, helping
                        each child discover their strengths and build confidence.
                    </p>
                    <p className="text-gray-700 leading-7">
                        With modern facilities and innovative teaching methods, we prepare
                        students for academic success and life beyond classrooms.
                    </p>
                </div>

            </section>

            {/* ================= MISSION / LEARN / GROW ================= */}
            <section className="p-10 bg-gradient-to-r from-green-50 to-blue-50">
                <h3 className="text-3xl font-bold text-center mb-10">Our Philosophy</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Mission */}
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <img src="/photos/about image 1.jfif" className="h-14 mx-auto mb-3"
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                        />
                        <div className="h-14 mx-auto mb-3 flex items-center justify-center text-green-700 text-3xl" style={{ display: 'none' }}>
                            <i className="fas fa-bullseye"></i>
                        </div>
                        <h4 className="text-xl font-bold text-green-700 mb-2">Our Mission</h4>
                        <p className="text-gray-700 leading-7 text-sm">
                            To create a nurturing learning environment that inspires academic
                            excellence, ethical values, confidence, and lifelong learning.
                        </p>
                    </div>

                    {/* Learn */}
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <img src="/photos/campus 4.jpeg" className="h-14 mx-auto mb-3"
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                        />
                        <div className="h-14 mx-auto mb-3 flex items-center justify-center text-blue-700 text-3xl" style={{ display: 'none' }}>
                            <i className="fas fa-book-reader"></i>
                        </div>
                        <h4 className="text-xl font-bold text-blue-700 mb-2">Learn</h4>
                        <p className="text-gray-700 leading-7 text-sm">
                            We encourage curiosity and creativity through interactive teaching,
                            activity-based learning, smart classrooms, and practical exposure.
                        </p>
                    </div>

                    {/* Grow */}
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <img src="/photos/about images 3.jfif" className="h-14 mx-auto mb-3"
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                        />
                        <div className="h-14 mx-auto mb-3 flex items-center justify-center text-purple-700 text-3xl" style={{ display: 'none' }}>
                            <i className="fas fa-seedling"></i>
                        </div>
                        <h4 className="text-xl font-bold text-purple-700 mb-2">Grow</h4>
                        <p className="text-gray-700 leading-7 text-sm">
                            Our focus extends beyond academics, helping students develop leadership,
                            discipline, emotional intelligence, and social responsibility.
                        </p>
                    </div>
                </div>

            </section>

            {/* ================= FACILITIES ================= */}
            <section className="p-10 bg-white grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                <div>
                    <h3 className="text-3xl font-bold mb-4 text-green-800">Our Facilities</h3>
                    <p className="text-gray-700 leading-7 mb-4">
                        Our campus is equipped with modern infrastructure to support effective
                        learning and student development.
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 leading-7">
                        <li>Smart & spacious classrooms</li>
                        <li>Science and computer laboratories</li>
                        <li>Library with academic resources</li>
                        <li>Sports ground & activity areas</li>
                        <li>Safe & secure campus</li>
                    </ul>
                </div>

                <img src="/photos/facilities.jpeg" alt="Facilities"
                    className="w-full h-72 object-cover rounded-xl shadow-lg"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Facilities' }}
                />

            </section>

            {/* ================= CONTACT STRIP ================= */}
            <section className="bg-gradient-to-r from-green-700 to-green-900 text-white p-10 text-center">
                <h3 className="text-2xl font-bold mb-3">Want to Know More?</h3>
                <p className="mb-5">
                    We welcome parents and guardians to visit our campus and interact with us.
                </p>
                <a href="/contact"
                    className="bg-white text-green-800 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-100 inline-block">
                    Contact Us
                </a>
            </section>

            <Footer />
        </div>
    );
};
export default About;
