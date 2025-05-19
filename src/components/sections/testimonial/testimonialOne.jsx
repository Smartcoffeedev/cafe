'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SafeImage from '@/components/common/SafeImage';

const MAX_VISIBLE_CHARS = 180;

const TestimonialOne = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setError(null);
        const res = await fetch('/data/testimonials.json');
        if (!res.ok) throw new Error('No se pudo cargar los testimonios');
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        setError('No se pudo cargar los testimonios');
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleToggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <div>Cargando testimonios...</div>;
  if (error) return <div>Error al cargar testimonios: {error}</div>;

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-[#050d1a] py-12" style={{ minHeight: '100vh' }}>
      <div className="max-w-6xl w-full flex flex-col items-center justify-center mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-2 mt-8">Testimonios</h2>
        <p className="text-lg text-white/80 text-center mb-8">Lo que opinan nuestros clientes</p>
        <div className="flex-1 flex items-center justify-center w-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2.5,
              },
              1400: {
                slidesPerView: 3,
              },
            }}
            className="w-full"
          >
            {testimonials.map((testimonial) => {
              return (
                <SwiperSlide key={testimonial.id}>
                  <div
                    className="testimonial-card-ui shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #0a1832 60%, #1e2a47 100%)',
                      borderRadius: '20px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                      padding: '2rem 1.5rem 1.5rem 1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 340,
                      maxHeight: 340,
                      height: 340,
                      maxWidth: 420,
                      margin: '0 auto',
                      width: '100%',
                      overflow: 'hidden',
                      border: '1.5px solid #23345a',
                      transition: 'box-shadow 0.3s, transform 0.3s',
                    }}
                  >
                    <div className="testimonial-quote-icon" style={{ color: '#4fc3f7', fontSize: '2.2rem', marginBottom: '0.5rem', alignSelf: 'flex-start' }}>
                      <i className="bx bxs-quote-left"></i>
                    </div>
                    <div
                      style={{ width: '100%', maxWidth: 420, minHeight: 48, maxHeight: 120, marginBottom: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowY: 'auto', background: 'transparent' }}
                    >
                      <style>{`
                        .testimonial-quote-ui::-webkit-scrollbar {
                          width: 6px !important;
                          background: #14325c !important;
                        }
                        .testimonial-quote-ui::-webkit-scrollbar-thumb {
                          background: #2196f3 !important;
                          border-radius: 6px !important;
                          border: none !important;
                        }
                        .testimonial-quote-ui::-webkit-scrollbar-track {
                          background: #14325c !important;
                        }
                        .testimonial-quote-ui {
                          scrollbar-color: #2196f3 #14325c !important;
                          scrollbar-width: thin !important;
                        }
                      `}</style>
                      <p
                        className="testimonial-quote-ui"
                        style={{
                          fontSize: '1.15rem',
                          color: '#fff',
                          fontStyle: 'italic',
                          textAlign: 'center',
                          lineHeight: 1.7,
                          margin: 0,
                          wordBreak: 'break-word',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {`"${testimonial.content}"`}
                      </p>
                    </div>
                    <div className="testimonial-author-ui" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <span className="testimonial-name" style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '.5px' }}>{testimonial.name}</span>
                      <span className="testimonial-role" style={{ color: '#4fc3f7', fontSize: '0.95rem', fontWeight: 500 }}>{testimonial.role}</span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <style>{`
        html::-webkit-scrollbar {
          width: 7px;
        }
        html::-webkit-scrollbar-thumb {
          background: #4fc3f7;
          border-radius: 6px;
        }
        html::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </section>
  )
}

export default TestimonialOne