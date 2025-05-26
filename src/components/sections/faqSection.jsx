'use client'
import React, { useState } from 'react'
import faqData from '../../data/faq.json';

const FAQItem = ({ pregunta, respuesta, isActive, onClick }) => (
  <div className="faq-card mb-5 mx-auto">
    <button
      className={`faq-question w-full flex justify-between items-center px-6 py-5 rounded-2xl bg-transparent border border-[#23263a] text-left font-bold text-white text-lg shadow-lg transition-all duration-300 ${isActive ? 'faq-open' : ''}`}
      onClick={onClick}
      aria-expanded={isActive}
      style={{ maxWidth: '540px' }}
    >
      <span>{pregunta}</span>
      <span className="accordion-icon ml-4 text-primary text-2xl">
        <i className={`bx ${isActive ? 'bx-minus' : 'bx-plus'}`}></i>
      </span>
    </button>
    {isActive && (
      <div className="faq-answer border-t border-[#23263a] text-white rounded-b-2xl px-6 py-4 text-base font-normal animate-fadeIn mt-1 w-full" style={{ maxWidth: '540px', margin: '0 auto' }}>
        {respuesta}
      </div>
    )}
  </div>
);

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const faqs = faqData;

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section py-20">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Preguntas Frecuentes</h2>
          <p className="text-lg text-white/80">Todo lo que necesitas saber sobre SmartCoffee</p>
        </div>
        {faqs.map((faq, index) => (
          <FAQItem
            key={faq.id || index}
            pregunta={faq.pregunta}
            respuesta={faq.respuesta}
            isActive={activeIndex === index}
            onClick={() => toggleAccordion(index)}
          />
        ))}
      </div>
      <style jsx>{`
        .faq-card {
          max-width: 540px;
          width: 100%;
          background: transparent;
        }
        .faq-question {
          outline: none;
          background: transparent;
        }
        .faq-answer {
          animation: fadeIn 0.3s;
          background: transparent;
          word-break: break-word;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default FaqSection;