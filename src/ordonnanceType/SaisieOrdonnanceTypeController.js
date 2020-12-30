import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

import FormHandler from '../globals/hoc/FormHandler';
import { formNames } from '../globals/redux/FormActions'
import OrdonnanceTypeForm from './OrdonnanceTypeForm';
import { chargerInfosMedicaments, reduxNamespace } from './services/OrdonnanceTypeActions';


const mapStateToProps = state => {
	let props = {}
	if (state[reduxNamespace]) {
		props = { ...state[reduxNamespace] }
	}	
	return props
}
export default connect(mapStateToProps)(SaisieOrdonnanceType)


// Composant chargé du rendu 
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
		<FormHandler component={Formulaire}
			formName={formNames.CONFIG_ORDONNANCE_FORM}
			mode='Saisie'
			{...props}
		/>
	)
}


