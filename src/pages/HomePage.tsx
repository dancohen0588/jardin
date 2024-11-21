import TableauTaches from '../components/TableauTaches';
import AjoutTache from '../components/AjoutTache';
import SuggestionsTaches from '../components/SuggestionsTaches';
import { TacheJardin, Plante } from '../types';

interface Props {
  taches: TacheJardin[];
  plantes: Plante[];
  onAjoutTache: (tache: Omit<TacheJardin, 'id' | 'complete'>) => void;
  onToggleComplete: (id: string) => void;
  onDeleteTache: (id: string) => void;
}

export default function HomePage({ taches, plantes, onAjoutTache, onToggleComplete, onDeleteTache }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Suggestions intelligentes
        </h2>
        <SuggestionsTaches plantes={plantes} onAjoutTache={onAjoutTache} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Ajouter une nouvelle tâche
        </h2>
        <AjoutTache onAjout={onAjoutTache} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tâches du jardin
        </h2>
        <TableauTaches
          taches={taches}
          onToggleComplete={onToggleComplete}
          onDelete={onDeleteTache}
        />
      </div>
    </div>
  );
}