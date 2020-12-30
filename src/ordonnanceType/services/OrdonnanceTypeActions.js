import dispatchData, { store } from "../../globals/redux/store";
import { apiURLs, getResultFromUrl, postObjectToUrl } from "../../globals/services/apiService";
import { goToRoute, routesConfig } from "../../globals/services/routeService";
import { descriptionOrdonnanceType } from "./OrdonnanceTypeService";

export const reduxNamespace = 'ordonnanceType'
export const dataTypes = {
	ORDONNANCE_TYPE: 'ordonnanceType',
	LISTE_ORDONNANCES_TYPES: 'listeOrdonnancesTypes',
	REFERENTIEL_MEDICAMENTS: 'referentielMedicaments',
}

function getState(dataType) {
	const state = store.getState()[reduxNamespace][dataType]
	if (!state) {
		return undefined
	} else if (state instanceof Array) {
		return [...state]
	} else if (state instanceof Object) {
		return { ...state }
	}
}

export function getReferentielMedicaments() {
	return getState(dataTypes.REFERENTIEL_MEDICAMENTS)
}


export async function validerOrdonnanceType(ordonnanceType, { history }) {
	descriptionOrdonnanceType(ordonnanceType)
	ordonnanceType = await majOrdonnanceType(ordonnanceType)
	if (!ordonnanceType.error) {
		dispatchData(dataTypes.ORDONNANCE_TYPE, null)
		listerOrdonnancesTypes()
		goToRoute(history)(routesConfig.ORDONNANCES_TYPES)
	}
}


////////////       Accès API backend       ////////////

export async function majOrdonnanceType(ordonnanceType) {
	if (ordonnanceType) {
		let result = await postObjectToUrl(ordonnanceType, apiURLs.majOrdonnanceType)
		if (result.data) {
			const obj = result.data
			if (obj.errors) {
				console.log(JSON.stringify(obj))
				ordonnanceType.error = JSON.stringify(obj)
			} else {
				ordonnanceType = result.data
			}
		}
	}
	return ordonnanceType
}

export async function listerOrdonnancesTypes() {
	const result = await getResultFromUrl(apiURLs.listeOrdonnancesTypes)
	if (result.data) {
		const obj = result.data
		if (obj.errors) {
			console.log(JSON.stringify(obj))
		} else {
			dispatchData(dataTypes.LISTE_ORDONNANCES_TYPES, result.data)
		}
	}

}

export async function chargerInfosMedicaments() {
	const result = await getResultFromUrl(apiURLs.referentielMedicaments)
	if (result.data) {
		const obj = result.data
		if (obj.errors) {
			console.log(JSON.stringify(obj))
		} else {
			dispatchData(dataTypes.REFERENTIEL_MEDICAMENTS, result.data)
		}
	}

}


