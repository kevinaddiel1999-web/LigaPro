'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'aficionado' | 'analista'>('aficionado');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.user) {
      await supabase.from('profiles').insert([
        { id: data.user.id, email, full_name: fullName, role },
      ]);
      router.push('/login');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg border border-gray-700 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-yellow-500 text-center">Crear Cuenta</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre Completo</label>
          <input
            type="text"
            required
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
          <input
            type="email"
            required
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            required
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Selecciona tu Rol</label>
          <select
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
            value={role}
            onChange={(e) => setRole(e.target.value as 'aficionado' | 'analista')}
          >
            <option value="aficionado">Aficionado (Publica pronósticos)</option>
            <option value="analista">Analista (Crea artículos y análisis)</option>
          </select>
        </div>
        <button type="submit" className="bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-400 transition">
          Registrarse
        </button>
      </form>
    </div>
  );
}
