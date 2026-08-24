'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const [titulo, setTitulo] = useState('');
  const [partidoInfo, setPartidoInfo] = useState('');
  const [contenido, setContenido] = useState('');
  const [pronostico, setPronostico] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');

    const { error } = await supabase.from('articulos_partidos').insert([
      {
        titulo,
        partido_info: partidoInfo,
        contenido,
        pronostico,
      },
    ]);

    if (error) {
      setMensaje(`Error: ${error.message}`);
    } else {
      setMensaje('¡Análisis publicado con éxito!');
      setTitulo('');
      setPartidoInfo('');
      setContenido('');
      setPronostico('');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-yellow-500">Panel de Administración</h1>
        <p className="text-gray-400 text-sm mt-1">Publica un nuevo análisis o pronóstico para la comunidad.</p>
      </div>

      {mensaje && (
        <div
          className={`p-4 rounded-lg text-sm border ${
            mensaje.startsWith('Error')
              ? 'bg-red-900/40 border-red-500 text-red-300'
              : 'bg-green-900/40 border-green-500 text-green-300'
          }`}
        >
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Título del Análisis</label>
          <input
            type="text"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Estrategia para el Clásico"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Partido / Encuentro</label>
          <input
            type="text"
            required
            value={partidoInfo}
            onChange={(e) => setPartidoInfo(e.target.value)}
            placeholder="Ej: Barcelona SC vs Emelec"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Pronóstico Recomendado</label>
          <input
            type="text"
            value={pronostico}
            onChange={(e) => setPronostico(e.target.value)}
            placeholder="Ej: Gana Local / Más de 2.5 Goles"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Contenido / Análisis Táctico</label>
          <textarea
            required
            rows={5}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Escribe los detalles tácticos del partido..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-yellow-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Publicar Análisis'}
        </button>
      </form>
    </div>
  );
}