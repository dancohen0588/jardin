import { CalendarClock, Lightbulb } from 'lucide-react';
import { getSuggestionsSaison } from '../utils/taskSuggestions';
import { Plante, TacheJardin } from '../types';

interface Props {
  plantes: Plante[];
  onAjoutTache: (tache: Omit<TacheJardin, 'id' | 'complete'>) => void;
}

export default function SuggestionsTaches({ plantes, onAjoutTache }: Props) {
  const suggestions = getSuggestionsSaison(plantes);
  
  const ajouterTache = (suggestion: { description: string; categorie: TacheJardin['categorie']; delaiJours: number }) => {
    const date = new Date();
    date.setDate(date.getDate() + suggestion.delaiJours);
    
    onAjoutTache({
      description: suggestion.description,
      categorie: suggestion.categorie,
      date: date.toISOString().split('T')[0]
    });
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-emerald-600" />
        <h3 className="text-lg font-semibold text-emerald-800">
          Suggestions d'entretien
        </h3>
      </div>

      <div className="space-y-3">
        {suggestions.slice(0, 5).map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CalendarClock className="w-4 h-4" />
                <span>
                  {suggestion.delaiJours === 0
                    ? "Aujourd'hui"
                    : suggestion.delaiJours === 1
                    ? "Demain"
                    : `Dans ${suggestion.delaiJours} jours`}
                </span>
              </div>
              <span className="text-gray-800">{suggestion.description}</span>
            </div>
            
            <button
              onClick={() => ajouterTache(suggestion)}
              className="px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors"
            >
              Ajouter
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}