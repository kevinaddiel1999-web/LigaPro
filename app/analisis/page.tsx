import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function AnalisisPage() {
  const { data: articulos, error } = await supabase
    .from('articulos_partidos')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-yellow-500">Análisis Tácticos y Estadísticas</h1>
          <p className="text-gray-400 text-sm mt-1">Pronósticos y seguimiento del fútbol ecuatoriano.</p>
        </div>
        <Link
          href="/"
          className="text-xs bg-gray-800 text-gray-300 hover:text-white px-3 py-2 rounded-md border border-gray-700 transition"
        >
          ← Volver al Inicio
        </Link>
      </div>

      {error && (
        <div className="bg-red-900/40 border border-red-500 text-red-300 p-4 rounded-lg">
          Error al cargar los datos: {error.message}
        </div>
      )}

      {!articulos || articulos.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center text-gray-400">
          No hay análisis publicados aún.
        </div>
      ) : (
        <div className="grid gap-4">
          {articulos.map((item: any) => (
            <div key={item.id} className="bg-gray-800 p-5 rounded-lg border border-gray-700 flex flex-col gap-2 hover:border-yellow-500/50 transition">
              <div className="flex justify-between items-center">
                <span className="text-xs text-yellow-500 font-semibold px-2 py-0.5 bg-yellow-500/10 rounded border border-yellow-500/20">
                  {item.partido_info}
                </span>
                {item.pronostico && (
                  <span className="text-xs text-gray-400">
                    Pronóstico: <strong className="text-yellow-400">{item.pronostico}</strong>
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-white">{item.titulo}</h2>
              <p className="text-gray-300 text-sm line-clamp-2">{item.contenido}</p>
              <Link href={`/analisis/${item.id}`} className="text-yellow-500 hover:underline text-sm font-semibold mt-2 self-start">
                Leer análisis completo →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}