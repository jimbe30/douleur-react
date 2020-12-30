import React from 'react'
import OrdonnancesTypes from './ListeOrdonnancesTypes'
import { dataTypes, listerOrdonnancesTypes } from './services/OrdonnanceTypeActions'
import { connect } from 'react-redux'
import { routesConfig, goToRoute } from '../globals/services/routeService'
import dispatchData from '../globals/redux/store'

const mapStateToProps = state => {
	let props = state.ordonnanceType 
		&& state.ordonnanceType[dataTypes.LISTE_ORDONNANCES_TYPES]? 
		{ 
			ordonnancesTypes: state.ordonnanceType[dataTypes.LISTE_ORDONNANCES_TYPES]
		}
		: {}
	return props
}



function OrdonnancesTypesController({ ordonnancesTypes, ...otherProps }) {

	function creerOrdonnance() {
		dispatchData(dataTypes.ORDONNANCE_TYPE, null)
		let {history} = otherProps
		goToRoute(history)(routesConfig.SAISIE_ORDONNANCE_TYPE)
	}

	function selectOrdonnanceType(ordonnanceType) {
		dispatchData(dataTypes.ORDONNANCE_TYPE, ordonnanceType)
		let {history} = otherProps
		goToRoute(history)(routesConfig.SAISIE_ORDONNANCE_TYPE)
	}

	const props = { ordonnancesTypes, creerOrdonnance, selectOrdonnanceType, ...otherProps }

	if (!ordonnancesTypes) {
		listerOrdonnancesTypes()
		return null
	}

	// rendu
	return (
		<OrdonnancesTypes {...props} />
	)
}

export default connect(mapStateToProps)(OrdonnancesTypesController)

