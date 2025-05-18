'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter();
    const [user, setUser] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user === 'Admin' && pass === 'Admin2025') {
            if (typeof window !== 'undefined') {
                localStorage.setItem('isAdmin', 'true');
            }
            router.push('/admin');
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="login-section" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--DarkBg, #05051E)'
        }}>
            <div className="container" style={{ maxWidth: '400px', zIndex: 10, position: 'relative', marginTop: '80px' }}>
                <div className="accounts-from" style={{
                    background: '#16171A',
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #1a243d',
                    color: '#fff'
                }}>
                    <h2 style={{
                        color: '#fff',
                        textAlign: 'center',
                        marginBottom: '1.5rem',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        fontFamily: 'Plus Jakarta Sans, sans-serif'
                    }}>Smart Coffee Admin</h2>
                    <p style={{
                        color: '#b9b9ba',
                        textAlign: 'center',
                        marginBottom: '1.5rem'
                    }}>Iniciar sesión como administrador</p>
                    <form onSubmit={handleSubmit}>
                        <div className="login-from">
                            <div className="form-group" style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    color: '#fff',
                                    marginBottom: '0.5rem',
                                    display: 'block',
                                    fontWeight: '600'
                                }}>Usuario</label>
                                <input 
                                    type="text" 
                                    placeholder="Admin" 
                                    className="form-control" 
                                    value={user} 
                                    onChange={e => setUser(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: '1px solid #1a243d',
                                        background: '#232526',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        fontFamily: 'DM Sans, sans-serif',
                                        marginBottom: '0.5rem'
                                    }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    color: '#fff',
                                    marginBottom: '0.5rem',
                                    display: 'block',
                                    fontWeight: '600'
                                }}>Contraseña</label>
                                <input 
                                    type="password" 
                                    placeholder="Contraseña" 
                                    className="form-control" 
                                    value={pass} 
                                    onChange={e => setPass(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: '1px solid #1a243d',
                                        background: '#232526',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        fontFamily: 'DM Sans, sans-serif',
                                        marginBottom: '0.5rem'
                                    }}
                                />
                            </div>
                        </div>
                        {error && (
                            <div style={{
                                color: '#ff4444',
                                marginBottom: '1rem',
                                textAlign: 'center',
                                padding: '0.5rem',
                                background: 'rgba(255, 68, 68, 0.08)',
                                borderRadius: '6px',
                                fontWeight: '600'
                            }}>
                                {error}
                            </div>
                        )}
                        <button 
                            type="submit" 
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: 'linear-gradient(94deg, #43A5FE 21.18%, #0064C1 104.4%)',
                                color: '#fff',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 8px rgba(67, 165, 254, 0.15)'
                            }}
                        >
                            <i className="bx bx-chevron-right" />
                            <span>Entrar</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login