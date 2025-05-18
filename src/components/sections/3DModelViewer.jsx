'use client';

import React, { useEffect } from 'react';

const ModelViewer = () => {
  useEffect(() => {
    if (!document.querySelector('script[src*="splinetool/viewer"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.96/build/spline-viewer.js';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <spline-viewer
        url="https://prod.spline.design/44DlCQFHT2T49ZNP/scene.splinecode"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      ></spline-viewer>
    </div>
  );
};

export default ModelViewer; 