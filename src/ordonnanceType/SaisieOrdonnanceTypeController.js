import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { formNames } from '../_redux/forms/formActions'
import { ordonnanceTypeNs } from "../_redux/conf";
import FormHandler from '../globals/hoc/FormHandler';
import OrdonnanceTypeForm from './OrdonnanceTypeForm';
import { chargerInfosMedicaments } from './services/OrdonnanceTypeActions';


const mapStateToProps = state => {
	let props = {}
	if (state[ordonnanceTypeNs]) {
		props = { ...state[ordonnanceTypeNs] }
	}
	return props
}

export default connect(mapStateToProps)(SaisieOrdonnanceType)

function SaisieOrdonnanceType(props) {
	const { referentielMedicaments, ordonnanceType } = props
	if (!referentielMedicaments) {
		chargerInfosMedicaments()
		return null
	}
	if (ordonnanceType) {
		const { id, description, medicaments } = ordonnanceType
		props = { id, description, medicaments, ...props }
	}
	const Formulaire = props =>
		<Form size='tiny' style={{ marginBottom: '1rem' }}>
			<OrdonnanceTypeForm {...props} />
		</Form>
	return (
		<FormHandler formName={formNames.CONFIG_ORDONNANCE_FORM}>
			<Formulaire mode='Saisie' {...props} />
		</FormHandler>
	)
}


