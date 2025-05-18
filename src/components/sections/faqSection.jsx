'use client'
import React, { useState, useEffect } from 'react'

const FaqSection = () => {
    const [faqs, setFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await fetch('/api/faq');
                const data = await res.json();
                setFaqs(data.faqData || []);
            } catch {
                setFaqs([]);
            }
        };
        fetchFaqs();
    }, []);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <div className="faq-section pt-100 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="section-title text-center mb-5">
                        <h2>Preguntas Frecuentes</h2>
                        <p>Todo lo que necesitas saber sobre SmartCoffee</p>
                    </div>
                    <div className="accordion custom-accordion" id="faqAccordion">
                        {faqs.map((faq, index) => (
                            <div className="accordion-item" key={index}>
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button
                                        className={`accordion-button ${activeIndex !== index ? "collapsed" : ""}`}
                                        type="button"
                                        onClick={() => toggleAccordion(index)}
                                        aria-expanded={activeIndex === index}
                                        aria-controls={`collapse${index}`}
                                    >
                                        {faq.question}
                                        <span className="accordion-icon">
                                            <i className={`bx ${activeIndex === index ? 'bx-minus' : 'bx-plus'}`}></i>
                                        </span>
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${index}`}
                                    className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""}`}
                                    aria-labelledby={`heading${index}`}
                                >
                                    <div className="accordion-body">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .faq-section {
                    background: #0a0a1a;
                }
                .section-title h2 {
                    color: #fff;
                }
                .section-title p {
                    color: #fff;
                }
                .custom-accordion .accordion-item {
                    background: #18192a;
                    border-radius: 1.2rem;
                    margin-bottom: 1.2rem;
                    box-shadow: 0 2px 16px rgba(37,99,235,0.07);
                    border: none;
                }
                .custom-accordion .accordion-header {
                    border: none;
                }
                .custom-accordion .accordion-button {
                    background: #18192a;
                    color: #fff;
                    font-size: 1.13rem;
                    font-weight: 600;
                    border-radius: 1.2rem 1.2rem 0 0;
                    box-shadow: none;
                    border: none;
                    padding: 1.2rem 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: background 0.2s;
                }
                .custom-accordion .accordion-button.collapsed {
                    background: #18192a;
                    color: #bdbdbd;
                    border-radius: 1.2rem;
                }
                .custom-accordion .accordion-icon {
                    margin-left: auto;
                    color: #2563eb;
                    font-size: 1.5rem;
                }
                .custom-accordion .accordion-body {
                    background: #151622;
                    color: #e5e5e5;
                    border-radius: 0 0 1.2rem 1.2rem;
                    padding: 1.2rem 1.5rem;
                    font-size: 1.08rem;
                }
                .custom-accordion .accordion-button::after {
                    display: none !important;
                }
            `}</style>
        </div>
    )
}

export default FaqSection