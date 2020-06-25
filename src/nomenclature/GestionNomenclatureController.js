import React, { createContext } from 'react';
import Arborescence from './ArborescenceComponent';


// Config générale pour ! TESTS ! //
const nomenclatures = [	{ 
		id: 1, 
		libelle: 'douleur post opératoire',
		nomenclaturesEnfants : [	{
				id : 2, 
				libelle : 'cardiovasculaire', 
				infosGenerales : 'Intensité post opératoire de 10 à 30 à la toux' 
			}
		]
	},	{
		id: 3, 
		libelle: 'enfant', 
		nomenclaturesEnfants : [
			{
				id : 4, 
				libelle : 'abdominal'
			}
		]
	},	
]

// Contexte portant la config générale de la fonctionnalité
export const NomenclatureContext = createContext({ nomenclatures })

// Composant chargé du rendu 
export default function GestionNomenclature(props) {

	const actionsBranches = [	{
			libelle : 'ajouter un niveau',
			process: (id) => { console.log("ajout d'un niveau à l'idDouleur " + id) }
		},	{
			libelle : 'ajouter un protocole',
			process: (id) => { console.log("ajout d'un protocole anti douleur à l'idDouleur " + id) },
			primary: true
		},
	]
	
	const actionsDouleurs = [	{
			libelle : 'modifier le protocole',
			process: (id) => { console.log("modification du protocole pour l'idDouleur " + id) }
		}
	]


	props = {...props, nomenclatures, actionsBranches, actionsDouleurs}

	return (
		<Arborescence {...props} />
	)
}


