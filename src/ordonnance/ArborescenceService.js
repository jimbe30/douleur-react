/**
 * Ici on prends en compte l'état applicatif.
 * La méthode connect() relie le store au composant cible 
 */
import { connect } from 'react-redux'
import { getArborescence } from "./OrdonnanceActions";
import ArborescenceComponent from "./ArborescenceComponent";
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Arborescence extends Component {

    propTypes = {
        nomenclatures: PropTypes.arrayOf(PropTypes.object).isRequired,
    };


    componentDidMount() {
        getArborescence()
    }


    render() {
        return (
            <ArborescenceComponent {...this.props} />
        )
    }
    
}
/**
 * La fonction mapStateToProps renvoie un objet résultant du state. 
 * L'objet renvoyé est passé en props du composant connecté
 */
const mapStateToProps = appState => ({
    nomenclatures: appState.ordonnance.arborescence
})
/**
 * La méthode connect() relie le store au composant cible.
 * Elle prend en paramètres 
 * - la fonction "mapStateToProps" à laquelle le state du store est passé en paramètre.
 */
export default connect(mapStateToProps)(Arborescence)