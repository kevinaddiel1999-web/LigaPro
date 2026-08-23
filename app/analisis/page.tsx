import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0; // Forzar contenido dinámico

export default async function AnalisisPage() {
  const { data: articulos } = await supabase
    .from('articulos_partidos')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-yellow-500">Análisis Tácticos y Estadísticas</h1>
      
      {!articulos || articulos.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center text-gray-400">
          No hay análisis publicados aún. ¡Sé el primero en publicar uno desde tu panel!
        </div>
      ) : (
        <div className="grid gap-4">
          {articulos.map((item: any) => (
            <div key={item.id} className="bg-gray-800 p-5 rounded-lg border border-gray-700 flex flex-col gap-2">
              <span className="text-xs text-yellow-500 font-semibold">{item.partido_info}</span>
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