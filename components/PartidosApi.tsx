'use client';

import { useEffect, useState } from 'react';

interface Evento {
  idEvent: string;
  strEvent: string;
  dateEvent: string;
  strTime: string;
  strStatus: string;
}

export default function PartidosApi() {
  const [partidos, setPartidos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Consumo de API Externa (TheSportsDB)
    fetch('https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=2024-05-19&s=Soccer')
      .then((res) => res.json())
      .then((data) => {
        if (data.events) {
          setPartidos(data.events.slice(0, 5));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 mt-8">
      <h2 className="text-xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
        ⚽ Partidos en Vivo & Resultados (API Externa)
      </h2>

      {loading ? (
        <p className="text-gray-400 text-sm">Obteniendo datos en tiempo real...</p>
      ) : partidos.length > 0 ? (
        <div className="space-y-3">
          {partidos.map((item) => (
            <div key={item.idEvent} className="bg-gray-900 p-3 rounded-lg flex justify-between items-center border border-gray-700">
              <span className="text-white font-medium text-sm">{item.strEvent}</span>
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                {item.dateEvent}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No se pudieron cargar eventos de la API externa.</p>
      )}
    </div>
  );
}