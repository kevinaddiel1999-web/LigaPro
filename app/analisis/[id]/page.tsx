import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DetalleAnalisisPage({ params }: PageProps) {
  const { id } = await params;

  const { data: articulo, error } = await supabase
    .from('articulos_partidos')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !articulo) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/analisis"
        className="inline-flex items-center text-xs bg-gray-800 text-gray-300 hover:text-white px-3 py-1.5 rounded-md border border-gray-700 transition"
      >
        ← Volver a Lista de Análisis
      </Link>

      <article className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl space-y-6">
        <div className="space-y-2 border-b border-gray-700/60 pb-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full">
              {articulo.partido_info}
            </span>
            <span className="text-xs text-gray-500">
              {articulo.created_at ? new Date(articulo.created_at).toLocaleDateString('es-EC') : ''}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white pt-2">{articulo.titulo}</h1>
        </div>

        <div className="text-gray-300 leading-relaxed whitespace-pre-line text-base">
          {articulo.contenido}
        </div>

        {articulo.pronostico && (
          <div className="bg-gray-900/80 p-4 rounded-xl border border-yellow-500/30 flex justify-between items-center mt-6">
            <span className="text-sm font-semibold text-gray-400">Pronóstico Sugerido:</span>
            <span className="text-base font-bold text-yellow-400">{articulo.pronostico}</span>
          </div>
        )}
      </article>
    </div>
  );
}