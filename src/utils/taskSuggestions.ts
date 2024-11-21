import { Plante, TacheJardin } from '../types';

interface SuggestionTache {
  description: string;
  categorie: TacheJardin['categorie'];
  delaiJours: number;
}

const suggestionsPrintemps: Record<Plante['type'], SuggestionTache[]> = {
  legume: [
    { description: 'Semer les tomates en intérieur', categorie: 'plantation', delaiJours: 0 },
    { description: 'Préparer les tuteurs pour les plantes grimpantes', categorie: 'entretien', delaiJours: 7 }
  ],
  fruit: [
    { description: 'Tailler les arbres fruitiers', categorie: 'entretien', delaiJours: 0 },
    { description: 'Traitement préventif des arbres fruitiers', categorie: 'entretien', delaiJours: 14 }
  ],
  fleur: [
    { description: 'Diviser les vivaces', categorie: 'plantation', delaiJours: 0 },
    { description: 'Planter les bulbes d\'été', categorie: 'plantation', delaiJours: 7 }
  ],
  aromatique: [
    { description: 'Tailler les herbes aromatiques', categorie: 'entretien', delaiJours: 0 },
    { description: 'Diviser les plants de menthe', categorie: 'plantation', delaiJours: 7 }
  ],
  autre: [
    { description: 'Vérifier l\'état général des plantes', categorie: 'entretien', delaiJours: 7 }
  ]
};

const suggestionsEte: Record<Plante['type'], SuggestionTache[]> = {
  legume: [
    { description: 'Tuteurer les plants de tomates', categorie: 'entretien', delaiJours: 0 },
    { description: 'Récolter les légumes d\'été', categorie: 'recolte', delaiJours: 3 }
  ],
  fruit: [
    { description: 'Éclaircir les fruits', categorie: 'entretien', delaiJours: 0 },
    { description: 'Récolter les fruits mûrs', categorie: 'recolte', delaiJours: 3 }
  ],
  fleur: [
    { description: 'Retirer les fleurs fanées', categorie: 'entretien', delaiJours: 3 },
    { description: 'Arroser tôt le matin', categorie: 'entretien', delaiJours: 1 }
  ],
  aromatique: [
    { description: 'Récolter les herbes avant floraison', categorie: 'recolte', delaiJours: 0 },
    { description: 'Sécher les herbes aromatiques', categorie: 'autre', delaiJours: 1 }
  ],
  autre: [
    { description: 'Vérifier les besoins en eau', categorie: 'entretien', delaiJours: 1 }
  ]
};

const suggestionsAutomne: Record<Plante['type'], SuggestionTache[]> = {
  legume: [
    { description: 'Récolter les derniers légumes', categorie: 'recolte', delaiJours: 0 },
    { description: 'Préparer le sol pour l\'hiver', categorie: 'entretien', delaiJours: 7 }
  ],
  fruit: [
    { description: 'Ramasser les fruits tombés', categorie: 'entretien', delaiJours: 3 },
    { description: 'Protéger les arbres fruitiers', categorie: 'entretien', delaiJours: 14 }
  ],
  fleur: [
    { description: 'Planter les bulbes de printemps', categorie: 'plantation', delaiJours: 0 },
    { description: 'Protéger les plantes sensibles', categorie: 'entretien', delaiJours: 7 }
  ],
  aromatique: [
    { description: 'Dernière récolte d\'herbes', categorie: 'recolte', delaiJours: 0 },
    { description: 'Rentrer les plantes fragiles', categorie: 'entretien', delaiJours: 7 }
  ],
  autre: [
    { description: 'Nettoyer le jardin', categorie: 'entretien', delaiJours: 7 }
  ]
};

const suggestionsHiver: Record<Plante['type'], SuggestionTache[]> = {
  legume: [
    { description: 'Planifier le potager', categorie: 'autre', delaiJours: 0 },
    { description: 'Vérifier les légumes stockés', categorie: 'entretien', delaiJours: 14 }
  ],
  fruit: [
    { description: 'Tailler les arbres fruitiers', categorie: 'entretien', delaiJours: 0 },
    { description: 'Protéger du gel', categorie: 'entretien', delaiJours: 7 }
  ],
  fleur: [
    { description: 'Protéger les plantes sensibles', categorie: 'entretien', delaiJours: 0 },
    { description: 'Forcer les bulbes d\'intérieur', categorie: 'plantation', delaiJours: 7 }
  ],
  aromatique: [
    { description: 'Entretenir les aromatiques d\'intérieur', categorie: 'entretien', delaiJours: 7 },
    { description: 'Vérifier l\'état des plants', categorie: 'entretien', delaiJours: 14 }
  ],
  autre: [
    { description: 'Vérifier les protections hivernales', categorie: 'entretien', delaiJours: 7 }
  ]
};

export function getSuggestionsSaison(plantes: Plante[]): SuggestionTache[] {
  const date = new Date();
  const mois = date.getMonth();
  
  // Sélectionner les suggestions de saison
  let suggestionsSaison: Record<Plante['type'], SuggestionTache[]>;
  if (mois >= 2 && mois <= 4) {
    suggestionsSaison = suggestionsPrintemps;
  } else if (mois >= 5 && mois <= 7) {
    suggestionsSaison = suggestionsEte;
  } else if (mois >= 8 && mois <= 10) {
    suggestionsSaison = suggestionsAutomne;
  } else {
    suggestionsSaison = suggestionsHiver;
  }

  // Récupérer les suggestions pour chaque type de plante présent dans le jardin
  const suggestions = plantes.flatMap(plante => {
    const suggestionsPourType = suggestionsSaison[plante.type];
    // Ajouter des suggestions spécifiques pour les plantes au soleil/ombre
    if (plante.soleil) {
      return [...suggestionsPourType, { 
        description: `Vérifier l'arrosage de ${plante.nom} (exposition ensoleillée)`,
        categorie: 'entretien',
        delaiJours: 1
      }];
    }
    return suggestionsPourType;
  });

  // Éliminer les doublons et trier par délai
  return Array.from(new Set(suggestions))
    .sort((a, b) => a.delaiJours - b.delaiJours);
}