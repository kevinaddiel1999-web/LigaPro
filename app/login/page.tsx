'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg border border-gray-700 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-yellow-500 text-center">Iniciar Sesión</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
        <button type="submit" className="bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-400 transition">
          Ingresar
        </button>
      </form>
    </div>
  );
}