/**
 * Ici on prends en compte l'état applicatif (store redux).
 * La méthode connect() relie le store au composant cible 
 */
import { connect } from 'react-redux'
import { setArborescence } from "../nomenclature/services/GestionNomenclatureService";
import ArborescenceComponent from "../nomenclature/ArborescenceComponent";
import React, { Component } from 'react'
import { Message } from 'semantic-ui-react';
import { routesConfig, goToRoute } from '../globals/services/routeService';
import ComponentLoader from '../globals/util-components/ComponentLoader';
import { nomenclatureData } from "../_conf/redux";

/**
 * La fonction mapStateToProps renvoie un objet résultant du state. 
 * L'objet renvoyé est passé en props du composant connecté
 */
const mapStateToProps = appState => ({
    nomenclatures: appState.nomenclature[nomenclatureData.ARBORESCENCE]
})

class Arborescence extends Component {

    componentDidMount() {
        setArborescence()
    }

	 actionDouleur = {
		libelle : 'Choisir une ordonnance',
		process: (idDouleur) => goToRoute(this.props)(routesConfig.FICHE_DOULEUR, {idDouleur}),
		primary: true
	 }

    render() {
        return <ComponentLoader loadedObject={this.props.nomenclatures}>
            <div>
                <Message info>Choisissez le type de douleur concernée dans l'arborescence ci-dessous</Message>
                <ArborescenceComponent {...this.props} actionsDouleurs={[this.actionDouleur]}/>
            </div>
        </ComponentLoader>        
    }
}
/**
 * La méthode connect() relie le store au composant cible.
 * Elle prend en paramètre la fonction "mapStateToProps" à laquelle le state 
 * du store est passé en paramètre.
 */
export default connect(mapStateToProps)(Arborescence)