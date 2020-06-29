import React from 'react'
import OrdonnancesTypes from './OrdonnancesTypesComponent'
import { dataTypes } from './services/GestionNomenclatureActions'
import { connect } from 'react-redux'
import { routesConfig, goToRoute } from '../globals/services/routeService'

const mapStateToProps = state => {
	let props = state.nomenclature ? 
		{ 
			ordonnancesTypes: state.nomenclature[dataTypes.LISTE_ORDONNANCES_TYPES]
		}
		: {}
	return props
}



function OrdonnancesTypesController({ ordonnancesTypes, ...otherProps }) {

	function creerOrdonnance() {
		let {history} = otherProps
		goToRoute(history)(routesConfig.SAISIE_ORDONNANCE_TYPE)
	}

	const props = { ordonnancesTypes, creerOrdonnance, ...otherProps }

	// rendu
	return (
		<OrdonnancesTypes {...props} />
	)
}

export default connect(mapStateToProps)(OrdonnancesTypesController)

