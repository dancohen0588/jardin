import { useState } from 'react';
import AjoutPlante from '../components/plantes/AjoutPlante';
import ListePlantes from '../components/plantes/ListePlantes';
import { Plante } from '../types';

interface Props {
  plantes: Plante[];
  onAjoutPlante: (plante: Omit<Plante, 'id'>) => void;
  onDeletePlante: (id: string) => void;
}

export default function PlantesPage({ plantes, onAjoutPlante, onDeletePlante }: Props) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Mes Plantes
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
        >
          {showForm ? 'Fermer' : 'Ajouter une plante'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Nouvelle plante
          </h3>
          <AjoutPlante onAjout={onAjoutPlante} />
        </div>
      )}

      <ListePlantes plantes={plantes} onDelete={onDeletePlante} />
    </div>
  );
}