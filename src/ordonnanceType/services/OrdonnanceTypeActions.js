import dispatchData, { store } from "../../_redux/store";
import { apiURLs, getResultFromUrl, postObjectToUrl } from "../../globals/services/apiService";
import { goToRoute, routesConfig } from "../../globals/services/routeService";
import { descriptionOrdonnanceType } from "./OrdonnanceTypeService";
import { ordonnanceTypeNs, ordonnanceTypeData } from "../../_redux/conf";


function getState(dataType) {
	const state = store.getState()[ordonnanceTypeNs][dataType]
	if (!state) {
		return undefined
	} else if (state instanceof Array) {
		return [...state]
	} else if (state instanceof Object) {
		return { ...state }
	}
}

export function getReferentielMedicaments() {
	return getState(ordonnanceTypeData.REFERENTIEL_MEDICAMENTS)
}


export async function validerOrdonnanceType(ordonnanceType, { history }) {
	descriptionOrdonnanceType(ordonnanceType)
	ordonnanceType = await majOrdonnanceType(ordonnanceType)
	if (!ordonnanceType.error) {
		dispatchData(ordonnanceTypeData.ORDONNANCE_TYPE, null)
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
			dispatchData(ordonnanceTypeData.LISTE_ORDONNANCES_TYPES, result.data)
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
			dispatchData(ordonnanceTypeData.REFERENTIEL_MEDICAMENTS, result.data)
		}
	}

}


