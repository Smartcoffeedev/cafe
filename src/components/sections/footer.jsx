'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getFooterData } from '@/utils/dataUtils'

const Footer = () => {
  const footerData = getFooterData();

  return (
    <footer className="footer-area">
      <div className="footer-content">
        <div className="footer-logo">
          <Image
            src={'/img/all-img/logo/logotipo w.png'}
            alt="SmartCoffee Logo"
            width={150}
            height={50}
            style={{ margin: '0 auto' }}
          />
        </div>
        <p className="footer-desc">{footerData.description}</p>
        <div className="footer-contact">
          <span><i className="bx bx-map"></i> {footerData.contactInfo.address}</span>
          <span><i className="bx bx-envelope"></i> <Link href={`mailto:${footerData.contactInfo.email}`}>{footerData.contactInfo.email}</Link></span>
          <span><i className="bx bx-phone"></i> <Link href={`tel:${footerData.contactInfo.phone.replace(/\s+/g, '')}`}>{footerData.contactInfo.phone}</Link></span>
        </div>
        <div className="footer-social">
          <a href={footerData.socialMedia.facebook} target="_blank" rel="noopener noreferrer"><i className="bx bxl-facebook"></i></a>
          <a href={footerData.socialMedia.instagram} target="_blank" rel="noopener noreferrer"><i className="bx bxl-instagram"></i></a>
          <a href={footerData.socialMedia.twitter} target="_blank" rel="noopener noreferrer"><i className="bx bxl-twitter"></i></a>
        </div>
      </div>
      <div className="footer-copyright">
        <p>{footerData.copyright}</p>
      </div>
      <style jsx>{`
        .footer-area {
          background: #0a0a1a;
          color: #fff;
          padding: 48px 0 0 0;
        }
        .footer-content {
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
        }
        .footer-logo {
          margin-bottom: 18px;
        }
        .footer-desc {
          font-size: 1.1rem;
          margin-bottom: 18px;
          color: #bdbdbd;
        }
        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 18px;
          font-size: 1rem;
        }
        .footer-contact i {
          margin-right: 8px;
          color: #43A5FE;
        }
        .footer-contact a {
          color: #43A5FE;
          text-decoration: none;
        }
        .footer-social {
          margin-bottom: 18px;
        }
        .footer-social a {
          color: #fff;
          font-size: 1.6rem;
          margin: 0 10px;
          transition: color 0.2s;
        }
        .footer-social a:hover {
          color: #43A5FE;
        }
        .footer-copyright {
          border-top: 1px solid #222;
          margin-top: 24px;
          padding: 18px 0 8px 0;
          text-align: center;
          color: #bdbdbd;
          font-size: 0.95rem;
        }
        @media (max-width: 600px) {
          .footer-content {
            padding: 0 10px;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer