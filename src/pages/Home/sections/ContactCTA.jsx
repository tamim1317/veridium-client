import React from 'react';

const ContactCTA = () => {
    return (
        <section className="py-20 bg-primary text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Asset Management?</h2>
                <p className="text-xl mb-8">Join hundreds of companies simplifying their operations with AssetVerse.</p>
                <a href="/join-hr" className="btn btn-warning btn-lg shadow-xl hover:shadow-2xl">
                    Get Started Today!
                </a>
            </div>
        </section>
    );
};

export default ContactCTA;