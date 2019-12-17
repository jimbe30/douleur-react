import { connect } from 'react-redux'
import React, { Component, Fragment } from 'react'

import PrescriptionForm from "./PrescriptionForm";
import FicheDouleurComponent from './FicheDouleurComponent';
import { dataTypes, setPrescriptionSaisie } from './OrdonnanceActions';
import { goToRoute, routes } from '../services/routeService';
import handleForm from '../HOC/formHandler';
import { formNames } from '../redux/FormActions';


const FORM_NAME = formNames.PRESCRIPTION_FORM

const mapStateToProps = state => ({
    prescriptionChoisie: state.ordonnance[dataTypes.PRESCRIPTION_CHOISIE],
})

class PrescriptionService extends Component {

    constructor(props) {
        super(props)
        this.submitPrescription.bind(this)
    }

    submitPrescription = prescriptionSaisie => {  
        // sauvegarde les valeurs saisies pour les réinjecter en initialValues
        // lorsqu'on revient sur le formulaire
        setPrescriptionSaisie(prescriptionSaisie)
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
                        {...this.props[FORM_NAME]}
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

/**
 * La fonction handleForm() est un HOC qui passe au composant la prop de nom FORM_NAME, 
 * elle-même contient les valeurs des champs du formulaire (via les HOC connect() et reduxForm()).
 * Un état du même nom (préfixé par le domaine appForms) est alimenté dans le store redux
 */
PrescriptionService = handleForm(PrescriptionService, FORM_NAME)

export default connect(mapStateToProps)(PrescriptionService)
