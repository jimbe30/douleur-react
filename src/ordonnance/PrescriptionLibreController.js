import React from "react";
import PrescriptionLibreForm from "./PrescriptionLibreForm";

class PrescriptionLibreController extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			numMedicaments: [],
		}
		this.ajouterMedicament = this.ajouterMedicament.bind(this)
		this.supprimerMedicament = this.supprimerMedicament.bind(this)
	}

	ajouterMedicament(event) {
		let prochainNumMedicament = this.props.debutCompteur
		if (this.state.numMedicaments.length > 0) {
			prochainNumMedicament = this.state.numMedicaments[this.state.numMedicaments.length - 1] + 1
		}
		if (!prochainNumMedicament) {
			prochainNumMedicament = 0
		}
		let numMedicaments = [prochainNumMedicament]
		if (Array.isArray(this.state.numMedicaments)) {
			numMedicaments = [...this.state.numMedicaments, prochainNumMedicament]
		}
		this.setState({ numMedicaments })
		event.preventDefault()
	}

	supprimerMedicament(event, numMedicament) {
		let index = this.state.numMedicaments.indexOf(numMedicament)
		if (index !== undefined) {
			let numMedicaments = [...this.state.numMedicaments]
			numMedicaments.splice(index, 1)
			this.setState({ numMedicaments })
		}
		event.preventDefault()
	}

	render = () =>
		<PrescriptionLibreForm
			handleClickAjouter={this.ajouterMedicament}
			handleClickSupprimer={this.supprimerMedicament}
			numMedicaments={this.state.numMedicaments}
		/>

}

export default PrescriptionLibreController;
