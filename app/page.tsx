import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function HomePage() {
  const { data: ultimosArticulos } = await supabase
    .from('articulos_partidos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(2);

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-12 px-6 bg-gray-800/60 rounded-2xl border border-gray-700/60 backdrop-blur">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-500 tracking-tight">
          Estadísticas y Análisis de la LigaPro
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Plataforma de pronósticos, seguimiento de partidos y análisis táctico del fútbol ecuatoriano.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/analisis"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-yellow-500/10"
          >
            Ver Análisis
          </Link>
          <Link
            href="/login"
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-xl transition border border-gray-600"
          >
            Iniciar Sesión
          </Link>
        </div>
      </section>

      {/* Últimos Análisis */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Últimos Análisis Publicados</h2>
          <Link href="/analisis" className="text-yellow-500 hover:underline text-sm font-semibold">
            Ver todos →
          </Link>
        </div>

        {!ultimosArticulos || ultimosArticulos.length === 0 ? (
          <div className="bg-gray-800 text-center py-8 rounded-xl border border-gray-700 text-gray-400">
            Aún no hay publicaciones disponibles.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {ultimosArticulos.map((item: any) => (
              <div key={item.id} className="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-yellow-500/40 transition">
                <span className="text-xs text-yellow-500 font-semibold">{item.partido_info}</span>
                <h3 className="text-lg font-bold text-white mt-1 mb-2">{item.titulo}</h3>
                <p className="text-gray-300 text-sm line-clamp-2">{item.contenido}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}