import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-green-800 text-white px-4 md:px-6 py-4 shadow-lg sticky top-0 z-50">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 md:gap-3">
                    <img
                        src="/photos/WhatsApp Image 2026-02-03 at 12.16.48 PM.jpeg"
                        className="h-10 md:h-14 w-10 md:w-14 rounded-full bg-white p-1 shadow-md object-cover"
                        alt="School Logo"
                    />
                    <h1 className="text-sm md:text-2xl font-bold">V BLOOMS D WORLD SCHOOL</h1>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 text-lg">
                    <Link to="/" className="underline font-semibold hover:opacity-80">Home</Link>
                    <Link to="/about" className="hover:underline">About Us</Link>
                    <Link to="/academics" className="hover:underline">Academics</Link>
                    <Link to="/admission" className="hover:underline">Admissions</Link>
                    <Link to="/gallery" className="hover:underline">Gallery</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex flex-col gap-1 p-2"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={`h-0.5 w-6 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`h-0.5 w-6 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`h-0.5 w-6 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <nav className="md:hidden flex flex-col space-y-3 mt-4 pt-4 border-t border-green-700">
                    <Link to="/" className="underline font-semibold block py-2">Home</Link>
                    <Link to="/about" className="block py-2 hover:opacity-80">About Us</Link>
                    <Link to="/academics" className="block py-2 hover:opacity-80">Academics</Link>
                    <Link to="/admission" className="block py-2 hover:opacity-80">Admissions</Link>
                    <Link to="/gallery" className="block py-2 hover:opacity-80">Gallery</Link>
                    <Link to="/contact" className="block py-2 hover:opacity-80">Contact</Link>
                    <Link to="/login" className="block py-2 hover:opacity-80">Login</Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
