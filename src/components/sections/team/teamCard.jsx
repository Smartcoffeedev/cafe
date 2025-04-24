import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const TeamCard = ({name, position, bio, image, socialMedia}) => {
    return (
        <div className="single-team">
            <div className="team-image">
                <Image 
                    src={image} 
                    alt={`${name} - ${position}`}
                    width={300}
                    height={300}
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="team-text">
                <div className="team-title">
                    <h4>{name}</h4>
                    <span>{position}</span>
                </div>
                <p>{bio}</p>
                <div className="team-social">
                    {socialMedia?.linkedin && (
                        <Link href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </Link>
                    )}
                    {socialMedia?.twitter && (
                        <Link href={socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </Link>
                    )}
                    {socialMedia?.github && (
                        <Link href={socialMedia.github} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </Link>
                    )}
                    {socialMedia?.instagram && (
                        <Link href={socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TeamCard