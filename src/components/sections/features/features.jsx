'use client';
import React, { useState, useEffect } from 'react'
import FeatureCard from './featureCard'

const Features = () => {
    const [features, setFeatures] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        fetch('/api/features')
            .then(res => res.json())
            .then(data => setFeatures(data.featuresData || []));
    }, []);

    return (
        <div className="features-section-2 pt-100 pb-70">
            <div className="container">
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={feature.id} className="feature-grid-item">
                            <FeatureCard
                                feature={feature}
                                index={index}
                                expanded={expandedIndex === index}
                                onExpand={() => setExpandedIndex(index)}
                                onCollapse={() => setExpandedIndex(null)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 32px;
                }
                .feature-grid-item {
                    min-height: 370px;
                    display: flex;
                }
                .feature-box {
                    border-radius: 18px !important;
                    min-height: 370px;
                    display: flex;
                    flex-direction: column;
                    transition: min-height 0.3s;
                }
                .feature-box.expanded {
                    min-height: 370px;
                }
            `}</style>
        </div>
    )
}

export default Features