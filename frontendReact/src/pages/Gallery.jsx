import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Helper for images with fallback
const GalleryImage = ({ src, alt }) => (
    <img
        src={src}
        alt={alt}
        className="h-48 rounded shadow object-cover min-w-[200px]"
        onError={(e) => { e.target.src = `https://placehold.co/600x400?text=${encodeURIComponent(alt)}` }}
    />
);

const Gallery = () => {
    return (
        <div className="bg-gray-100 min-h-screen font-sans overflow-x-hidden">
            <Header />

            {/* ================= MARQUEE ANIMATION STYLE ================= */}
            <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
            animation: scroll 30s linear infinite;
        }
        .hover\\:pause:hover {
            animation-play-state: paused;
        }
      `}</style>

            {/* HERO */}
            <section className="relative h-[420px]">
                <img
                    src="/photos/school image.JPG"
                    className="h-full w-full object-cover"
                    alt="Gallery Hero"
                    onError={(e) => { e.target.src = 'https://placehold.co/1200x600?text=School+Image' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-green-800/50 to-transparent">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-green-900/40 flex items-center justify-center">
                        <div className="text-center px-6">
                            <h2 className="text-5xl font-bold text-white mb-2">Our Gallery</h2>
                            <p className="text-green-200 text-lg">
                                Celebrating Learning, Creativity & Achievements
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRO */}
            <section className="p-10 bg-white text-center">
                <h3 className="text-3xl font-bold mb-4">Life at V Blooms D World School</h3>
                <p className="max-w-4xl mx-auto text-gray-700 leading-7">
                    Our gallery reflects the vibrant atmosphere of our school campus,
                    showcasing joyful learning moments, celebrations, sports activities,
                    and student achievements that shape confident and responsible learners.
                </p>
            </section>

            {/* CAMPUS */}
            <section className="p-10 bg-gray-100">
                <h3 className="text-2xl font-bold text-center mb-3">Campus</h3>
                <p className="text-center text-gray-700 max-w-3xl mx-auto mb-6">
                    A safe, spacious, and child-friendly campus designed to encourage
                    learning, creativity, and overall development.
                </p>

                <div className="relative overflow-hidden group">
                    <div className="flex gap-6 animate-scroll hover:pause w-max">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <GalleryImage key={n} src={`/photos/campus ${n}.jpeg`} alt={`Campus ${n}`} />
                        ))}
                        {/* Duplicate for infinite scroll */}
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <GalleryImage key={`dup-${n}`} src={`/photos/campus ${n}.jpeg`} alt={`Campus ${n}`} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CULTURALS */}
            <section className="p-10 bg-white">
                <h3 className="text-2xl font-bold text-center mb-3">Culturals</h3>
                <p className="text-center text-gray-700 max-w-3xl mx-auto mb-6">
                    Festivals, annual days, competitions, and cultural programs help
                    students express creativity, confidence, and teamwork.
                </p>
                <div className="relative overflow-hidden group">
                    <div className="flex gap-6 animate-scroll hover:pause w-max">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <GalleryImage key={n} src={`/photos/annual day ${n}.jpeg`} alt={`Annual Day ${n}`} />
                        ))}
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <GalleryImage key={`dup-${n}`} src={`/photos/annual day ${n}.jpeg`} alt={`Annual Day ${n}`} />
                        ))}
                    </div>
                </div>
            </section>

            {/* SPORTS */}
            <section className="p-10 bg-gray-100">
                <h3 className="text-2xl font-bold text-center mb-3">Sports</h3>
                <p className="text-center text-gray-700 max-w-3xl mx-auto mb-6">
                    Physical education and sports activities build discipline, teamwork,
                    leadership qualities, and a healthy lifestyle among students.
                </p>
                <div className="relative overflow-hidden group">
                    <div className="flex gap-6 animate-scroll hover:pause w-max">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <GalleryImage key={n} src={`/photos/sports ${n}.jpeg`} alt={`Sports ${n}`} />
                        ))}
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <GalleryImage key={`dup-${n}`} src={`/photos/sports ${n}.jpeg`} alt={`Sports ${n}`} />
                        ))}
                    </div>
                </div>
            </section>

            {/* EVENTS */}
            <section className="p-10 bg-white">
                <h3 className="text-2xl font-bold text-center mb-3">Events</h3>
                <p className="text-center text-gray-700 max-w-3xl mx-auto mb-6">
                    Our school celebrates various events such as Annual Day, Festivals,
                    Competitions, Educational Programs, and Special Assemblies that encourage
                    student participation, confidence, and cultural awareness.
                </p>
                <div className="relative overflow-hidden group">
                    <div className="flex gap-6 animate-scroll hover:pause w-max">
                        <GalleryImage src="/photos/gallery 1.JPG" alt="Gallery 1" />
                        <GalleryImage src="/photos/gallery 3.JPG" alt="Gallery 3" />
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <GalleryImage key={n} src={`/photos/event ${n}.jpeg`} alt={`Event ${n}`} />
                        ))}
                        {/* Duplicate */}
                        <GalleryImage src="/photos/gallery 1.JPG" alt="Gallery 1" />
                        <GalleryImage src="/photos/gallery 3.JPG" alt="Gallery 3" />
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <GalleryImage key={`dup-${n}`} src={`/photos/event ${n}.jpeg`} alt={`Event ${n}`} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ACTIVITIES */}
            <section className="p-10 bg-gray-100">
                <h3 className="text-2xl font-bold text-center mb-3">Activities</h3>
                <p className="text-center text-gray-700 max-w-3xl mx-auto mb-6">
                    A variety of classroom and outdoor activities such as art & craft,
                    drawing, storytelling, science experiments, yoga, music, dance, and
                    group activities help students develop creativity, discipline, and
                    life skills.
                </p>
                <div className="relative overflow-hidden group">
                    <div className="flex gap-6 animate-scroll hover:pause w-max">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(n => (
                            <GalleryImage key={n} src={`/photos/activity ${n}.jpeg`} alt={`Activity ${n}`} />
                        ))}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(n => (
                            <GalleryImage key={`dup-${n}`} src={`/photos/activity ${n}.jpeg`} alt={`Activity ${n}`} />
                        ))}
                    </div>
                </div>
            </section>

            {/* YOGA */}
            <section className="p-10 bg-white">
                <h3 className="text-2xl font-bold text-center mb-3">Yoga & Wellness</h3>
                <p className="text-center text-gray-700 max-w-3xl mx-auto mb-6">
                    Yoga is an integral part of our school curriculum. Regular yoga sessions
                    help students improve concentration, flexibility, discipline, and mental
                    well-being. Through guided practices, children learn the importance of
                    physical fitness, mindfulness, and a healthy lifestyle from an early age.
                </p>
                <div className="relative overflow-hidden group">
                    <div className="flex gap-6 animate-scroll hover:pause w-max">
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <GalleryImage key={n} src={`/photos/yoga ${n}.jpeg`} alt={`Yoga ${n}`} />
                        ))}
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <GalleryImage key={`dup-${n}`} src={`/photos/yoga ${n}.jpeg`} alt={`Yoga ${n}`} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};
export default Gallery;
