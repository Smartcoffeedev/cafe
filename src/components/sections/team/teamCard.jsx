'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/common/SafeImage';
import { toast } from 'react-hot-toast';

const TeamCard = ({ member = {}, onEdit, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este miembro del equipo?')) {
            onDelete(member.id);
            toast.success('Miembro eliminado correctamente');
        }
    };

    return (
        <div 
            className="team-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                background: '#1a1a1a',
                borderRadius: '10px',
                padding: '20px',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'var(--admin-primary)',
                    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                }}
            />
            
            <div className="team-image" style={{ position: 'relative', height: '250px', marginBottom: '20px' }}>
                <SafeImage 
                    src={member?.image} 
                    alt={`${member?.name || 'Miembro del equipo'} - ${member?.position || 'Posición'}`}
                    width={250}
                    height={250}
                    className="team-member-img"
                    fallbackType="team"
                    style={{
                        objectFit: 'cover',
                        borderRadius: '10px',
                    }}
                />
            </div>

            <div className="team-content" style={{ textAlign: 'center', flex: 1 }}>
                <div className="team-title" style={{ marginBottom: '10px' }}>
                    <h4 style={{ 
                        color: '#fff', 
                        fontSize: '1.25rem', 
                        fontWeight: 600,
                        marginBottom: '5px'
                    }}>
                        {member?.name || 'Nombre no disponible'}
                    </h4>
                    <span style={{ 
                        color: '#bbb', 
                        fontSize: '0.9rem'
                    }}>
                        {member?.position || 'Posición no disponible'}
                    </span>
                </div>

                <p style={{ 
                    color: '#fff', 
                    margin: '15px 0',
                    fontSize: '0.95rem',
                    lineHeight: 1.6
                }}>
                    {member?.bio || 'Biografía no disponible'}
                </p>

                <div className="team-social" style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '15px',
                    margin: '15px 0'
                }}>
                    {member?.socialMedia?.linkedin && (
                        <Link href={member.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" style={{
                            color: 'var(--admin-text-secondary)',
                            fontSize: '1.5rem',
                            transition: 'color 0.3s ease'
                        }}>
                            <i className='bx bxl-linkedin'></i>
                        </Link>
                    )}
                    {member?.socialMedia?.twitter && (
                        <Link href={member.socialMedia.twitter} target="_blank" rel="noopener noreferrer" style={{
                            color: 'var(--admin-text-secondary)',
                            fontSize: '1.5rem',
                            transition: 'color 0.3s ease'
                        }}>
                            <i className='bx bxl-twitter'></i>
                        </Link>
                    )}
                    {member?.socialMedia?.github && (
                        <Link href={member.socialMedia.github} target="_blank" rel="noopener noreferrer" style={{
                            color: 'var(--admin-text-secondary)',
                            fontSize: '1.5rem',
                            transition: 'color 0.3s ease'
                        }}>
                            <i className='bx bxl-github'></i>
                        </Link>
                    )}
                    {member?.socialMedia?.instagram && (
                        <Link href={member.socialMedia.instagram} target="_blank" rel="noopener noreferrer" style={{
                            color: 'var(--admin-text-secondary)',
                            fontSize: '1.5rem',
                            transition: 'color 0.3s ease'
                        }}>
                            <i className='bx bxl-instagram'></i>
                        </Link>
                    )}
                </div>

                <div className="team-actions" style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '10px',
                    marginTop: '20px'
                }}>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(member);
                        }}
                        style={{
                            padding: '8px 16px',
                            background: 'var(--admin-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <i className='bx bx-edit'></i>
                        Editar
                    </button>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                        style={{
                            padding: '8px 16px',
                            background: '#ff4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <i className='bx bx-trash'></i>
                        Eliminar
                    </button>
                </div>
            </div>

            <style jsx>{`
                .team-card:hover {
                    border-color: var(--admin-primary);
                    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
                    transform: translateY(-10px);
                }
                .team-social a:hover {
                    color: var(--admin-primary);
                }
            `}</style>
        </div>
    );
};

export default TeamCard;