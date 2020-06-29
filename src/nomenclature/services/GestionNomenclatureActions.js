import dispatchData, { store } from "../../globals/redux/store";
import { apiURLs as urls, getResultFromUrl, postObjectToUrl } from "../../globals/services/apiService";
import { setFormValues, formNames, setFormErrors, resetFormErrors } from "../../globals/redux/FormActions";
import { goToRoute, routesConfig } from "../../globals/services/routeService";
import { descriptionOrdonnanceType } from "./GestionNomenclatureService";

export const namespace = 'nomenclature'
export const dataTypes = {
	ARBORESCENCE: 'arborescence',
	ORDONNANCE_TYPE: 'ordonnanceType',
	LISTE_ORDONNANCES_TYPES: 'listeOrdonnancesTypes',
	PROTOCOLE_DOULEUR: 'protocoleDouleur',
	NOMENCLATURE_DOULEUR: 'nomenclatureDouleur'
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


//////////////////////////////

export async function setArborescence() {
	const result = await getResultFromUrl(urls.arborescenceDouleurs)
	dispatchData(dataTypes.ARBORESCENCE, result.data);
}

export function addNiveauNomenclature(id, libelle) {

	if (!libelle) {
		return {error: 'Le libellé est obligatoire'}
	}

	const arborescence = getState(dataTypes.ARBORESCENCE)
	if (arborescence) {
		const nomenclature = findNiveauNomenclature(id, arborescence)
		if (nomenclature) {
			nomenclature.nomenclaturesEnfants = [...nomenclature.nomenclaturesEnfants, { id: null, libelle }]
			dispatchData(dataTypes.ARBORESCENCE, arborescence)
		}
	}
}

function findNiveauNomenclature(id, branche) {
	let niveau
	if (Array.isArray(branche)) {
		niveau = branche.find(nomenclature => nomenclature.id === id)
		if (!niveau) {
			branche.forEach(nomenclature => {
				if (!niveau && nomenclature.nomenclaturesEnfants) {
					niveau = findNiveauNomenclature(id, nomenclature.nomenclaturesEnfants)
				}
			})
		}
	}
	return niveau
}

//////////////////////////////

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


