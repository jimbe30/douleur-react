import React, { Component, Fragment } from 'react'
import { connect } from "react-redux"
import { Message, Divider, Header, Label } from 'semantic-ui-react'

import { dataTypes, setOrdonnanceEmise } from './OrdonnanceActions'
import { recapitulerPrescription } from './PrescriptionService'
import OrdonnanceForm from './OrdonnanceForm';
import handleForm from '../HOC/formHandler';
import { formNames } from '../redux/FormActions'

const FORM_NAME = formNames.INFOS_PATIENT_FORM

const mapStateToProps = state => {
    const prescriptionSaisie = state.ordonnance[dataTypes.PRESCRIPTION_SAISIE]
    const libelleDouleur = state.ordonnance[dataTypes.PRESCRIPTION_CHOISIE] ?    
        state.ordonnance[dataTypes.PRESCRIPTION_CHOISIE].nomenclatureDouleur.libelle : ''
    return {
        prescriptionSaisie, libelleDouleur
    }
}

class OrdonnanceService extends Component {

    constructor(props) {
        super(props)
        this.submitOrdonnance.bind(this)
    }

    submitOrdonnance = (infosPatient, event) => {
        let ordonnance = {
            infosPatient,
            prescription: this.props.prescriptionSaisie
        }
        setOrdonnanceEmise(ordonnance, this.props.history)
        event.preventDefault()
    }

    render() {
        const prescription = this.props.prescriptionSaisie
        const infosPatient = this.props[FORM_NAME]
        return (
            prescription ?
                <Fragment>
                    <h3>{this.props.libelleDouleur}</h3>
                    <OrdonnanceForm onSubmit={(event) => this.submitOrdonnance(infosPatient, event)} {...this.props} />
                    <p></p>

                    <Message>

                        <Divider horizontal fitted><Header as='h5'>Votre ordonnance</Header></Divider>

                        {infosPatient && (
                            <Fragment>
                                <Label>Patient</Label>
                                <div style={{ margin: '20px 10px' }}>
                                    {recapitulerInfosPatient(infosPatient)}
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

OrdonnanceService = handleForm(OrdonnanceService, FORM_NAME)

export default connect(mapStateToProps)(OrdonnanceService)
