import dispatchData, { store } from "../../globals/redux/store";
import { goToRoute, routesConfig } from "../../globals/services/routeService";
import { descriptionOrdonnanceType } from "./OrdonnanceTypeService";

export const namespace = 'ordonnanceType'
export const dataTypes = {
	ORDONNANCE_TYPE: 'ordonnanceType',
	LISTE_ORDONNANCES_TYPES: 'listeOrdonnancesTypes',
}


function getState(dataType) {
	const state = store.getState()[namespace][dataType]
	if (!state) {
		return undefined
	} else if (state instanceof Array) {
		return [...state]
	} else if (state instanceof Object) {
		return { ...state }
	}
}


export async function validerOrdonnanceType(ordonnanceType, { history }) {
	descriptionOrdonnanceType(ordonnanceType)
	dispatchData(dataTypes.ORDONNANCE_TYPE, ordonnanceType)
	goToRoute(history)(routesConfig.ORDONNANCES_TYPES)
}

export function ajouterOrdonnanceType(ordonnanceType) {
	let listeOrdonnances = getState(dataTypes.LISTE_ORDONNANCES_TYPES)
	if (Array.isArray(listeOrdonnances)) {
		if (!listeOrdonnances.find(ordonnance =>
			JSON.stringify(ordonnance) === JSON.stringify(ordonnanceType)
		)) {
			listeOrdonnances.push(ordonnanceType)
		}
	} else {
		listeOrdonnances = [ordonnanceType]
	}
	dispatchData(dataTypes.LISTE_ORDONNANCES_TYPES, listeOrdonnances);
}

//////////////////////////////


