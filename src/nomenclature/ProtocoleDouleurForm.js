import React, { useState } from 'react'
import OrdonnancesTypesController from '../ordonnanceType/OrdonnancesTypesController'
import { modesAction } from './services/GestionNomenclatureActions'
import {  FormInput, Table, TableRow, TableCell, TableBody, FormGroup, Form, Icon } from 'semantic-ui-react'
import Helper from '../globals/util-components/Helper'


function ProtocoleDouleurForm(props) {

	let { protocoleDouleur } = { ...props }

	if (!protocoleDouleur) {
		protocoleDouleur = {}
	}

	let infosGenerales = protocoleDouleur.infosGenerales
	let libelle = protocoleDouleur.libelle
	let recommandations = protocoleDouleur.recommandations
	let prescriptions = protocoleDouleur.prescriptions

	const [ordonnanceType, setOrdonnanceType] = useState()
	const [protocole, setProtocole] = useState(protocoleDouleur)

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
		if (protocole && Array.isArray(protocole.prescriptions)) {
			const size = protocole.prescriptions.length
			if (size > 0) {
				medicamentsPreconises = protocole.prescriptions[size-1].medicamentsPreconises
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

	/**
	 * Formulaire de saisie de la posologie recommandée pour un médicament
	 * @param {Object} medicament
	 */
	const MedicamentPrescriptionForm = ({ medicament, majMedicamentPreconise }) => {

		const inputStyle = { style: { width: '50px' } }
		const formGroupStyle = { style: { margin: 0 } }
		const arrowIconStyle = { style: { marginLeft: '.5rem' } }
		const tableStyle = { style: { marginTop: '1rem' } }

		function handleChangeData(input) {
			if (majMedicamentPreconise) {
				const { attribut, value } = { attribut: input.name, value: input.value }
				majMedicamentPreconise({ ...medicament, [attribut]: value })
			}
		}

		if (medicament) {
			return (
				<Form size='tiny'>
					<Table {...tableStyle}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell colSpan={2}>
									{medicament.description}
								</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<TableBody>
							<TableRow>
								<TableCell verticalAlign='middle'>
									<Helper text='Durée' helpText=
										'Renseigner les durées minimum et maximum du traitement en nombre de jours'
									/>
								</TableCell>
								<TableCell verticalAlign='middle'>
									<FormGroup inline {...formGroupStyle}>
										<FormInput
											required
											placeholder='min'
											onChange={e => handleChangeData(e.target)}
											name={'dureeMin'}
											value={medicament.dureeMin}
											{...inputStyle}
										/> à
										<FormInput
											placeholder='max'
											onChange={e => handleChangeData(e.target)}
											name={'dureeMax'}
											value={medicament.dureeMax}
											{...inputStyle}
										/> jours
									</FormGroup>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell verticalAlign='middle'>
									<Helper text='Fréquence' helpText={
										'Renseigner les fréquences minimum et maximum en nombre de prises par jour ' +
										'+ précisions éventuelles (ex: matin, midi, soir)'}
									/>
								</TableCell>
								<TableCell verticalAlign='middle'>
									<FormGroup inline {...formGroupStyle}>
										<FormInput
											required
											placeholder='min'
											onChange={e => handleChangeData(e.target)}
											name={'frequenceMin'}
											value={medicament.frequenceMin}
											{...inputStyle}
										/> à
										<FormInput
											placeholder='max'
											onChange={e => handleChangeData(e.target)}
											name={'frequenceMax'}
											value={medicament.frequenceMax}
											{...inputStyle}
										/> fois / jour
										<Icon size='tiny' name='angle right' color='grey' {...arrowIconStyle} />
										<FormInput
											placeholder='précision'
											onChange={e => handleChangeData(e.target)}
											name={'frequencePrecision'}
											value={medicament.frequencePrecision}
										/>
									</FormGroup>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell verticalAlign='middle'>
									<Helper text='Quantité' helpText={
										'Renseigner les quantités minimum et maximum de médicaments par prise'}
									/>
								</TableCell>
								<TableCell verticalAlign='middle'>
									<FormGroup inline {...formGroupStyle}>
										<FormInput
											required
											placeholder='min'
											onChange={e => handleChangeData(e.target)}
											name={'quantiteMin'}
											value={medicament.quantiteMin}
											{...inputStyle}
										/> à
										<FormInput
											placeholder='max'
											onChange={e => handleChangeData(e.target)}
											name={'quantiteMax'}
											value={medicament.quantiteMax}
											{...inputStyle}
										/> médicaments par prise
									</FormGroup>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Form>

			)
		}
		return null
	}


	return (
		<>
			<ChoixOrdonnanceType />
			<ListeMedicamentsForm />

		</>
	)
}
export default ProtocoleDouleurForm


//////////////////////////////////


function buildProtocole() {

}

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

const unProtocole = {
	PRESCRIPTIONS: [
		{
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
			nomenclatureDouleur: {
				id: 8,
				infosGenerales: 'Intensité de la douleur postopératoire\u202f:\r\n- EVA au repos  = 10 à 30 mm \r\n- EVA à la toux, kinésithérapie et mobilisation = 40 à 60 mm \r\nIntensité maximale entre J2-J3 postopératoire \r\nDouleurs chroniques scapulaires rapportées jusqu\'à 28 mois chez 39% des patients \r\nDouleurs pariétale antérieures souvent bilatérales et prolongées dues à un prélèvement et donc à la dissection d’une ou des deux artères mammaires internes. \r\nDe plus, le site de prélèvement d’une veine saphène pour greffon au niveau de la jambe ou de la cuisse occasionne des douleurs parfois plus intenses que l’incision sternale\u202f; \r\nMême remarque pour la dissection d’une artère radiale. \r\nDouleur beaucoup plus intense après dissection de l’artère gastroépiploïque requérant une laparotomie sus-ombilicale. \r\nOutre l’abord cardiaque par sternotomie, il est proposé actuellement une thoracotomie antérieure gauche avec vidéoassistance et monopontage coronaire avec ou sans CEC**\u202f: dans ce cas, l’intensité de la douleur est plus élevée que par sternotomie plus spécialement à la mobilisation.\r\nBénéfice clinique d’une kinésithérapie respiratoire et de mobilisation précoce, régulière et prolongée, en particulier sur les douleurs résiduelles ou chroniques\r\n',
				libelle: 'Chirurgie coronaire',
				recommandations: null,
				nomenclaturesEnfants: []
			}
		},
		{
			medicamentsPreconises: [
				{
					id: 15,
					idDouleur: 8,
					description: 'Paracétamol (400 ou 500 mg) + Codéine (20 ou 30 mg)   ; (1 à 2) (comprimé(s) ou gélule(s); matin, midi et soir  ; Pendant (5 à 10) jours ',
					dureeMax: null,
					dureeMin: null,
					numOrdonnance: 2,
					numMedicament: 1,
					recommandation: null,
					compatibilites: [
						{
							id: 444,
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
							id: 601,
							dosages: null,
							produit: {
								id: 3,
								code: 'CODEINE',
								designation: 'Codéine',
								indesirable: null,
								indication: null
							}
						}
					]
				}
			],
			nomenclatureDouleur: {
				id: 8,
				infosGenerales: 'Intensité de la douleur postopératoire\u202f:\r\n- EVA au repos  = 10 à 30 mm \r\n- EVA à la toux, kinésithérapie et mobilisation = 40 à 60 mm \r\nIntensité maximale entre J2-J3 postopératoire \r\nDouleurs chroniques scapulaires rapportées jusqu\'à 28 mois chez 39% des patients \r\nDouleurs pariétale antérieures souvent bilatérales et prolongées dues à un prélèvement et donc à la dissection d’une ou des deux artères mammaires internes. \r\nDe plus, le site de prélèvement d’une veine saphène pour greffon au niveau de la jambe ou de la cuisse occasionne des douleurs parfois plus intenses que l’incision sternale\u202f; \r\nMême remarque pour la dissection d’une artère radiale. \r\nDouleur beaucoup plus intense après dissection de l’artère gastroépiploïque requérant une laparotomie sus-ombilicale. \r\nOutre l’abord cardiaque par sternotomie, il est proposé actuellement une thoracotomie antérieure gauche avec vidéoassistance et monopontage coronaire avec ou sans CEC**\u202f: dans ce cas, l’intensité de la douleur est plus élevée que par sternotomie plus spécialement à la mobilisation.\r\nBénéfice clinique d’une kinésithérapie respiratoire et de mobilisation précoce, régulière et prolongée, en particulier sur les douleurs résiduelles ou chroniques\r\n',
				libelle: 'Chirurgie coronaire',
				recommandations: null,
				nomenclaturesEnfants: []
			}
		},
		{
			medicamentsPreconises: [
				{
					id: 16,
					idDouleur: 8,
					description: 'Tramadol 50 mg  ; (1 à 2) (comprimé(s) ou gélule(s)) ; matin, midi et soir  ; Pendant (5 à 10) jours ',
					dureeMax: null,
					dureeMin: null,
					numOrdonnance: 3,
					numMedicament: 1,
					recommandation: null,
					compatibilites: [
						{
							id: 570,
							dosages: null,
							produit: {
								id: 2,
								code: 'TRAMADOL',
								designation: 'Tramadol',
								indesirable: null,
								indication: null
							}
						}
					]
				}
			],
			nomenclatureDouleur: {
				id: 8,
				infosGenerales: 'Intensité de la douleur postopératoire\u202f:\r\n- EVA au repos  = 10 à 30 mm \r\n- EVA à la toux, kinésithérapie et mobilisation = 40 à 60 mm \r\nIntensité maximale entre J2-J3 postopératoire \r\nDouleurs chroniques scapulaires rapportées jusqu\'à 28 mois chez 39% des patients \r\nDouleurs pariétale antérieures souvent bilatérales et prolongées dues à un prélèvement et donc à la dissection d’une ou des deux artères mammaires internes. \r\nDe plus, le site de prélèvement d’une veine saphène pour greffon au niveau de la jambe ou de la cuisse occasionne des douleurs parfois plus intenses que l’incision sternale\u202f; \r\nMême remarque pour la dissection d’une artère radiale. \r\nDouleur beaucoup plus intense après dissection de l’artère gastroépiploïque requérant une laparotomie sus-ombilicale. \r\nOutre l’abord cardiaque par sternotomie, il est proposé actuellement une thoracotomie antérieure gauche avec vidéoassistance et monopontage coronaire avec ou sans CEC**\u202f: dans ce cas, l’intensité de la douleur est plus élevée que par sternotomie plus spécialement à la mobilisation.\r\nBénéfice clinique d’une kinésithérapie respiratoire et de mobilisation précoce, régulière et prolongée, en particulier sur les douleurs résiduelles ou chroniques\r\n',
				libelle: 'Chirurgie coronaire',
				recommandations: null,
				nomenclaturesEnfants: []
			}
		}
	]
}