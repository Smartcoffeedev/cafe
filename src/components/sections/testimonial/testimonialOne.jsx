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
        const res = await fetch('/api/testimonials');
        if (!res.ok) throw new Error('No se pudo cargar los testimonios');
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        setError(err.message);
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
    <div className="testimonial-section-2">
      <div className="container">
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
        >
          {testimonials.map((testimonial) => {
            const isLong = testimonial.content.length > MAX_VISIBLE_CHARS;
            const isExpanded = expanded[testimonial.id];
            const visibleContent = isExpanded || !isLong
              ? testimonial.content
              : testimonial.content.slice(0, MAX_VISIBLE_CHARS) + '...';
            return (
              <SwiperSlide key={testimonial.id}>
                <div
                  className="testimonial-card-ui"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '18px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                    padding: '2.5rem 2.5rem 2rem 2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'box-shadow 0.3s, transform 0.3s, min-height 0.3s, max-height 0.3s, height 0.3s',
                    minHeight: isExpanded ? 650 : 500,
                    maxHeight: isExpanded ? 650 : 500,
                    height: isExpanded ? 650 : 500,
                    maxWidth: 520,
                    margin: '0 auto',
                    width: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <div className="testimonial-quote-icon" style={{ color: 'var(--mainColor2)', fontSize: '2.2rem', marginBottom: '0.5rem', alignSelf: 'flex-start' }}>
                    <i className="bx bxs-quote-left"></i>
                  </div>
                  <div className="testimonial-avatar" style={{ marginBottom: '1.2rem', boxShadow: '0 2px 12px rgba(67, 165, 254, 0.10)' }}>
                    <SafeImage
                      src={testimonial.image}
                      alt={`Testimonio de ${testimonial.name}`}
                      width={110}
                      height={110}
                      fallbackType="testimonials"
                      style={{ borderRadius: '16px', objectFit: 'cover', border: '3px solid #fff', width: 110, height: 110 }}
                    />
                  </div>
                  <div
                    style={{ width: '100%', maxWidth: 420, minHeight: 80, maxHeight: isExpanded ? 300 : 108, overflowY: isExpanded ? 'auto' : 'hidden', marginBottom: isLong ? '0.5rem' : '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
                    onMouseEnter={() => { if (isLong && !isExpanded) setHoveredId(testimonial.id); }}
                    onMouseLeave={() => { if (hoveredId === testimonial.id) setHoveredId(null); }}
                  >
                    <style jsx>{`
                      .testimonial-quote-ui::-webkit-scrollbar {
                        width: 8px;
                      }
                      .testimonial-quote-ui::-webkit-scrollbar-thumb {
                        background: #3a3a4a;
                        border-radius: 6px;
                      }
                      .testimonial-quote-ui::-webkit-scrollbar-track {
                        background: transparent;
                      }
                      .testimonial-tooltip {
                        position: absolute;
                        left: 50%;
                        top: 100%;
                        transform: translateX(-50%);
                        background: #18192a;
                        color: #fff;
                        padding: 1rem 1.2rem;
                        border-radius: 12px;
                        box-shadow: 0 4px 24px rgba(0,0,0,0.18);
                        z-index: 10;
                        min-width: 220px;
                        max-width: 350px;
                        font-size: 1rem;
                        white-space: pre-line;
                        margin-top: 10px;
                        opacity: 0.98;
                        pointer-events: auto;
                        word-break: break-word;
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
                        display: '-webkit-box',
                        WebkitLineClamp: isExpanded ? 'unset' : 3,
                        WebkitBoxOrient: 'vertical',
                        overflowY: isExpanded ? 'auto' : 'hidden',
                        overflowX: 'hidden',
                        maxHeight: isExpanded ? 300 : 108,
                        minHeight: 48,
                        transition: 'max-height 0.2s',
                        margin: 0,
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-line',
                        cursor: isLong && !isExpanded ? 'pointer' : 'default',
                      }}
                    >
                      {`"${visibleContent}"`}
                    </p>
                    {isLong && !isExpanded && hoveredId === testimonial.id && (
                      <div className="testimonial-tooltip">
                        {testimonial.content}
                      </div>
                    )}
                  </div>
                  {isLong && (
                    <button
                      onClick={() => handleToggleExpand(testimonial.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--mainColor2)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        marginTop: 4,
                        textDecoration: 'underline',
                        marginBottom: '1.2rem',
                      }}
                    >
                      {isExpanded ? 'Ver menos' : 'Ver más'}
                    </button>
                  )}
                  <div className="testimonial-author-ui" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <span className="testimonial-name" style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>{testimonial.name}</span>
                    <span className="testimonial-role" style={{ color: 'var(--mainColor2)', fontSize: '0.95rem' }}>{testimonial.role}</span>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default TestimonialOne