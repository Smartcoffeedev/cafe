import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [serverStatus, setServerStatus] = useState('checking');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/health');
        if (response.ok) {
          setServerStatus('connected');
        } else {
          setServerStatus('error');
        }
      } catch (error) {
        setServerStatus('error');
      }
    };

    checkServerStatus();
    const interval = setInterval(checkServerStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (serverStatus) {
      case 'connected':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const getStatusText = () => {
    switch (serverStatus) {
      case 'connected':
        return 'Servidor Conectado';
      case 'error':
        return 'Error de Conexión';
      default:
        return 'Verificando...';
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 bg-[#23263a] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#2d3142] transition-colors"
      >
        Mostrar Estado
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-[#23263a] text-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Estado del Servidor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/60 hover:text-white"
        >
          ×
        </button>
      </div>
      <div className={`flex items-center gap-2 ${getStatusColor()}`}>
        <div className={`w-3 h-3 rounded-full ${serverStatus === 'connected' ? 'bg-green-500' : serverStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
        <span>{getStatusText()}</span>
      </div>
    </div>
  );
};

export default Dashboard; 