import { Calendar, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { TacheJardin } from '../types';

interface Props {
  taches: TacheJardin[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TableauTaches({ taches, onToggleComplete, onDelete }: Props) {
  const getCategorieStyle = (categorie: TacheJardin['categorie']) => {
    const styles = {
      entretien: 'bg-blue-100 text-blue-800',
      plantation: 'bg-green-100 text-green-800',
      recolte: 'bg-yellow-100 text-yellow-800',
      autre: 'bg-gray-100 text-gray-800'
    };
    return `${styles[categorie]} px-2 py-1 rounded-full text-sm font-medium`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              État
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Catégorie
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {taches.map((tache) => (
            <tr key={tache.id} className={tache.complete ? 'bg-gray-50' : ''}>
              <td className="px-6 py-4">
                <button
                  onClick={() => onToggleComplete(tache.id)}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  {tache.complete ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
              </td>
              <td className="px-6 py-4">
                <span className={tache.complete ? 'line-through text-gray-500' : ''}>
                  {tache.description}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={getCategorieStyle(tache.categorie)}>
                  {tache.categorie.charAt(0).toUpperCase() + tache.categorie.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {tache.date}
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onDelete(tache.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}