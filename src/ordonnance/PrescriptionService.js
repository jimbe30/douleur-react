import { connect } from 'react-redux'
import { reduxForm } from "redux-form";
import React, { Component, Fragment } from 'react'

import PrescriptionForm from "./PrescriptionForm";
import FicheDouleurComponent from './FicheDouleurComponent';
import { dataTypes } from '../redux/OrdonnanceActions';

class PrescriptionService extends Component {

    constructor(props) {
        super(props)
        this.submitPrescription.bind(this)
    }

    submitPrescription = form => {
        const body = JSON.stringify(form)
        console.log(body)
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
                    />
                }
            </Fragment>
        )
    }
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
