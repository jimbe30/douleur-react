import { connect } from 'react-redux'
import React, { Component, Fragment } from 'react'

import { formNames } from '../_redux/forms/formActions';
import { ordonnanceNs, ordonnanceData } from "../_redux/conf";

import PrescriptionForm from "./PrescriptionForm";
import FicheDouleurComponent from './FicheDouleurComponent';
import { setPrescriptionSaisie } from './services/OrdonnanceActions';
import { goToRoute, routesConfig } from '../globals/services/routeService';

import FormHandler from '../globals/hoc/FormHandler';


const FORM_NAME = formNames.PRESCRIPTION_FORM

const mapStateToProps = state => ({
	prescriptionChoisie: state[ordonnanceNs][ordonnanceData.PRESCRIPTION_CHOISIE],
})

function PrescriptionController(props) {
	const { prescriptionChoisie, ...rest } = { ...props }
	const submitPrescription = prescriptionSaisie => {
		// sauvegarde les valeurs saisies pour les réinjecter en initialValues
		// lorsqu'on revient sur le formulaire
		setPrescriptionSaisie(prescriptionSaisie)
		goToRoute(props)(routesConfig.FORMULAIRE_ORDONNANCE)
	}
	return <>
		<FicheDouleurComponent {...props} /> {
			prescriptionChoisie &&
			<FormHandler formName={FORM_NAME}>
				<PrescriptionForm onSubmit={submitPrescription}
					prescription={prescriptionChoisie}
					recapPrescription={recapitulerPrescription} />
			</FormHandler>
		}
	</>
}

export const recapitulerPrescription = (prescription) => {
	const recapDosage = medicament => (
		Array.isArray(medicament.produits) ? (
			medicament.produits
				.filter(produit => produit.dosage)
				.map(produit => produit.designation + ' ' + produit.dosage)
				.join(' + ')
		) : null
	)
	if (prescription && Array.isArray(prescription.medicaments)) {
		return (
			prescription.medicaments.map(
				(medicament, numMedicament) => (
					<div key={numMedicament}> {
						recapDosage(medicament)
						+ (medicament.quantite && medicament.forme ? ', ' + medicament.quantite + ' ' + medicament.forme : '')
						+ (medicament.frequence ? ', ' + medicament.frequence + ' fois par jour' : '')
						+ (medicament.duree ? ' pendant ' + medicament.duree + ' jours' : '')
					} </div>
				)
			)
		)
	}
	return null
}

export default connect(mapStateToProps)(PrescriptionController)
