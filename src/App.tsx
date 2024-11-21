import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TacheJardin, Plante } from './types';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import PlantesPage from './pages/PlantesPage';

const tachesInitiales: TacheJardin[] = [
  {
    id: '1',
    description: 'Tailler les rosiers',
    date: '2024-03-15',
    categorie: 'entretien',
    complete: false
  },
  {
    id: '2',
    description: 'Planter les tomates',
    date: '2024-04-01',
    categorie: 'plantation',
    complete: false
  }
];

const plantesInitiales: Plante[] = [
  {
    id: '1',
    nom: 'Tomate Roma',
    type: 'legume',
    emplacement: 'Potager Sud',
    datePlantation: '2024-03-01',
    soleil: true,
    notes: 'Variété résistante aux maladies'
  },
  {
    id: '2',
    nom: 'Lavande',
    type: 'aromatique',
    emplacement: 'Bordure Est',
    datePlantation: '2023-05-15',
    soleil: true
  }
];

function App() {
  const [taches, setTaches] = useState<TacheJardin[]>(tachesInitiales);
  const [plantes, setPlantes] = useState<Plante[]>(plantesInitiales);

  const ajouterTache = (nouvelleTache: Omit<TacheJardin, 'id' | 'complete'>) => {
    const tache: TacheJardin = {
      ...nouvelleTache,
      id: Date.now().toString(),
      complete: false
    };
    setTaches([...taches, tache]);
  };

  const toggleComplete = (id: string) => {
    setTaches(taches.map(tache =>
      tache.id === id ? { ...tache, complete: !tache.complete } : tache
    ));
  };

  const supprimerTache = (id: string) => {
    setTaches(taches.filter(tache => tache.id !== id));
  };

  const ajouterPlante = (nouvellePlante: Omit<Plante, 'id'>) => {
    const plante: Plante = {
      ...nouvellePlante,
      id: Date.now().toString()
    };
    setPlantes([...plantes, plante]);
  };

  const supprimerPlante = (id: string) => {
    setPlantes(plantes.filter(plante => plante.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Navigation />
          
          <Routes>
            <Route path="/" element={
              <HomePage
                taches={taches}
                plantes={plantes}
                onAjoutTache={ajouterTache}
                onToggleComplete={toggleComplete}
                onDeleteTache={supprimerTache}
              />
            } />
            <Route path="/plantes" element={
              <PlantesPage
                plantes={plantes}
                onAjoutPlante={ajouterPlante}
                onDeletePlante={supprimerPlante}
              />
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;