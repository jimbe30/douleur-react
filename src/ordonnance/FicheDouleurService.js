import { connect } from 'react-redux'
import React, { Component, Fragment } from 'react'

import { setPreconisations, setPrescriptionChoisie, dataTypes } from "../redux/OrdonnanceActions";
import FicheDouleurComponent from "./FicheDouleurComponent";
import { goToRoute, routes } from '../config/URLs-conf';


class FicheDouleur extends Component {

    constructor(props) {
        super(props)
        this.clickPrescription.bind(this)
    }    

    componentDidMount() {
        let { idDouleur } = this.getRouteParams()
        setPreconisations(idDouleur)
    }

    getRouteParams() {
        if (this.props.match) {
            return this.props.match.params
        }
        return {}
    }

    clickPrescription = (index) => {
        setPrescriptionChoisie(this.props.prescriptions[index])
        goToRoute(this.props)(routes.FORMULAIRE_ORDONNANCE)
    }

    render() {
        return (
            <Fragment>
                <FicheDouleurComponent clickOrdonnance={this.clickPrescription} prescriptions={this.props.prescriptions} />               
            </Fragment>
        )
    }
}

/**
 * La fonction mapStateToProps renvoie un objet résultant du state. 
 * L'objet renvoyé est passé en props du composant connecté
 */
const mapStateToProps = appState => ({
    prescriptions: appState.ordonnance[dataTypes.PRESCRIPTIONS],
})

/**
 * La méthode connect() relie le store au composant cible.
 * Elle prend en paramètre la fonction "mapStateToProps", laquelle prend elle-même en paramètre le state du store.
 */
export default connect(mapStateToProps)(FicheDouleur)
