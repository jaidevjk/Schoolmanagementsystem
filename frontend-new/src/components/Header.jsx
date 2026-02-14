import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-green-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
                <img
                    src="/photos/WhatsApp Image 2026-02-03 at 12.16.48 PM.jpeg"
                    className="h-14 w-14 rounded-full bg-white p-1 shadow-md object-cover"
                    alt="School Logo"
                />
                <h1 className="text-2xl font-bold">V BLOOMS D WORLD SCHOOL</h1>
            </div>

            <nav className="space-x-6 text-lg">
                <Link to="/" className="underline font-semibold">Home</Link>
                <Link to="/about" className="hover:underline">About Us</Link>
                <Link to="/academics" className="hover:underline">Academics</Link>
                <Link to="/admission" className="hover:underline">Admissions</Link>
                <Link to="/gallery" className="hover:underline">Gallery</Link>
                <Link to="/contact" className="hover:underline">Contact</Link>
                <Link to="/login" className="hover:underline">Login</Link>
            </nav>
        </header>
    );
};

export default Header;
