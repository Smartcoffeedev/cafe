import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import faqs from '../data/faqData.json';
import { useState } from 'react';

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const toggle = idx => {
    setOpen(open === idx ? null : idx);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-custom text-light-custom flex flex-col items-center py-12">
        <h1 className="text-4xl font-bold mb-8">Preguntas Frecuentes</h1>
        <p className="text-muted-custom max-w-xl text-center mb-10">Resuelve tus dudas sobre SmartCoffee en nuestra sección de preguntas frecuentes.</p>
        <div className="w-full max-w-3xl space-y-4">
          {faqs.map((faq, idx) => (
            <div key={faq.id} className="rounded-xl bg-[#181f2a]">
              <button
                className="w-full text-left px-6 py-4 font-semibold text-primary flex justify-between items-center focus:outline-none"
                onClick={() => toggle(idx)}
              >
                <span>{faq.question}</span>
                <span className={`transition-transform ${open === idx ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {open === idx && (
                <div className="px-6 pb-4 text-light-custom text-base animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FAQ; 