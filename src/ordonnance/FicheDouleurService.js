import { connect } from 'react-redux'
import { reduxForm } from "redux-form";
import { setPreconisations } from "../redux/OrdonnanceActions";
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
        this.clickOrdonnance.bind(this)
    }

    getRouteParams() {
        if (this.props.match) {
            return this.props.match.params
        }
        return {}
    }

    componentDidMount() {
        let { idDouleur } = this.getRouteParams()
        setPreconisations(idDouleur)
    }

    clickOrdonnance = (index) => {
        this.setState({
            choixOrdonnance: index,
            prescriptionChoisie: this.props.prescriptions[index]
        })
        console.log('Choix de l\'ordonnance n° ' + (index + 1))
    }

    submitOrdonnance = form => {
        const body = JSON.stringify(form)
        console.log(body)
    }

    render() {
        return (
            <Fragment>
                <FicheDouleurComponent clickOrdonnance={this.clickOrdonnance}
                    prescriptionChoisie={this.state.prescriptionChoisie} prescriptions={this.props.prescriptions} />
                {
                    this.state.prescriptionChoisie &&
                    <OrdonnanceForm
                        onSubmit={this.submitOrdonnance}
                        ordonnance={this.state.prescriptionChoisie}
                        {...this.props.formValues}
                    />
                }
            </Fragment>
        )
    }
}

FicheDouleur = reduxForm({
    form: "ordonnance",
})(FicheDouleur);


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
