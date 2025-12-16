import React from 'react';

const faqs = [
    { q: "How are returnable assets tracked?", a: "The system automatically sets a due date and alerts the HR Manager if the asset is not returned on time." },
    { q: "What happens if I exceed the employee limit?", a: "New requests will be blocked, and the HR Manager must upgrade the subscription package to affiliate more employees." },
    { q: "Can employees see each other's assets?", a: "No. Employees can only view their own assigned assets and their team members' names, not their assigned inventory." }
];

const FAQSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
                
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="collapse collapse-arrow bg-base-100 shadow-md">
                            <input type="checkbox" name="my-accordion-2" defaultChecked={index === 0} /> 
                            <div className="collapse-title text-xl font-medium text-primary">
                                {faq.q}
                            </div>
                            <div className="collapse-content"> 
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;