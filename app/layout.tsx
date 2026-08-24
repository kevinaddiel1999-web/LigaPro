import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'LigaPro - Análisis y Pronósticos',
  description: 'Estadísticas, análisis tácticos y resultados de la LigaPro Ecuador',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-900 text-white min-h-screen flex flex-col">
        <header className="bg-gray-800 border-b border-gray-700 py-4 px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-yellow-500">
            ⚽ LigaPro Ecuador
          </Link>
          <nav className="flex gap-4 items-center">
            <Link href="/" className="hover:text-yellow-500">Inicio</Link>
            <Link href="/analisis" className="hover:text-yellow-500">Análisis</Link>
            <Link href="/dashboard" className="hover:text-yellow-500">Mi Panel</Link>
            <Link href="/login" className="bg-yellow-500 text-black px-3 py-1 rounded font-semibold hover:bg-yellow-400">
              Ingresar
            </Link>
          </nav>
        </header>
        <main className="flex-1 p-6">{children}</main>
        <footer className="bg-gray-800 text-center py-4 border-t border-gray-700 text-sm text-gray-400">
          Proyecto Integrador LigaPro - Next.js & Supabase
        </footer>
      </body>
    </html>
  );
}