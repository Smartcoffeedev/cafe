import React from 'react'
import FeatureCard from './featureCard'
import data from '@/db/featuresData.json'

const Features = () => {
    return (
        <div className="features-section-2 pt-100 pb-70">
            <div className="container">
                <div className="row">
                    {data.featuresData.map((feature, index) => (
                        <div key={feature.id} className="col-xl-3 col-lg-6 col-sm-6">
                            <FeatureCard feature={feature} index={index}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features