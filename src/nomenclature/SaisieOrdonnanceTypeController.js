import React, { createContext } from 'react';
import { Form } from 'semantic-ui-react';

import FormHandler from '../globals/hoc/FormHandler';
import { formNames } from '../globals/redux/FormActions'
import OrdonnanceTypeForm from './OrdonnanceTypeForm';


// Config générale pour ! TESTS ! //
const listeProduits = [
	{ id: 1, designation: "Paracétamol" },
	{ id: 2, designation: 'Tramadol' },
	{ id: 3, designation: 'Codéine' },
	{ id: 4, designation: 'Poudre d\'opium' }
]
const listeUnitesDosage = ['g', 'mg', 'mg LI', 'mg LP', 'µg/h']
const formesMedicamenteuses = ['Comprimé', 'Gélule', 'Suppositoire', 'Goutte', 'Flasque']

// Contexte portant la config générale de la fonctionnalité
export const OrdonnanceTypeContext = createContext({ listeProduits, listeUnitesDosage, formesMedicamenteuses })

// Composant chargé du rendu 
export default function SaisieOrdonnanceType(props) {

	const Formulaire = props =>
		<Form size='tiny' style={{ marginBottom: '1rem' }}>
			<OrdonnanceTypeForm {...props} />
		</Form>

	return (
		<FormHandler component={Formulaire}
			formName={formNames.CONFIG_ORDONNANCE_FORM}
			mode='Saisie'
			{...props}
		/>
	)
}


