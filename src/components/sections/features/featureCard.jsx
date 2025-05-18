'use client';
import React, { useEffect, useState, Suspense } from 'react';

const DynamicIcon = ({ icon }) => {
    if (!icon || typeof icon !== 'string' || !icon.includes(':')) return null;
    const [IconComponent, setIconComponent] = useState(null);
    useEffect(() => {
        const [library, name] = icon.split(':');
        import(`react-icons/${library}/index.js`).then(module => {
            setIconComponent(() => module[name]);
        });
    }, [icon]);
    if (!IconComponent) return <span style={{fontSize:'40px', width:40, height:40, display:'inline-block', opacity:0.3}}>⏳</span>;
    return <IconComponent style={{ fontSize: 40, width: 40, height: 40, display: 'inline-block' }} />;
};

const FeatureCard = ({ feature, index, expanded, onExpand, onCollapse }) => {
    const maxLength = 100;
    const isLong = feature.description.length > maxLength;
    const shortDesc = isLong ? feature.description.slice(0, maxLength) + '...' : feature.description;
    return (
        <div
            className={`feature-box${expanded ? ' expanded' : ''}`}
            data-animation="fade-up"
            data-delay={index * 0.1}
            style={{ borderRadius: 18, paddingTop: 0, marginTop: 0 }}
        >
            <div className="icon" style={{ marginBottom: 0, marginTop: 0, textAlign: 'left', paddingTop: 0 }}>
                <Suspense fallback={<span style={{fontSize:'24px', width:24, height:24, display:'inline-block', opacity:0.3}}>⏳</span>}>
                    <DynamicIcon icon={feature.icon} />
                </Suspense>
            </div>
            <h3 style={{ marginTop: 0 }}>{feature.title}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <p className={expanded ? '' : 'feature-desc-abbr'} style={{ marginBottom: 0 }}>
                    {expanded || !isLong ? feature.description : shortDesc}
                </p>
                {isLong && !expanded && (
                    <button
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#2563eb',
                            cursor: 'pointer',
                            fontSize: '1em',
                            textDecoration: 'underline',
                            alignSelf: 'flex-start',
                            marginTop: 4
                        }}
                        onClick={onExpand}
                    >
                        Ver más
                    </button>
                )}
                {isLong && expanded && (
                    <button
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#2563eb',
                            cursor: 'pointer',
                            fontSize: '1em',
                            textDecoration: 'underline',
                            alignSelf: 'flex-start',
                            marginTop: 4
                        }}
                        onClick={onCollapse}
                    >
                        Ver menos
                    </button>
                )}
            </div>
            <style jsx>{`
                .feature-desc-abbr {
                    max-height: 4.8em;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                }
            `}</style>
        </div>
    )
}

export default FeatureCard