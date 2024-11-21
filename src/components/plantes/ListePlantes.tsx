import { Trash2, MapPin, Sun, Moon } from 'lucide-react';
import { Plante } from '../../types';

interface Props {
  plantes: Plante[];
  onDelete: (id: string) => void;
}

export default function ListePlantes({ plantes, onDelete }: Props) {
  const getTypeStyle = (type: Plante['type']) => {
    const styles = {
      legume: 'bg-green-100 text-green-800',
      fruit: 'bg-orange-100 text-orange-800',
      fleur: 'bg-pink-100 text-pink-800',
      aromatique: 'bg-purple-100 text-purple-800',
      autre: 'bg-gray-100 text-gray-800'
    };
    return `${styles[type]} px-2 py-1 rounded-full text-sm font-medium`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {plantes.map((plante) => (
        <div key={plante.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{plante.nom}</h3>
            <button
              onClick={() => onDelete(plante.id)}
              className="text-red-600 hover:text-red-800 p-1"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className={getTypeStyle(plante.type)}>
                {plante.type.charAt(0).toUpperCase() + plante.type.slice(1)}
              </span>
              <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                plante.soleil 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-indigo-100 text-indigo-800'
              }`}>
                {plante.soleil ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {plante.soleil ? 'Ensoleillé' : 'Ombragé'}
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{plante.emplacement}</span>
            </div>
            
            <div className="text-sm text-gray-600">
              Planté le: {new Date(plante.datePlantation).toLocaleDateString()}
            </div>
            
            {plante.notes && (
              <p className="text-sm text-gray-600 mt-2 border-t pt-2">
                {plante.notes}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}