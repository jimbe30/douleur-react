import React, { Component, Fragment } from 'react'
import { connect } from "react-redux"
import { reduxForm } from "redux-form";
import { Message, Divider, Header, Label } from 'semantic-ui-react'

import { dataTypes, setOrdonnanceEmise } from '../redux/OrdonnanceActions'
import { recapitulerPrescription } from './PrescriptionService'
import OrdonnanceForm from './OrdonnanceForm';

const mapStateToProps = state => ({
    prescriptionSaisie: state.ordonnance[dataTypes.PRESCRIPTION_SAISIE],
    infosPatient: state.form.infosPatient ? state.form.infosPatient.values : null,
    libelleDouleur: state.ordonnance[dataTypes.PRESCRIPTION_CHOISIE] ? 
        state.ordonnance[dataTypes.PRESCRIPTION_CHOISIE].nomenclatureDouleur.libelle : ''
})

class OrdonnanceService extends Component {

    constructor(props) {
        super(props)
        this.submitOrdonnance.bind(this)
    }

    submitOrdonnance = infosPatient => {
        let ordonnance = {
            infosPatient,
            prescription : this.props.prescriptionSaisie
        }
        setOrdonnanceEmise(ordonnance)
        console.log(JSON.stringify(ordonnance))
    }

    render() {
        const prescription = this.props.prescriptionSaisie
        return (
            prescription ?
                <Fragment>
                    <h3>{this.props.libelleDouleur}</h3>
                    <OrdonnanceForm onSubmit={() => this.submitOrdonnance(this.props.infosPatient)} {...this.props} />
                    <p></p>

                    <Message>

                        <Divider horizontal fitted><Header as='h5'>Votre ordonnance</Header></Divider>
                        
                        {this.props.infosPatient && (
                            <Fragment>
                                <Label>Patient</Label>
                                <div style={{ margin: '20px 10px' }}>
                                    {recapitulerInfosPatient(this.props.infosPatient)}
                                </div>
                            </Fragment>
                        )}

                        <Label>Prescription</Label>
                        <div style={{ margin: '20px 10px' }}>
                            {recapitulerPrescription(prescription)}
                            {
                                prescription.recommandations &&
                                <p> <b> Recommandations </b>
                                    <div className='infosBase'>{prescription.recommandations}</div>
                                </p>
                            }
                        </div>

                    </Message>
                </Fragment>
                :
                <Message error> Erreur : Aucune prescription saisie !!! </Message>
        )
    }
}

export const recapitulerInfosPatient = (infosPatient) => {
    if (infosPatient) {
        return (
            <div> {
                Object.keys(infosPatient).map(
                    key => {
                        switch (key) {
                            case 'nomPatient': return infosPatient[key]
                            case 'dateNaissance': return ' - né(e) le ' + infosPatient[key]
                            case 'insee': return <p>n° immatriculation {infosPatient[key]}</p>
                            case 'sexe': return ''
                            default: return ' - ' + infosPatient[key]
                        }
                    }
                )
            } </div>
        )

    }
    return null
}

OrdonnanceService = reduxForm({
    form: "infosPatient",
})(OrdonnanceService);

export default connect(mapStateToProps)(OrdonnanceService)
