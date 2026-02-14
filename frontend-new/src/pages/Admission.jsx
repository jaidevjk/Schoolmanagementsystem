import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Admission = () => {
    const [formData, setFormData] = useState({
        parentName: '',
        name: '',
        email: '',
        phonenumber: '',
        dob: '',
        gender: '',
        address: '',
        grade: '',
        Description: []
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const submitEnquiry = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch("http://localhost:4003/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (res.ok) {
                alert("Enquiry Submitted Successfully!");
                setFormData({
                    parentName: '',
                    name: '',
                    email: '',
                    phonenumber: '',
                    dob: '',
                    gender: '',
                    address: '',
                    grade: '',
                    Description: []
                });
            } else {
                alert(result.message || "Something went wrong");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Server Error");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />

            {/* ================= HERO ================= */}
            <section className="relative h-[420px]">
                <img src="/photos/school image.JPG" className="h-full w-full object-cover" alt="Admission" />

                <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-green-800/50 to-transparent">
                </div>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        Admissions Open 2026
                    </h2>
                    <p className="text-xl text-green-200 font-semibold mb-2">
                        LKG to Grade 10
                    </p>
                    <p className="max-w-3xl text-gray-100 leading-7">
                        Begin your child’s journey towards academic excellence, strong values,
                        and holistic development at V Blooms D World School.
                    </p>
                </div>
            </section>

            {/* ================= ADMISSION OVERVIEW ================= */}
            <section className="p-10 bg-white text-center">
                <h3 className="text-3xl font-bold mb-4">Why Choose V Blooms?</h3>
                <p className="max-w-4xl mx-auto text-gray-700 leading-7">
                    Our admissions process is simple, transparent, and parent-friendly.
                    We focus on nurturing every child in a safe, disciplined, and
                    joyful learning environment.
                </p>
            </section>

            {/* ================= CLASSES OFFERED ================= */}
            <section className="p-10 bg-gray-100">
                <h3 className="text-3xl font-bold text-center mb-8">Classes Offered</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white p-6 rounded shadow text-center">
                        <i className="fas fa-child text-green-700 text-4xl mb-3"></i>
                        <h4 className="font-bold text-lg">Pre-Primary</h4>
                        <p className="text-sm text-gray-500 mb-2">LKG – UKG</p>
                        <p className="text-gray-700 text-sm">
                            Play-based learning, phonics, rhymes, storytelling, and activity learning.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded shadow text-center">
                        <i className="fas fa-book text-blue-700 text-4xl mb-3"></i>
                        <h4 className="font-bold text-lg">Primary School</h4>
                        <p className="text-sm text-gray-500 mb-2">Grade 1 – Grade 5</p>
                        <p className="text-gray-700 text-sm">
                            Strong foundation in academics, creativity, and life skills.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded shadow text-center">
                        <i className="fas fa-graduation-cap text-orange-600 text-4xl mb-3"></i>
                        <h4 className="font-bold text-lg">Middle & High School</h4>
                        <p className="text-sm text-gray-500 mb-2">Grade 6 – Grade 10</p>
                        <p className="text-gray-700 text-sm">
                            Concept-based learning, exam preparation, and career guidance.
                        </p>
                    </div>

                </div>
            </section>

            {/* ================= ADMISSION PROCESS ================= */}
            <section className="p-10 bg-white">
                <h3 className="text-3xl font-bold text-center mb-8">Admission Process</h3>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">

                    <div className="bg-green-50 p-4 rounded shadow">
                        <h4 className="font-bold text-lg">Step 1</h4>
                        <p className="text-sm">Enquiry & Registration</p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded shadow">
                        <h4 className="font-bold text-lg">Step 2</h4>
                        <p className="text-sm">Application Form</p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded shadow">
                        <h4 className="font-bold text-lg">Step 3</h4>
                        <p className="text-sm">Interaction / Assessment</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded shadow">
                        <h4 className="font-bold text-lg">Step 4</h4>
                        <p className="text-sm">Admission Confirmation</p>
                    </div>

                    <div className="bg-green-100 p-4 rounded shadow">
                        <h4 className="font-bold text-lg">Step 5</h4>
                        <p className="text-sm">Fee Payment & Enrollment</p>
                    </div>

                </div>
            </section>

            {/* ================= APPLY FORM ================= */}
            <section className="p-10 bg-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                <div>
                    <h3 className="text-3xl font-bold mb-4">Apply for Admission</h3>
                    <p className="text-gray-700 leading-7 mb-4">
                        Fill in the enquiry form and our admission team will contact you
                        with complete details regarding the admission process.
                    </p>

                    <ul className="list-disc ml-6 text-gray-700 leading-7">
                        <li>Transparent admission procedure</li>
                        <li>Limited seats per class</li>
                        <li>Safe & student-friendly environment</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <form id="enquiryForm" className="bg-white p-6 rounded shadow" onSubmit={submitEnquiry}>

                        <h4 className="text-xl font-bold mb-4">Admission Enquiry</h4>

                        <input id="parentName" required
                            className="border w-full p-2 mb-3 rounded"
                            placeholder="Parent Name"
                            value={formData.parentName} onChange={handleChange}
                        />

                        <input id="name" required
                            className="border w-full p-2 mb-3 rounded"
                            placeholder="Student Name"
                            value={formData.name} onChange={handleChange}
                        />

                        <input id="email" type="email" required
                            className="border w-full p-2 mb-3 rounded"
                            placeholder="Email"
                            value={formData.email} onChange={handleChange}
                        />

                        <input id="phonenumber" type="number" required
                            className="border w-full p-2 mb-3 rounded"
                            placeholder="Phone Number"
                            value={formData.phonenumber} onChange={handleChange} // Note: ID changed to phonenumber to match state
                        />

                        <input id="dob" type="date" required
                            className="border w-full p-2 mb-3 rounded"
                            value={formData.dob} onChange={handleChange}
                        />

                        <select id="gender" required
                            className="border w-full p-2 mb-3 rounded"
                            value={formData.gender} onChange={handleChange}
                        >
                            <option value="">Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>

                        <input id="address" required
                            className="border w-full p-2 mb-3 rounded"
                            placeholder="Address"
                            value={formData.address} onChange={handleChange}
                        />

                        <input id="grade" required
                            className="border w-full p-2 mb-3 rounded"
                            placeholder="Class Applying For"
                            value={formData.grade} onChange={handleChange}
                        />

                        <button type="submit"
                            className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded font-semibold">
                            Submit Enquiry
                        </button>

                    </form>
                </div>

            </section>

            <Footer />
        </div>
    );
};
export default Admission;
