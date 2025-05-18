'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

const ImageUploader = ({ onChange, value }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value || '');

    const cropImage = (file) => {
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.onload = () => {
                        try {
                            const canvas = document.createElement('canvas');
                            const size = Math.min(img.width, img.height);
                            canvas.width = size;
                            canvas.height = size;
                            
                            const ctx = canvas.getContext('2d');
                            const x = (img.width - size) / 2;
                            const y = (img.height - size) / 2;
                            
                            ctx.drawImage(img, x, y, size, size, 0, 0, size, size);
                            
                            canvas.toBlob((blob) => {
                                if (!blob) {
                                    reject(new Error('Error al crear el blob'));
                                    return;
                                }
                                const croppedFile = new File([blob], file.name, {
                                    type: 'image/jpeg',
                                    lastModified: Date.now()
                                });
                                resolve(croppedFile);
                            }, 'image/jpeg', 0.95);
                        } catch (error) {
                            reject(error);
                        }
                    };
                    img.onerror = () => reject(new Error('Error al cargar la imagen'));
                    img.src = e.target.result;
                };
                reader.onerror = () => reject(new Error('Error al leer el archivo'));
                reader.readAsDataURL(file);
            } catch (error) {
                reject(error);
            }
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validar tipo de archivo
        if (!file.type.match(/^image\/(jpeg|png)$/)) {
            toast.error('Solo se permiten archivos JPG o PNG');
            return;
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('El archivo no debe superar los 5MB');
            return;
        }

        try {
            setUploading(true);
            
            // Recortar la imagen
            const croppedFile = await cropImage(file);
            
            // Crear una vista previa antes de subir
            const previewUrl = URL.createObjectURL(croppedFile);
            setPreview(previewUrl);

            const formData = new FormData();
            formData.append('image', croppedFile);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error al subir la imagen');
            }

            const data = await response.json();
            // Limpiar la URL de la vista previa
            URL.revokeObjectURL(previewUrl);
            setPreview(data.imageUrl);
            onChange(data.imageUrl);
            toast.success('Imagen subida correctamente');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al procesar la imagen');
            setPreview('');
            onChange('');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="image-uploader">
            <div className="preview-container">
                {preview ? (
                    <div className="image-preview">
                        <Image
                            src={preview}
                            alt="Preview"
                            width={200}
                            height={200}
                            style={{ objectFit: 'cover' }}
                        />
                        <button 
                            type="button" 
                            className="remove-btn"
                            onClick={() => {
                                setPreview('');
                                onChange('');
                            }}
                        >
                            <i className="bx bx-x"></i>
                        </button>
                    </div>
                ) : (
                    <div className="upload-placeholder">
                        <i className="bx bx-cloud-upload"></i>
                        <span>Haz clic para subir una imagen</span>
                        <span className="file-types">JPG o PNG (máx. 5MB)</span>
                    </div>
                )}
            </div>
            <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                disabled={uploading}
                className="file-input"
            />
            {uploading && (
                <div className="uploading-overlay">
                    <div className="spinner"></div>
                    <span>Subiendo imagen...</span>
                </div>
            )}
            <style jsx>{`
                .image-uploader {
                    position: relative;
                    width: 100%;
                    max-width: 300px;
                    margin: 0 auto;
                }
                .preview-container {
                    position: relative;
                    width: 100%;
                    height: 200px;
                    border: 2px dashed #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .preview-container:hover {
                    border-color: #4CAF50;
                }
                .image-preview {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                .remove-btn {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: rgba(255, 255, 255, 0.8);
                    border: none;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .remove-btn:hover {
                    background: rgba(255, 0, 0, 0.8);
                    color: white;
                }
                .upload-placeholder {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    color: #666;
                    gap: 10px;
                }
                .upload-placeholder i {
                    font-size: 48px;
                    color: #4CAF50;
                }
                .file-types {
                    font-size: 12px;
                    color: #999;
                }
                .file-input {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    cursor: pointer;
                }
                .uploading-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.8);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }
                .spinner {
                    width: 30px;
                    height: 30px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid #4CAF50;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default ImageUploader; 