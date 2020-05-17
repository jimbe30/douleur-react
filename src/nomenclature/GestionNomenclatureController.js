import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';

import ProduitForm from './ProduitForm';
import FormHandler from '../globals/hoc/FormHandler';
import { formNames } from '../globals/redux/FormActions'

export default function GestionNomenclature(props) {


	const listeProduits = [
		{ id: 1, designation: "Paracétamol" },
		{ id: 2, designation: 'Tramadol' },
		{ id: 3, designation: 'Codéine' },
		{ id: 4, designation: 'Poudre d\'opium' }
	]

	const listeUnitesDosage = ['g', 'mg', 'mg LI', 'mg LP', 'µg/h']

	const initProduit = {
		idProduit: 2,
		designation: 'Tramadol',
		uniteDosage: 'mg LI',
		listeDosages: [
			400, 500, 1000,
		]
	}

	//////////////////////////////////

	const [produit, setProduit] = useState(initProduit ? initProduit : {})

	function changeDosage(dosage, index) {
		setProduit(
			// provoque un nouveau rendu du composant car setProduit provient de useState()
			produit => {
				let nouvelleListe =  Array.isArray(produit.listeDosages) ? produit.listeDosages.slice() : []
				if (!dosage) {
					nouvelleListe.splice(index, 1)
				} else {
					nouvelleListe[index] = dosage
				}
				produit.listeDosages = nouvelleListe
				return produit
			}
		)
	}

	props = {
		...props,
		numMedicament: 0,
		listeProduits,
		listeUnitesDosage,
		produit,
		changeDosage
	}

	function Formulaire(props) {
		return (
			<Form size='tiny'>
				<ProduitForm {...props} />
			</Form>
		)
	}

	return (
		<FormHandler component={Formulaire}
			formName={formNames.CONFIG_ORDONNANCE_FORM}
			{...props}
		/>
	)
}


