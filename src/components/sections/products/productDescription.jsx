import Image from 'next/image'
import React from 'react'

const ProductDescription = ({ product }) => {
    if (!product) {
        return <div className="tab-pane fade show active" id="description-tab-pane" role="tabpanel" aria-labelledby="description-tab" tabIndex={0}>
            <p>Producto no encontrado o sin descripción.</p>
        </div>;
    }
    return (
        <div className="tab-pane fade show active" id="description-tab-pane" role="tabpanel" aria-labelledby="description-tab" tabIndex={0}>
            <p>{product.description || 'Descripción del producto...'}</p>
            <div className="row mt-30">
                <div className="col-lg-4 col-md-6">
                    <div className="dectip-img">
                        <Image width={416} height={377} sizes='100vw' src={product.image} alt={product.name} />
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="dectip-1">
                        <ul>
                            <li>Calidad Premium</li>
                            <li>Origen Certificado</li>
                            <li>Tostado Artesanal</li>
                            <li>Empaque Fresco</li>
                            <li>Notas de Sabor Únicas</li>
                            <li>100% Arábica</li>
                            <li>Comercio Justo</li>
                            <li>Envío Gratis</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription