import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';

const MainLayout = () => {
    return (
        // min-h-screen + flex-col ensures Footer stays at the bottom of short pages
        <div className="flex flex-col min-h-screen bg-base-100 font-sans antialiased">
            <Navbar />
            
            {/* The flex-grow class pushes the footer down */}
            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;