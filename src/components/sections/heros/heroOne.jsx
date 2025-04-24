import Link from 'next/link'
import React from 'react'
import Spline from '@splinetool/react-spline/next'

const HeroOne = () => {
  return (
    <div className="hero-section-2">
      <div className="spline-container">
        <Spline
          scene="https://prod.spline.design/bVFzOxZtpji56x2j/scene.splinecode"
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="hero-content-2">
              <div className="sub-title-2" data-animation="fade-zoom-in" data-delay={0.4}>
                <p>SMART COFFEE</p>
              </div>
              <h2>
                <span data-animation="fade-up">DISFRUTA DE UN BUEN CAFÉ</span>
                <span data-animation="fade-up" data-delay={0.2}>
                  <span className="sub-head">MIENTRAS CONECTAS CON EL FUTURO</span>
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroOne