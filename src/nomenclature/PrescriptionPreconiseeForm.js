import React from 'react'
import OrdonnancesTypesController from '../ordonnanceType/OrdonnancesTypesController'
import { modesAction } from './services/GestionNomenclatureService'
import MedicamentPrescriptionForm from './MedicamentPrescriptionForm'


function PrescriptionPreconiseeForm(props) {

	let { prescription, ordonnanceType } = { ...props }


	function selectOrdonnanceType(ordonnanceType) {
		prescription = { medicamentsPreconises : ordonnanceType.medicaments}
	}
	
	function majMedicamentPreconise(numMedicament) {		
		return (medicament) => {			
			if (!prescription.medicamentsPreconises) {
				prescription.medicamentsPreconises = [{}]
				numMedicament = 0
			}
			let medicamentPreconise = prescription.medicamentsPreconises[numMedicament]
			medicamentPreconise = { ...medicamentPreconise, ...medicament}
			prescription.medicamentsPreconises[numMedicament] = medicamentPreconise
		}
	}

	const ListeMedicamentsForm = () => {
		let medicamentsPreconises = null
		if (prescription) {
			medicamentsPreconises = prescription.medicamentsPreconises
		}
		if (medicamentsPreconises) {
			return medicamentsPreconises.map(
				(medicament, index) =>
					<MedicamentPrescriptionForm
						key={index}
						medicament={medicament}
						majMedicamentPreconise={majMedicamentPreconise(index)}
					/>
			)
		}
		return null		
	}

	const ChoixOrdonnanceType = () => {
		if (!prescription && !ordonnanceType) {
			return (
				<OrdonnancesTypesController
					mode={modesAction.SELECTION}
					ordonnancesTypes={[uneOrdonnanceType]}
					selectOrdonnanceType={selectOrdonnanceType}
				/>
			)
		}
		if (ordonnanceType) {
			return <>Renseigner la posologie pour l'ordonnance type choisie</>
		}
	}

	return (
		<>
			<ChoixOrdonnanceType />
			<ListeMedicamentsForm />

		</>
	)
}
export default PrescriptionPreconiseeForm



////////////////////////////////////

const uneOrdonnanceType = {
	description: 'Paracétamol 500 ou 1000 mg + Codéine 25 ou 30 mg ; Tramadol 50 mg',
	medicaments: [
		{
			produits: [
				{
					idProduit: 1,
					errors: {},
					uniteDosage: 'mg',
					designation: 'Paracétamol',
					listeDosages: [
						'500',
						'1000'
					],
					focus: null,
					description: 'Paracétamol 500 ou 1000 mg'
				},
				{
					idProduit: 3,
					errors: {},
					uniteDosage: 'mg',
					designation: 'Codéine',
					listeDosages: [
						'25',
						'30'
					],
					focus: null,
					description: 'Codéine 25 ou 30 mg'
				}
			],
			formes: [
				'Comprimé',
				'Gélule'
			],
			errors: {},
			description: 'Paracétamol 500 ou 1000 mg + Codéine 25 ou 30 mg'
		},
		{
			produits: [
				{
					idProduit: 2,
					errors: {},
					uniteDosage: 'mg',
					designation: 'Tramadol',
					listeDosages: [
						'50'
					],
					focus: null,
					description: 'Tramadol 50 mg'
				}
			],
			formes: [
				'Comprimé'
			],
			errors: {},
			description: 'Tramadol 50 mg'
		}
	],
	errors: {},
	isOrdonnanceValide: true
}

const unePrescription = {	
	medicamentsPreconises: [
		{
			id: 14,
			idDouleur: 8,
			description: 'Paracétamol (400 ou 500 mg) + Poudre d’opium 25 mg   ; (1 ou 2) (comprimé(s) ou gélule(s)) ;  matin, midi et soir  ; Pendant (5 à 10) jours  ',
			dureeMax: null,
			dureeMin: null,
			numOrdonnance: 1,
			numMedicament: 1,
			recommandation: null,
			compatibilites: [
				{
					id: 443,
					dosages: null,
					produit: {
						id: 1,
						code: 'PARACTM',
						designation: 'Paracétamol',
						indesirable: '',
						indication: null
					}
				},
				{
					id: 632,
					dosages: null,
					produit: {
						id: 4,
						code: 'OPIUM',
						designation: 'Poudre d\'opium',
						indesirable: null,
						indication: null
					}
				}
			]
		}
	],
}