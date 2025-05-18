'use client'
import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import Rating from '../../ui/rating'
import Link from 'next/link'
import SafeImage from '@/components/common/SafeImage'

const ProductOverView = ({ product }) => {
    if (!product) {
        return <div className='row align-items-center'><div className="col-12"><p>Producto no encontrado o sin información.</p></div></div>;
    }
    return (
        <div className='row align-items-center'>
            <div className="col-lg-5 col-md-12">
                <div className="products-details-image">
                    <PhotoProvider>
                        <PhotoView src={product.image}>
                            <SafeImage 
                                width={526} 
                                height={601} 
                                sizes='100vw' 
                                src={product.image} 
                                alt={product.name}
                                fallbackType="products"
                            />
                        </PhotoView>
                    </PhotoProvider>
                </div>
            </div>
            <div className="col-lg-7 col-md-12">
                <div className="products-details-desc">
                    <div className="products-review">
                        <Rating rating={product.rating || 4.5} isCountNumberShow={true}/>
                        
                        <Link href={`/single-products/${product.id}`} className="rating-count">
                            {product.reviews?.length || 0} reseñas
                        </Link>
                        <span className="in-stock">En Stock</span>
                    </div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="price">
                        {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
                        <span className="new-price">{product.newPrice}</span>
                    </div>
                    <div className="products-meta">
                        <span>Categoría : 
                            {product.categories?.map((category, index) => (
                                <Link key={index} href={`/products-list?category=${category}`}>
                                    {category}{index < product.categories.length - 1 ? ', ' : ''}
                                </Link>
                            ))}
                        </span>
                        <span>Etiquetas : 
                            {product.tags?.map((tag, index) => (
                                <Link key={index} href={`/products-list?tag=${tag}`}>
                                    {tag}{index < product.tags.length - 1 ? ', ' : ''}
                                </Link>
                            ))}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductOverView