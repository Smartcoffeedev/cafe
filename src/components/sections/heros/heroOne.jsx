'use client';

import React from 'react';
import styles from './heroOne.module.css';
import ModelViewer from '../3DModelViewer';

const HeroOne = () => {
  return (
    <section className={styles.heroSection}>
      <ModelViewer />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className={styles.heroContent}>
              <div className={styles.subTitle} data-animation="fade-zoom-in" data-delay={0.4}>
                <p>SMART COFFEE</p>
              </div>
              <div className={styles.heroTitle}>
                <span data-animation="fade-up">DISFRUTA DE UN BUEN CAFÉ</span>
                <span data-animation="fade-up" data-delay={0.2}>
                  <span className={styles.subHead}>MIENTRAS CONECTAS CON EL FUTURO</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroOne;