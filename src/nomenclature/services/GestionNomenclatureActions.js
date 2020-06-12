import dispatchData, { store } from "../../globals/redux/store";
import { apiURLs as urls, getResultFromUrl, postObjectToUrl } from "../../globals/services/apiService";
import { setFormValues, formNames, setFormErrors, resetFormErrors } from "../../globals/redux/FormActions";
import { goToRoute, routes } from "../../globals/services/routeService";
import { descriptionOrdonnanceType } from "./GestionNomenclatureService";

export const namespace = 'nomenclature'
export const dataTypes = {
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

export async function validerOrdonnanceType(ordonnanceType, {history}) {
	descriptionOrdonnanceType(ordonnanceType)
	dispatchData(dataTypes.ORDONNANCE_TYPE, ordonnanceType)
	goToRoute(history)(routes.ORDONNANCES_TYPES)
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

/////

export async function setPreconisations(idDouleur) {
	const result = await getResultFromUrl(urls.ficheDouleur(idDouleur))
	dispatchData(dataTypes.PRESCRIPTIONS, result.data);
}

export async function setOrdonnanceEmise(ordonnance, history) {

	resetFormErrors(formNames.INFOS_PATIENT_FORM)
	let result = await postObjectToUrl(ordonnance, urls.nouvelleOrdonnance)
	if (result.data) {
		const obj = result.data
		if (obj.errors) {
			console.log(JSON.stringify(obj))
			setFormErrors(formNames.INFOS_PATIENT_FORM, obj.errors)
			goToRoute(history)(routes.FORMULAIRE_ORDONNANCE)
		} else {
			goToRoute(history)(routes.CONFIRMATION_ORDONNANCE)
			console.log('L\'ordonnance a bien été enregistrée')
		}
	} else {
		console.error('L\'ordonnance n\'a pas pu être correctement enregistrée')
	}
	dispatchData(dataTypes.ORDONNANCE_EMISE, ordonnance)
}
