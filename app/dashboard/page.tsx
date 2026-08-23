import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-500">Panel de Control</h1>
        <Link
          href="/dashboard/nuevo"
          className="bg-yellow-500 text-black font-bold px-4 py-2 rounded hover:bg-yellow-400 transition"
        >
          + Crear Nuevo Análisis
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-2 text-white">Mis Pronósticos</h2>
          <p className="text-gray-400 text-sm">Gestiona tus predicciones guardadas sobre la LigaPro.</p>
        </div>
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-2 text-white">Estadísticas Guardadas</h2>
          <p className="text-gray-400 text-sm">Revisa el historial de rendimiento de tus pronósticos.</p>
        </div>
      </div>
    </div>
  );
}