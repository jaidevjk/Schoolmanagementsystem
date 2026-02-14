import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-green-800 text-white px-10 py-8">
            <div className="flex flex-col md:flex-row justify-between gap-10">
                <div>
                    <h3 className="font-bold text-lg mb-2">Contact Us</h3>
                    <p>Email: vbloomsdworldschool@email.com</p>
                    <p>Phone: +91 7259411201</p>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/about" className="hover:underline">About Us</Link></li>
                        <li><Link to="/academics" className="hover:underline">Academics</Link></li>
                        <li><Link to="/admission" className="hover:underline">Admissions</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2">Follow Us</h3>
                    <div className="flex gap-4 text-xl">
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-twitter"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
