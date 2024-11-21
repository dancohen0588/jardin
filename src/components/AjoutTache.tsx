import { useState } from 'react';
import { TacheJardin } from '../types';

interface Props {
  onAjout: (tache: Omit<TacheJardin, 'id' | 'complete'>) => void;
}

export default function AjoutTache({ onAjout }: Props) {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [categorie, setCategorie] = useState<TacheJardin['categorie']>('entretien');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !date) return;
    
    onAjout({
      description: description.trim(),
      date,
      categorie
    });
    
    setDescription('');
    setDate('');
    setCategorie('entretien');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-1">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="Tailler les rosiers..."
            required
          />
        </div>
        
        <div>
          <label htmlFor="categorie" className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <select
            id="categorie"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value as TacheJardin['categorie'])}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="entretien">Entretien</option>
            <option value="plantation">Plantation</option>
            <option value="recolte">Récolte</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full md:w-auto px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
        >
          Ajouter une tâche
        </button>
      </div>
    </form>
  );
}