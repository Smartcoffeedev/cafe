'use client';
import React, { useEffect, useState } from 'react'
import ProductCard from './productCard'

const RelatedProducts = ({ currentProductId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data.productsData || []));
    }, []);

    const relatedProducts = products
        .filter(product => product.id !== currentProductId)
        .slice(0, 3);

    return (
        <div className="related-products-area pb-70">
            <div className="container">
                <div className="section-title-2">
                    <div className="sub-title-2">
                        <p>Productos Destacados</p>
                    </div>
                    <h2>Productos Relacionados</h2>
                </div>
                <div className="row">
                    {relatedProducts.map((product) => (
                        <div key={product.id} className="col-lg-4 col-md-6 col-sm-6">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RelatedProducts