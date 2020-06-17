import React from 'react'
import ListeOrdonnancesTypes from './ListeOrdonnancesTypes'
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
		goToRoute(history)(routesConfig.GESTION_NOMENCLATURE)
	}

	const props = { ordonnancesTypes, creerOrdonnance, ...otherProps }

	// rendu
	return (
		<ListeOrdonnancesTypes {...props} />
	)
}

export default connect(mapStateToProps)(OrdonnancesTypesController)

