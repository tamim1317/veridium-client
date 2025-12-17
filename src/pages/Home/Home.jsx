import React from 'react';
import HeroBanner from './sections/HeroBanner';
import AboutSection from './sections/AboutSection';
import PackagesSection from './sections/PackagesSection';
import FeaturesShowcase from './sections/FeaturesShowcase';
import TestimonialsStats from './sections/TestimonialsStats';
import HowItWorks from './sections/HowItWorks';
import FAQSection from './sections/FAQSection';
import ContactCTA from './sections/ContactCTA';

const Home = () => {
    return (
        <>
            <HeroBanner />
            <AboutSection />
            <PackagesSection />
            <FeaturesShowcase />
            <TestimonialsStats />
            <HowItWorks />
            <FAQSection />
            <ContactCTA />
        </>
    );
};

export default Home;