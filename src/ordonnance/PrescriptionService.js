import { connect } from 'react-redux'
import { reduxForm } from "redux-form";
import React, { Component, Fragment } from 'react'

import PrescriptionForm from "./PrescriptionForm";
import FicheDouleurComponent from './FicheDouleurComponent';
import { dataTypes, setPrescriptionSaisie } from '../redux/OrdonnanceActions';
import { goToRoute, routes } from '../config/URLs-conf';

class PrescriptionService extends Component {

    constructor(props) {
        super(props)
        this.submitPrescription.bind(this)
    }

    submitPrescription = prescriptionSaisie => {
        setPrescriptionSaisie(prescriptionSaisie)
        const body = JSON.stringify(prescriptionSaisie)
        console.log(body)
        goToRoute(this.props)(routes.FORMULAIRE_ORDONNANCE)
    }

    render() {
        return (
            <Fragment>
                <FicheDouleurComponent prescriptionChoisie={this.props.prescriptionChoisie} />
                {
                    this.props.prescriptionChoisie &&
                    <PrescriptionForm
                        onSubmit={this.submitPrescription}
                        prescription={this.props.prescriptionChoisie}
                        {...this.props.formValues}
                        recapPrescription={recapitulerPrescription}
                    />
                }

            </Fragment>
        )
    }

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
                    <div> {
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

PrescriptionService = reduxForm({
    form: "prescription",
})(PrescriptionService);


/**
 * La fonction mapStateToProps renvoie un objet résultant du state. 
 * L'objet renvoyé est passé en props du composant connecté
 */
const mapStateToProps = state => ({
    prescriptionChoisie: state.ordonnance[dataTypes.PRESCRIPTION_CHOISIE],
    formValues: state.form.prescription ? state.form.prescription.values : {},
})

/**
 * La méthode connect() relie le store au composant cible.
 * Elle prend en paramètre la fonction "mapStateToProps", laquelle prend elle-même en paramètre le state du store.
 */
export default connect(mapStateToProps)(PrescriptionService)
