'use client';
import React, { useEffect, useState } from 'react'
import Rating from '../../ui/rating'
import Image from 'next/image';

const ratingData = {
    5: 100,
    4: 75,
    3: 50,
    2: 25,
    1: 0,
};

const ProductReviewDetails = (props) => {
    const [productsData, setProductsData] = useState([]);
    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProductsData(data.productsData || []));
    }, []);

    return (
        <div className="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabIndex={0}>
            <div className="row">
                <div className="col-lg-6">
                    <div className="products-reviews">
                        <h3>Calificación del Producto</h3>
                        <Rating rating={4} />
                        <div className="rating-count">
                            <span>5.00</span>
                        </div>
                        <div className="row">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <React.Fragment key={star}>
                                    <div className="side">
                                        <div>{star} estrella{star > 1 && 's'}</div>
                                    </div>
                                    <div className="middle">
                                        <div className="bar-container">
                                            <div
                                                className={`bar bar-${star}`}
                                                style={{ width: `${ratingData[star] || 0}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="side right">
                                        <div>{ratingData[star] || 0}%</div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="review-form-wrapper">
                        <h3>Agregar una reseña</h3>
                        <p className="comment-notes">Tu dirección de correo electrónico no será publicada. Los campos obligatorios están marcados con <span>*</span></p>
                        <form>
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="rating">
                                        <input type="radio" id="star5" name="rating" defaultValue={5} /><label htmlFor="star5" />
                                        <input type="radio" id="star4" name="rating" defaultValue={4} /><label htmlFor="star4" />
                                        <input type="radio" id="star3" name="rating" defaultValue={3} /><label htmlFor="star3" />
                                        <input type="radio" id="star2" name="rating" defaultValue={2} /><label htmlFor="star2" />
                                        <input type="radio" id="star1" name="rating" defaultValue={1} /><label htmlFor="star1" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Nombre *" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Email *" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <textarea placeholder="Tu reseña" className="form-control" cols={30} rows={6} defaultValue={""} />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <p className="comment-form-cookies-consent">
                                        <input type="checkbox" id="test1" />
                                        <label htmlFor="test1">Guardar mi nombre, email y sitio web en este navegador para la próxima vez que comente.</label>
                                    </p>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <button type="submit">Enviar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="products-review-comments">
                <h3>Productos Relacionados</h3>
                <div className="row">
                    {productsData.map((product) => (
                        <div key={product.id} className="col-lg-4 col-md-6">
                            <div className="product-card">
                                <div className="product-image">
                                    <Image 
                                        src={product.image} 
                                        alt={product.name}
                                        width={300}
                                        height={300}
                                        className="img-fluid"
                                    />
                                    {(product.saleTag || product.newTag) && (
                                        <div className="product-tags">
                                            {product.saleTag && (
                                                <span className="sale-tag">{product.saleTag}</span>
                                            )}
                                            {product.newTag && (
                                                <span className="new-tag">{product.newTag}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="product-info">
                                    <h4>{product.name}</h4>
                                    <div className="price">
                                        <span className="new-price">{product.newPrice}</span>
                                        {product.oldPrice && (
                                            <span className="old-price">{product.oldPrice}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductReviewDetails