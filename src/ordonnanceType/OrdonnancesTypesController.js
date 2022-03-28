import React from 'react'
import OrdonnancesTypes from './ListeOrdonnancesTypes'
import { listerOrdonnancesTypes } from './services/OrdonnanceTypeActions'
import { connect } from 'react-redux'
import { routesConfig, goToRoute } from '../globals/services/routeService'
import dispatchData from '../_redux/store'
import { ordonnanceTypeNs, ordonnanceTypeData } from "../_redux/conf";

const mapStateToProps = state => {
	let props = state[ordonnanceTypeNs] 
		&& state[ordonnanceTypeNs][ordonnanceTypeData.LISTE_ORDONNANCES_TYPES]? 
		{ 
			ordonnancesTypes: state.ordonnanceType[ordonnanceTypeData.LISTE_ORDONNANCES_TYPES]
		}
		: {}
	return props
}



function OrdonnancesTypesController({ ordonnancesTypes, ...otherProps }) {

	function creerOrdonnance() {
		dispatchData(ordonnanceTypeData.ORDONNANCE_TYPE, null)
		let {history} = otherProps
		goToRoute(history)(routesConfig.SAISIE_ORDONNANCE_TYPE)
	}

	function selectOrdonnanceType(ordonnanceType) {
		dispatchData(ordonnanceTypeData.ORDONNANCE_TYPE, ordonnanceType)
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

