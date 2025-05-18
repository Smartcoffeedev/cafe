import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LandingTeamCard = ({ member }) => {
    return (
        <div className="card">
            <div className="photo">
                <Image 
                    src={member.image} 
                    alt={member.name}
                    width={400}
                    height={400}
                    style={{
                        objectFit: 'cover',
                        borderRadius: '16px'
                    }}
                />
            </div>
            <div className="info">
                <h5>{member.name}</h5>
                <p>{member.position}</p>
                <div className="social">
                    {member.socialMedia?.linkedin && (
                        <a 
                            href={member.socialMedia.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="social-button"
                            title="LinkedIn"
                        >
                            <i className="bx bxl-linkedin"></i>
                        </a>
                    )}
                    {member.socialMedia?.github && (
                        <a 
                            href={member.socialMedia.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="social-button"
                            title="GitHub"
                        >
                            <i className="bx bxl-github"></i>
                        </a>
                    )}
                    {member.socialMedia?.twitter && (
                        <a 
                            href={member.socialMedia.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="social-button"
                            title="Twitter"
                        >
                            <i className="bx bxl-twitter"></i>
                        </a>
                    )}
                    {member.socialMedia?.instagram && (
                        <a 
                            href={member.socialMedia.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="social-button"
                            title="Instagram"
                        >
                            <i className="bx bxl-instagram"></i>
                        </a>
                    )}
                </div>
            </div>
            <style jsx>{`
                .card {
                    background: linear-gradient(135deg, #18192a 0%, #23263a 60%, #18192a 100%);
                    border-radius: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    box-shadow: 0 4px 24px rgba(37,99,235,0.10);
                    padding: 1.2rem 1rem 1rem 1rem;
                    width: 220px;
                    min-width: 220px;
                    max-width: 220px;
                    margin: 0 auto;
                    transition: box-shadow 0.2s, transform 0.2s;
                    height: 320px;
                    justify-content: flex-start;
                    position: relative;
                }

                .card:hover {
                    box-shadow: 0 8px 32px rgba(37,99,235,0.18);
                    transform: translateY(-6px) scale(1.03);
                }

                .photo {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-bottom: 0.7rem;
                    border: 3px solid #23263a;
                    background: #18192a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .info {
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.18rem;
                    text-align: center;
                    width: 100%;
                    flex: 1 1 auto;
                }

                .info h5 {
                    color: #fff;
                    font-size: 0.72rem;
                    font-weight: 500;
                    margin: 0 0 0.08rem 0;
                    line-height: 1.1;
                    letter-spacing: 0.01em;
                    text-transform: capitalize;
                    word-break: break-word;
                }

                .info p {
                    color: #43e97b;
                    font-size: 0.78rem;
                    margin: 0 0 0.18rem 0;
                    font-weight: 400;
                }

                .social {
                    display: flex;
                    justify-content: center;
                    gap: 0.4rem;
                    margin-top: 0.2rem;
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 1rem;
                }

                .social-button {
                    color: #fff;
                    font-size: 1rem;
                    transition: all 0.2s ease;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px;
                    border-radius: 50%;
                    background: rgba(37,99,235,0.08);
                }

                .social-button:hover {
                    background: #2563eb;
                    color: #fff;
                }
            `}</style>
        </div>
    );
};

export default LandingTeamCard; 