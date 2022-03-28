import { connect } from 'react-redux'
import React, { Component } from 'react'
import { ordonnanceNs, ordonnanceData } from "../_redux/conf";

import { setPreconisations, setPrescriptionChoisie } from "./services/OrdonnanceActions";
import FicheDouleurComponent from "./FicheDouleurComponent";
import { goToRoute, routesConfig, getRouteParams } from '../globals/services/routeService';
import ComponentLoader from '../globals/util-components/ComponentLoader';

const mapStateToProps = appState => ({
    prescriptions: appState[ordonnanceNs][ordonnanceData.PRESCRIPTIONS],
})

class FicheDouleur extends Component {

    constructor(props) {
        super(props)
        this.clickPrescription.bind(this)
    }    

    componentDidMount() {
        let { idDouleur } = getRouteParams(this.props)
        setPreconisations(idDouleur)
    }

    clickPrescription = (index) => {
        setPrescriptionChoisie(this.props.prescriptions[index])
        goToRoute(this.props)(routesConfig.FORMULAIRE_PRESCRIPTION)
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
