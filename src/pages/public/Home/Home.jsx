import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import HeroBanner from './sections/HeroBanner';
import AboutSection from './sections/AboutSection';
import PackagesSection from './sections/PackagesSection';
import FeaturesShowcase from './sections/FeaturesShowcase';
import TestimonialsStats from './sections/TestimonialsStats';
import HowItWorks from './sections/HowItWorks';
import FAQSection from './sections/FAQSection';
import ContactCTA from './sections/ContactCTA';

const Home = () => {
    // Pro Tip: Adding a scroll progress bar at the top (Very SaaS vibe)
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <main className="relative overflow-hidden bg-white">
            {/* Elegant Scroll Progress Bar */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-[110] origin-left" 
                style={{ scaleX }} 
            />

            {/* Content Sections */}
            <div className="flex flex-col">
                <HeroBanner />
                
                {/* Wrap sections in a container to ensure consistent spacing if needed */}
                <section id="about">
                    <AboutSection />
                </section>

                <section id="features">
                    <FeaturesShowcase />
                </section>
                
                <section id="process">
                    <HowItWorks />
                </section>

                <section id="pricing">
                    <PackagesSection />
                </section>

                <section id="testimonials">
                    <TestimonialsStats />
                </section>

                <section id="faq">
                    <FAQSection />
                </section>

                <section id="contact">
                    <ContactCTA />
                </section>
            </div>
        </main>
    );
};

export default Home;