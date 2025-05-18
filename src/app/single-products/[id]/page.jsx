'use client';
import InstagramGallery from '@/components/sections/instagramGallery'
import PageHeader from '@/components/sections/pageHeader'
import ProductDescription from '@/components/sections/products/productDescription'
import ProductOverView from '@/components/sections/products/productOverView'
import ProductReviewDetails from '@/components/sections/products/productReviewDetails'
import RelatedProducts from '@/components/sections/products/relatedProducts'
import React, { useEffect, useState } from 'react'

const SingleProductPage = ({ params }) => {
    const [productsData, setProductsData] = useState([]);
    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProductsData(data.productsData || []));
    }, []);

    const product = productsData.find(p => p.id === parseInt(params.id));

    if (!product) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <>
            <PageHeader
                className={"sbg-2"}
                currentPage={product.name}
                title={product.name}
            />
            <section className="products-details-area ptb-100">
                <div className="container">
                    <ProductOverView product={product} />
                    <div className="row align-items-center">
                        <div className="col-lg-12 col-md-12">
                            <div className="products-details-tabs">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description-tab-pane" role="tab" aria-controls="description-tab-pane">Descripción</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <ProductDescription product={product} />
                                    <ProductReviewDetails product={product} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RelatedProducts currentProductId={product.id} />
            {/* <InstagramGallery/> */}
        </>
    )
}

export default SingleProductPage 