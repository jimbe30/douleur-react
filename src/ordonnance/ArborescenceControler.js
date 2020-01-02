/**
 * Ici on prends en compte l'état applicatif.
 * La méthode connect() relie le store au composant cible 
 */
import { connect } from 'react-redux'
import { setArborescence, dataTypes } from "./OrdonnanceServices";
import ArborescenceComponent from "./ArborescenceComponent";
import React, { Component } from 'react'
import { Message } from 'semantic-ui-react';
import { routes, goToRoute } from '../services/routeService';
import ComponentLoader from '../utils-components/ComponentLoader';


/**
 * La fonction mapStateToProps renvoie un objet résultant du state. 
 * L'objet renvoyé est passé en props du composant connecté
 */
const mapStateToProps = appState => ({
    nomenclatures: appState.ordonnance[dataTypes.ARBORESCENCE]
})

class Arborescence extends Component {

    constructor(props) {
        super(props)
        this.handleClickDouleur.bind(this)
    }

    componentDidMount() {
        setArborescence()
    }

    handleClickDouleur = (idDouleur) => {
        goToRoute(this.props)(routes.FICHE_DOULEUR, {idDouleur})
    }

    render() {
        return <ComponentLoader loadedObject={this.props.nomenclatures}>
            <div>
                <Message info>Choisissez le type de douleur concernée dans l'arborescence ci-dessous</Message>
                <ArborescenceComponent {...this.props} handleClickDouleur={this.handleClickDouleur}/>
            </div>
        </ComponentLoader>        
    }
}
/**
 * La méthode connect() relie le store au composant cible.
 * Elle prend en paramètres 
 * - la fonction "mapStateToProps" à laquelle le state du store est passé en paramètre.
 */
export default connect(mapStateToProps)(Arborescence)