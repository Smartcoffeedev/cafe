'use client'
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const FAQPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [editingFaq, setEditingFaq] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        question: '',
        answer: ''
    });
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isAdmin = localStorage.getItem('isAdmin');
            if (!isAdmin) {
                router.replace('/login');
            } else {
                setAuthChecked(true);
                loadFaqs();
            }
        }
    }, [router]);

    const loadFaqs = async () => {
        try {
            const response = await fetch('/api/faq');
            if (!response.ok) {
                throw new Error('Error al cargar las FAQs');
            }
            const data = await response.json();
            setFaqs(data.faqData || []);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al cargar las FAQs');
        }
    };

    const handleEdit = (faq) => {
        setEditingFaq(faq);
        setFormData({
            question: faq.question,
            answer: faq.answer
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta FAQ?')) {
            try {
                const response = await fetch('/api/faq', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setFaqs(data.faqData);
                    toast.success('FAQ eliminada correctamente');
                } else {
                    throw new Error('Error al eliminar la FAQ');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Error al eliminar la FAQ');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editingFaq ? 'PUT' : 'POST';
            const response = await fetch('/api/faq', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingFaq ? { ...formData, id: editingFaq.id } : formData),
            });

            if (response.ok) {
                const data = await response.json();
                setFaqs(data.faqData);
                toast.success(editingFaq ? 'FAQ actualizada correctamente' : 'FAQ agregada correctamente');
                
                setEditingFaq(null);
                setShowAddModal(false);
                setFormData({
                    question: '',
                    answer: ''
                });
            } else {
                throw new Error('Error al guardar la FAQ');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al guardar la FAQ');
        }
    };

    const Modal = ({ show, onClose, children }) => {
        if (!show) return null;
        
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="modal-close" onClick={onClose}>×</button>
                    {children}
                </div>
            </div>
        );
    };

    if (!authChecked) return null;

    return (
        <div className="admin-container-col">
            <div className="admin-header-row">
                <h1 className="admin-title">Gestión de FAQs</h1>
                <button 
                    className="add-button"
                    onClick={() => setShowAddModal(true)}
                >
                    <i className='bx bx-plus'></i>
                    Agregar FAQ
                </button>
            </div>

            <div className="faqs-admin-grid">
                {faqs.map((faq) => (
                    <div key={faq.id} className="admin-faq-card">
                        <div className="admin-faq-content">
                            <h3 className="admin-card-title">{faq.question}</h3>
                            <p className="admin-faq-answer">{faq.answer}</p>
                            <div className="admin-faq-actions">
                                <button 
                                    className="edit-button"
                                    onClick={() => handleEdit(faq)}
                                >
                                    <i className='bx bx-edit'></i>
                                    Editar
                                </button>
                                <button 
                                    className="delete-button"
                                    onClick={() => handleDelete(faq.id)}
                                >
                                    <i className='bx bx-trash'></i>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal show={showAddModal || editingFaq} onClose={() => {
                setShowAddModal(false);
                setEditingFaq(null);
            }}>
                <form onSubmit={handleSubmit} className="faq-form">
                    <div className="form-group">
                        <label>Pregunta</label>
                        <input
                            type="text"
                            value={formData.question}
                            onChange={(e) => setFormData({...formData, question: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Respuesta</label>
                        <textarea
                            value={formData.answer}
                            onChange={(e) => setFormData({...formData, answer: e.target.value})}
                            required
                            rows="4"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-update">
                            {editingFaq ? 'Actualizar' : 'Agregar'}
                        </button>
                        <button type="button" className="btn-cancel" onClick={() => {
                            setShowAddModal(false);
                            setEditingFaq(null);
                        }}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </Modal>

            <style jsx>{`
                .admin-container-col {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 2rem 1rem;
                }
                .admin-header-row {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
                }
                .admin-title {
                    font-size: 2rem;
                    color: #ffffff;
                    font-weight: 600;
                    margin-bottom: 0;
                }
                .add-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #2563eb;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }
                .add-button:hover {
                    background: #1d4ed8;
                }
                .faqs-admin-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem;
                    width: 100%;
                }
                .admin-faq-card {
                    background: #1a1a1a;
                    border-radius: 1rem;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .admin-faq-content {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .admin-card-title {
                    font-size: 1.15rem;
                    color: #fff;
                    font-weight: 700;
                    margin-bottom: 0.25rem;
                    line-height: 1.2;
                }
                .admin-faq-answer {
                    color: #bdbdbd;
                    font-size: 0.98rem;
                    line-height: 1.5;
                }
                .admin-faq-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 0.5rem;
                }
                .edit-button, .delete-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    border: none;
                    cursor: pointer;
                    font-size: 0.93rem;
                    transition: all 0.3s ease;
                }
                .edit-button {
                    background: #2563eb;
                    color: white;
                }
                .delete-button {
                    background: #dc2626;
                    color: white;
                }
                .edit-button:hover, .delete-button:hover {
                    opacity: 0.9;
                }
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.75);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .modal-content {
                    background: #1a1a1a;
                    padding: 2rem;
                    border-radius: 1rem;
                    width: 90%;
                    max-width: 600px;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                }
                .modal-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    color: #ffffff;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                .faq-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .form-group label {
                    color: #ffffff;
                    font-size: 0.875rem;
                }
                .form-group input,
                .form-group textarea {
                    background: #2a2a2a;
                    border: 1px solid #333;
                    border-radius: 0.5rem;
                    padding: 0.75rem;
                    color: #ffffff;
                    font-size: 1rem;
                }
                .form-group textarea {
                    resize: vertical;
                    min-height: 100px;
                }
                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .btn-update, .btn-cancel {
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }
                .btn-update {
                    background: #2563eb;
                    color: white;
                }
                .btn-cancel {
                    background: #dc2626;
                    color: white;
                }
                .btn-update:hover, .btn-cancel:hover {
                    opacity: 0.9;
                }
                @media (max-width: 1200px) {
                    .faqs-admin-grid {
                        grid-template-columns: 1fr;
                    }
                }
                @media (max-width: 768px) {
                    .admin-header-row {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.75rem;
                        margin-bottom: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default FAQPage;