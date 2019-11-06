/**
 * Ici on prends en compte l'état applicatif.
 * La méthode connect() relie le store au composant cible 
 */
import { connect } from 'react-redux'
import { getPrescriptions } from "./OrdonnanceActions";
import FicheDouleurComponent from "./FicheDouleurComponent";
import React, { Component, Fragment } from 'react'
import OrdonnanceForm from "./OrdonnanceForm";

class FicheDouleur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            choixOrdonnance: null,
            prescriptionChoisie: null
        }
        this.onClickOrdonnance.bind(this)
    }


    getRouteParams() {
        if (this.props.match) {
            return this.props.match.params
        }
        return {}
    }


    componentDidMount() {
        let { idDouleur } = this.getRouteParams()
        getPrescriptions(idDouleur)
    }


    onClickOrdonnance = (index) => {
        this.setState({
            choixOrdonnance: index,
            prescriptionChoisie: this.props.prescriptions[index]
        })
        console.log('Choix de l\'ordonnance n° ' + (index+1))
    }


    prescriptionsAffichables() {
        if (this.state.prescriptionChoisie) {
            return [this.state.prescriptionChoisie]
        } else {
            return this.props.prescriptions
        }
    } 



    render() {
        return (
            <Fragment>
                <FicheDouleurComponent clickOrdonnance={this.onClickOrdonnance} prescriptions={this.prescriptionsAffichables()} />
                <OrdonnanceForm
                    onSubmit={() => console.log("Formulaire ordonance soumis")}
                    {...this.props.formValues}
                />
            </Fragment>
        )
    }


}

/**
 * La fonction mapStateToProps renvoie un objet résultant du state. 
 * L'objet renvoyé est passé en props du composant connecté
 */
const mapStateToProps = appState => ({
    prescriptions: appState.ordonnance.prescriptions,
    formValues: appState.form.ordonnance ? appState.form.ordonnance.values : {},
})

/**
 * La méthode connect() relie le store au composant cible.
 * Elle prend en paramètre la fonction "mapStateToProps", laquelle prend elle-même en paramètre le state du store.
 */
export default connect(mapStateToProps)(FicheDouleur)