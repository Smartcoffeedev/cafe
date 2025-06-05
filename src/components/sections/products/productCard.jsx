import React from 'react'
import SafeImage from '@/components/common/SafeImage'

const ProductCard = ({ product }) => {
    return (
        <div className="product-card" style={{
            background: 'linear-gradient(135deg, #23263a 0%, #23263a 60%, #23305a 100%)',
            borderRadius: '1.5rem',
            padding: '1.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            boxShadow: '0 4px 24px rgba(37,99,235,0.13)',
            marginBottom: '2rem'
        }}>
            <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                marginBottom: '1rem',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                background: '#18192a',
                minHeight: '180px',
                maxHeight: '220px'
            }}>
                <SafeImage 
                    src={product.image}
                    alt={product.name}
                    fallbackType="products"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0
            }}>
                <h3 style={{
                    color: '#fff',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    margin: '0 0 0.5rem 0',
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                }}>{product.name}</h3>
                <div style={{
                    display: 'flex',
                    gap: '0.7rem',
                    marginBottom: '0.7rem',
                    flexWrap: 'wrap'
                }}>
                    {product.saleTag && (
                        <span style={{
                            padding: '5px 12px',
                            borderRadius: '1rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            background: 'linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)',
                            color: '#fff',
                            boxShadow: '0 2px 8px rgba(255,75,43,0.2)'
                        }}>{typeof product.saleTag === 'string' ? product.saleTag : 'Oferta'}</span>
                    )}
                    {product.newTag && (
                        <span style={{
                            padding: '5px 12px',
                            borderRadius: '1rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                            color: '#fff',
                            boxShadow: '0 2px 8px rgba(67,233,123,0.2)'
                        }}>{typeof product.newTag === 'string' ? product.newTag : 'Nuevo'}</span>
                    )}
                </div>
                <div style={{
                    display: 'flex',
                    gap: '0.7rem',
                    alignItems: 'center',
                    marginBottom: '0.7rem'
                }}>
                    <span style={{
                        color: '#43e97b',
                        fontSize: '1.25rem',
                        fontWeight: 700
                    }}>{product.newPrice}</span>
                    {product.oldPrice && (
                        <span style={{
                            color: '#bdbdbd',
                            textDecoration: 'line-through',
                            fontSize: '1rem',
                            fontWeight: 500
                        }}>{product.oldPrice}</span>
                    )}
                </div>
                {product.categories && product.categories.length > 0 && (
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginBottom: '0.7rem'
                    }}>
                        {product.categories.map((cat, idx) => (
                            <span key={idx} style={{
                                background: '#2563eb22',
                                color: '#2563eb',
                                borderRadius: '0.8rem',
                                padding: '0.2rem 0.7rem',
                                fontSize: '0.9rem',
                                fontWeight: 600
                            }}>{cat}</span>
                        ))}
                    </div>
                )}
            </div>
            <style jsx>{`
                @media (max-width: 600px) {
                    .product-card {
                        max-height: none !important;
                        margin-bottom: 1.2rem !important;
                    }
                    .product-card > div:first-child {
                        min-height: 120px !important;
                        max-height: 150px !important;
                        padding-top: 60% !important;
                    }
                }
            `}</style>
        </div>
    )
}

export default ProductCard