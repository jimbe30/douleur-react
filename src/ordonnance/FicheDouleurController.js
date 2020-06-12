import { connect } from 'react-redux'
import React, { Component } from 'react'

import { setPreconisations, setPrescriptionChoisie, dataTypes } from "./services/OrdonnanceActions";
import FicheDouleurComponent from "./FicheDouleurComponent";
import { goToRoute, routes } from '../globals/services/routeService';
import ComponentLoader from '../globals/util-components/ComponentLoader';

const mapStateToProps = appState => ({
    prescriptions: appState.ordonnance[dataTypes.PRESCRIPTIONS],
})

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
        goToRoute(this.props)(routes.FORMULAIRE_PRESCRIPTION)
    }

    render() {
        return (
            <ComponentLoader loadedObject={this.props.prescriptions}>
                <FicheDouleurComponent clickOrdonnance={this.clickPrescription} prescriptions={this.props.prescriptions} />               
            </ComponentLoader>
        )
    }
}
/**
 * La méthode connect() relie le store au composant cible.
 * Elle prend en paramètre la fonction "mapStateToProps", laquelle prend elle-même en paramètre le state du store.
 */
export default connect(mapStateToProps)(FicheDouleur)
