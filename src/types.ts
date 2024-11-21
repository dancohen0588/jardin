export interface TacheJardin {
  id: string;
  description: string;
  date: string;
  categorie: 'entretien' | 'plantation' | 'recolte' | 'autre';
  complete: boolean;
}

export interface Plante {
  id: string;
  nom: string;
  type: 'legume' | 'fruit' | 'fleur' | 'aromatique' | 'autre';
  emplacement: string;
  datePlantation: string;
  soleil: boolean;
  notes?: string;
}