import React from 'react';

const Login = () => (
  <div className="min-h-screen bg-dark-custom text-light-custom flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold mb-4">Iniciar Sesión</h1>
    <form className="bg-card-custom p-8 rounded-lg shadow-lg w-full max-w-sm">
      <div className="mb-4">
        <label className="block text-light-custom mb-2">Usuario</label>
        <input type="text" className="w-full p-2 rounded bg-dark-custom border border-gray-700 text-light-custom" />
      </div>
      <div className="mb-6">
        <label className="block text-light-custom mb-2">Contraseña</label>
        <input type="password" className="w-full p-2 rounded bg-dark-custom border border-gray-700 text-light-custom" />
      </div>
      <button type="submit" className="btn-custom w-full py-2 rounded">Entrar</button>
    </form>
  </div>
);

export default Login; 