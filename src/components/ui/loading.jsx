'use client'
import React, { useEffect, useState } from 'react'

const Loading = ({ show = true }) => {
    if (!show) return null;
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2);
    }, [])
    return (
        <div className="loader-container">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Jarra */}
                <rect x="35" y="20" width="50" height="50" rx="18" fill="#fff" fillOpacity="0.9"/>
                <rect x="50" y="10" width="20" height="20" rx="8" fill="#fff" fillOpacity="0.7"/>
                {/* Asa */}
                <path d="M85 40 Q105 60 85 80" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round"/>
                {/* Café animado */}
                <rect>
                    <animate attributeName="y" values="55;70;55" dur="1.2s" repeatCount="indefinite"/>
                    <animate attributeName="height" values="15;0;15" dur="1.2s" repeatCount="indefinite"/>
                </rect>
                <rect x="45" y="55" width="30" height="15" rx="7" fill="#fff" fillOpacity="0.2"/>
                {/* Taza */}
                <ellipse cx="60" cy="100" rx="18" ry="8" fill="#fff" fillOpacity="0.9"/>
                <rect x="48" y="90" width="24" height="15" rx="7" fill="#fff" fillOpacity="0.9"/>
                {/* Café cayendo */}
                <rect x="60" y="70" width="4" height="20" rx="2" fill="#fff">
                    <animate attributeName="y" values="70;90;70" dur="1.2s" repeatCount="indefinite"/>
                </rect>
            </svg>
            <style jsx>{`
                .loader-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: #05051E;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 99999;
                    transition: opacity 0.3s;
                }
            `}</style>
        </div>
    )
}

export default Loading