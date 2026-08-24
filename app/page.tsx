import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function HomePage() {
  const { data: ultimosAnalisis } = await supabase
    .from('articulos_partidos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="text-center py-10 bg-gray-800 rounded-xl border border-gray-700 px-4">
        <h1 className="text-4xl font-extrabold text-yellow-500 mb-3">
          Estadísticas y Análisis de la LigaPro
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Plataforma de pronósticos, seguimiento de partidos y análisis táctico del fútbol ecuatoriano.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/analisis"
            className="bg-yellow-500 text-black font-bold px-5 py-2.5 rounded-lg hover:bg-yellow-400 transition"
          >
            Ver Análisis
          </Link>
          <Link
            href="/login"
            className="bg-gray-700 text-white font-bold px-5 py-2.5 rounded-lg border border-gray-600 hover:bg-gray-600 transition"
          >
            Iniciar Sesión
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Últimos Análisis Publicados</h2>
        {!ultimosAnalisis || ultimosAnalisis.length === 0 ? (
          <p className="text-gray-400 bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
            Aún no hay publicaciones disponibles.
          </p>
        ) : (
          <div className="grid gap-4">
            {ultimosAnalisis.map((item: any) => (
              <div key={item.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <span className="text-xs text-yellow-500 font-semibold">{item.partido_info}</span>
                <h3 className="text-lg font-bold text-white">{item.titulo}</h3>
                <p className="text-gray-300 text-sm line-clamp-2 mt-1">{item.contenido}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}