import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Academics = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />

            {/* ================= HERO WITH GREEN GRADIENT ================= */}
            <section className="relative h-[420px]">

                <img src="/photos/school image.JPG" className="h-full w-full object-cover" alt="Academics" />

                <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/60 to-green-600/30"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Academics</h2>
                    <p className="text-xl text-green-200 font-semibold mb-2">
                        From Strong Foundations to Future Success
                    </p>
                    <p className="max-w-3xl text-gray-100 leading-7">
                        Our academic framework focuses on conceptual clarity, confidence building,
                        discipline, and holistic development from early years to high school.
                    </p>
                </div>
            </section>

            {/* ================= OVERVIEW ================= */}
            <section className="p-10 bg-white text-center">
                <h3 className="text-3xl font-bold mb-4">Academic Excellence</h3>
                <p className="max-w-4xl mx-auto text-gray-700 leading-7">
                    V Blooms D World School follows a structured, student-friendly curriculum
                    that balances academics, values, and life skills. Our approach nurtures
                    curiosity, creativity, and critical thinking at every stage of learning.
                </p>
            </section>

            {/* ================= CURRICULUM LEVELS ================= */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10 bg-gray-100">

                <div className="bg-white p-6 rounded shadow">
                    <i className="fas fa-child text-green-700 text-3xl mb-3"></i>
                    <h4 className="text-xl font-bold">Pre-Primary</h4>
                    <p className="text-sm text-gray-500 mb-2">LKG – UKG</p>
                    <p className="text-gray-700 leading-6">
                        Play-based learning through rhymes, storytelling, art, and activities
                        that develop language, numeracy, motor skills, and social confidence.
                    </p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <i className="fas fa-book-open text-green-700 text-3xl mb-3"></i>
                    <h4 className="text-xl font-bold">Primary School</h4>
                    <p className="text-sm text-gray-500 mb-2">Grade 1 – Grade 5</p>
                    <p className="text-gray-700 leading-6">
                        Strong foundation in languages, mathematics, EVS, computers, and creative
                        subjects through activity-based and experiential learning.
                    </p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <i className="fas fa-graduation-cap text-green-700 text-3xl mb-3"></i>
                    <h4 className="text-xl font-bold">Middle & High School</h4>
                    <p className="text-sm text-gray-500 mb-2">Grade 6 – Grade 10</p>
                    <p className="text-gray-700 leading-6">
                        Concept-driven, exam-oriented curriculum with science, mathematics,
                        languages, social studies, and career readiness guidance.
                    </p>
                </div>

            </section>

            {/* ================= SUBJECTS ================= */}
            <section className="p-10 bg-white">
                <h3 className="text-2xl font-bold text-center mb-6">Subjects Offered</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    <ul className="list-disc ml-6 text-gray-700 leading-7">
                        <li>English Language & Literature</li>
                        <li>Mathematics</li>
                        <li>Science (Physics, Chemistry, Biology)</li>
                        <li>Social Studies</li>
                        <li>Environmental Studies</li>
                    </ul>
                    <ul className="list-disc ml-6 text-gray-700 leading-7">
                        <li>Computer Science</li>
                        <li>Second & Third Languages</li>
                        <li>General Knowledge</li>
                        <li>Value & Moral Education</li>
                        <li>Physical Education & Yoga</li>
                    </ul>
                </div>
            </section>

            {/* ================= TEACHING METHODOLOGY ================= */}
            <section className="p-10 bg-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h3 className="text-2xl font-bold mb-3">Teaching Methodology</h3>
                    <p className="text-gray-700 leading-7 mb-3">
                        Smart classrooms, interactive teaching, digital tools, group activities,
                        and hands-on learning make lessons engaging and effective.
                    </p>
                    <p className="text-gray-700 leading-7">
                        Continuous assessment and personalized feedback help students improve
                        academically and build confidence.
                    </p>
                </div>
                <img src="/photos/gallery 4.JPG" alt="Teaching"
                    className="w-full h-64 object-cover rounded shadow"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Gallery+4' }}
                />
            </section>

            {/* ================= ACADEMIC STRENGTHS ================= */}
            <section className="p-10 bg-white">
                <h3 className="text-3xl font-bold text-center mb-8">Our Academic Strengths</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="p-6 bg-green-50 rounded shadow text-center">
                        <i className="fas fa-lightbulb text-4xl text-green-700 mb-3"></i>
                        <h4 className="font-bold text-lg mb-2">Concept-Based Learning</h4>
                        <p className="text-gray-700 text-sm">
                            Focus on understanding concepts clearly rather than rote memorization.
                        </p>
                    </div>

                    <div className="p-6 bg-blue-50 rounded shadow text-center">
                        <i className="fas fa-brain text-4xl text-blue-700 mb-3"></i>
                        <h4 className="font-bold text-lg mb-2">Critical Thinking</h4>
                        <p className="text-gray-700 text-sm">
                            Encouraging analytical thinking, problem-solving, and creativity.
                        </p>
                    </div>

                    <div className="p-6 bg-orange-50 rounded shadow text-center">
                        <i className="fas fa-user-check text-4xl text-orange-600 mb-3"></i>
                        <h4 className="font-bold text-lg mb-2">Individual Attention</h4>
                        <p className="text-gray-700 text-sm">
                            Personalized mentoring and remedial support for every learner.
                        </p>
                    </div>

                </div>
            </section>

            {/* ================= BEYOND ACADEMICS ================= */}
            <section className="p-10 bg-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <img src="/photos/campus 4.jpeg" alt="Campus Life"
                    className="w-full h-64 object-cover rounded shadow"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Campus+4' }}
                />

                <div>
                    <h3 className="text-2xl font-bold mb-3">Beyond Academics</h3>
                    <p className="text-gray-700 leading-7 mb-3">
                        Co-curricular activities are integrated with academics to ensure
                        all-round development.
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 leading-7">
                        <li>Art, music, dance & cultural programs</li>
                        <li>Sports, yoga & physical fitness</li>
                        <li>Leadership & life skills training</li>
                        <li>Competitions, clubs & celebrations</li>
                    </ul>
                </div>
            </section>

            <Footer />
        </div>
    );
};
export default Academics;
