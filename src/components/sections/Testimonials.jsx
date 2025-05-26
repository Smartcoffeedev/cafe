import React from 'react';

const Testimonials = ({ testimonials }) => {
  return (
    <section className="py-20 bg-dark-custom">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-light-custom">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#23263a] rounded-xl shadow-lg p-8 flex flex-col items-center justify-between min-h-[220px]"
            >
              <p className="text-light-custom/90 text-center text-lg mb-6">
                {testimonial.testimonio}
              </p>
              <div className="flex flex-col items-center">
                <span className="font-bold text-light-custom text-lg">{testimonial.nombre}</span>
                {testimonial.rol && (
                  <span className="text-primary text-sm mt-1">{testimonial.rol}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 