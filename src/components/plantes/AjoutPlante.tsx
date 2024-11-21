import { useState } from 'react';
import { Plante } from '../../types';
import { Sun, Moon } from 'lucide-react';

interface Props {
  onAjout: (plante: Omit<Plante, 'id'>) => void;
}

export default function AjoutPlante({ onAjout }: Props) {
  const [nom, setNom] = useState('');
  const [type, setType] = useState<Plante['type']>('legume');
  const [emplacement, setEmplacement] = useState('');
  const [datePlantation, setDatePlantation] = useState('');
  const [soleil, setSoleil] = useState(true);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !emplacement.trim() || !datePlantation) return;

    onAjout({
      nom: nom.trim(),
      type,
      emplacement: emplacement.trim(),
      datePlantation,
      soleil,
      notes: notes.trim() || undefined
    });

    setNom('');
    setType('legume');
    setEmplacement('');
    setDatePlantation('');
    setSoleil(true);
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
            Nom de la plante
          </label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="Tomate Roma..."
            required
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as Plante['type'])}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="legume">Légume</option>
            <option value="fruit">Fruit</option>
            <option value="fleur">Fleur</option>
            <option value="aromatique">Aromatique</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div>
          <label htmlFor="emplacement" className="block text-sm font-medium text-gray-700 mb-1">
            Emplacement
          </label>
          <input
            type="text"
            id="emplacement"
            value={emplacement}
            onChange={(e) => setEmplacement(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="Potager Sud..."
            required
          />
        </div>

        <div>
          <label htmlFor="datePlantation" className="block text-sm font-medium text-gray-700 mb-1">
            Date de plantation
          </label>
          <input
            type="date"
            id="datePlantation"
            value={datePlantation}
            onChange={(e) => setDatePlantation(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exposition
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setSoleil(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                soleil
                  ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                  : 'bg-gray-100 text-gray-600 border-gray-200'
              } border`}
            >
              <Sun className="w-5 h-5" />
              Ensoleillé
            </button>
            <button
              type="button"
              onClick={() => setSoleil(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                !soleil
                  ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                  : 'bg-gray-100 text-gray-600 border-gray-200'
              } border`}
            >
              <Moon className="w-5 h-5" />
              Ombragé
            </button>
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes (optionnel)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            rows={3}
            placeholder="Variété, conseils d'entretien..."
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
        >
          Ajouter la plante
        </button>
      </div>
    </form>
  );
}