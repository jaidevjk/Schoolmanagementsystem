import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-green-800 text-white px-4 md:px-10 py-8">
            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-10">
                <div className="text-sm md:text-base">
                    <h3 className="font-bold text-lg mb-3 md:mb-2">Contact Us</h3>
                    <p className="text-green-100">Email: vbloomsdworldschool@email.com</p>
                    <p className="text-green-100">Phone: +91 7259411201</p>
                </div>

                <div className="text-sm md:text-base">
                    <h3 className="font-bold text-lg mb-3 md:mb-2">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><Link to="/" className="text-green-100 hover:underline">Home</Link></li>
                        <li><Link to="/about" className="text-green-100 hover:underline">About Us</Link></li>
                        <li><Link to="/academics" className="text-green-100 hover:underline">Academics</Link></li>
                        <li><Link to="/admission" className="text-green-100 hover:underline">Admissions</Link></li>
                    </ul>
                </div>

                <div className="text-sm md:text-base">
                    <h3 className="font-bold text-lg mb-3 md:mb-2">Follow Us</h3>
                    <div className="flex gap-4 text-xl md:text-2xl">
                        <i className="fab fa-facebook cursor-pointer hover:opacity-80"></i>
                        <i className="fab fa-instagram cursor-pointer hover:opacity-80"></i>
                        <i className="fab fa-twitter cursor-pointer hover:opacity-80"></i>
                    </div>
                </div>
            </div>

            <div className="border-t border-green-700 mt-8 pt-4 text-center text-sm text-green-100">
                <p>&copy; 2026 V Blooms D World School. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
