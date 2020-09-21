import React, { useState } from 'react'
import OrdonnancesTypesController from '../ordonnanceType/OrdonnancesTypesController'
import { modesAction } from './services/GestionNomenclatureActions'
import MedicamentPrescriptionForm from './MedicamentPrescriptionForm'


function ProtocoleDouleurForm(props) {

	let { protocoleDouleur } = { ...props }

	let infosGenerales = protocoleDouleur.infosGenerales
	let libelle = protocoleDouleur.libelle
	let recommandations = protocoleDouleur.recommandations
	let prescriptions = protocoleDouleur.prescriptions

	const [ordonnanceType, setOrdonnanceType] = useState()

	function selectOrdonnanceType(ordonnanceType) {
		const prescription = { medicamentsPreconises : ordonnanceType.medicaments}
		if (!protocoleDouleur.prescriptions) {
			protocoleDouleur.prescriptions = []
		}
		protocoleDouleur.prescriptions = [...protocoleDouleur.prescriptions, prescription]				
		
		setOrdonnanceType(ordonnanceType)
	}
	
	function majMedicamentPreconise(numPrescription, numMedicament) {		
		return (medicament) => {
			if (!protocoleDouleur.prescriptions) {
				protocoleDouleur.prescriptions = [{}]
				numPrescription = 0
			}
			const prescription = protocoleDouleur.prescriptions[numPrescription]
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
		if (protocoleDouleur && Array.isArray(protocoleDouleur.prescriptions)) {
			const size = protocoleDouleur.prescriptions.length
			if (size > 0) {
				medicamentsPreconises = protocoleDouleur.prescriptions[size-1].medicamentsPreconises
			} 
		}
		if (medicamentsPreconises) {
			return medicamentsPreconises.map(
				(medicament, index) =>
					<MedicamentPrescriptionForm
						key={index}
						medicament={medicament}
						majMedicamentPreconise={majMedicamentPreconise(0, index)}
					/>
			)
		}
		return null		
	}

	const ChoixOrdonnanceType = () => {
		if (!prescriptions && !ordonnanceType) {
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
		return null
	}


	/**
		Posologie
			pour chaque ordonnance type 
				pour chaque médicament
					renseigner la durée min-max (nb jours)
					renseigner la fréquence min-max (nb fois par jour) et/ou autre (matin, midi, soir)
					renseigner la quantité min-max par prise		 
				=> construire une prescription combinant les médicaments de l'ordonnance type et la posologie de chacun 
			=> construire le protocole regroupant l'ensemble des prescriptions
	 */



	return (
		<>
			<ChoixOrdonnanceType />
			<ListeMedicamentsForm />

		</>
	)
}
export default ProtocoleDouleurForm



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

const protocoleDouleur = {
	idDouleur: 55,
	infosGenerales: 'TEST',
	libelle: 'Test protocole douleur',
	recommandations: null,
	nomenclaturesEnfants: [],
	type: 'protocole',
	idParent: 54,
	prescriptions: [
	  {
		 medicamentsPreconises: [
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
			  description: 'Paracétamol 500 ou 1000 mg + Codéine 25 ou 30 mg',
			  dureeMin: '10',
			  dureeMax: '15',
			  frequenceMin: '2',
			  frequenceMax: '3',
			  frequencePrecision: 'pendant les repas',
			  quantiteMin: '1',
			  quantiteMax: '2'
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
			  description: 'Tramadol 50 mg',
			  dureeMin: '10',
			  frequenceMin: '3',
			  frequencePrecision: 'matin, midi et soir',
			  quantiteMin: '1'
			}
		 ]
	  }
	]
 }
