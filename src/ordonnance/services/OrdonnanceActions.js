import dispatchData, { store } from "../../globals/redux/store";
import { apiURLs as urls, getResultFromUrl, postObjectToUrl, backendURL } from "../../globals/services/apiService";
import { setFormValues, formNames, setFormErrors, resetFormErrors } from "../../globals/redux/FormActions";
import { goToRoute, routesConfig } from "../../globals/services/routeService";

export const dataTypes = {
	INFOS_TEST: 'INFOS_TEST',
	ARBORESCENCE: 'ARBORESCENCE',
	PRESCRIPTIONS: 'PRESCRIPTIONS',
	PRESCRIPTION_CHOISIE: 'PRESCRIPTION_CHOISIE',
	PRESCRIPTION_SAISIE: 'PRESCRIPTION_SAISIE',
	ORDONNANCE_EMISE: 'ORDONNANCE_EMISE'
}

export async function setInfosTest(infos) {
	dispatchData(dataTypes.INFOS_TEST, infos);
}

export async function setArborescence() {
	const result = await getResultFromUrl(urls.arborescenceDouleurs)
	dispatchData(dataTypes.ARBORESCENCE, result.data);
}

export async function setPreconisations(idDouleur) {
	const result = await getResultFromUrl(urls.ficheDouleur(idDouleur))
	dispatchData(dataTypes.PRESCRIPTIONS, result.data);
}

export function setPrescriptionChoisie(prescription) {
	let state = store.getState().ordonnance
	let precedente = state && state[dataTypes.PRESCRIPTION_CHOISIE] ? state[dataTypes.PRESCRIPTION_CHOISIE] : {}
	if (JSON.stringify(precedente) !== JSON.stringify(prescription)) {
		setFormValues(formNames.PRESCRIPTION_FORM, null)
	}
	dispatchData(dataTypes.PRESCRIPTION_CHOISIE, prescription);
}

export function setPrescriptionSaisie(prescription) {
	dispatchData(dataTypes.PRESCRIPTION_SAISIE, prescription);
}

export async function setOrdonnanceEmise(ordonnance, history) {

	resetFormErrors(formNames.INFOS_PATIENT_FORM)
	let result = await postObjectToUrl(ordonnance, urls.nouvelleOrdonnance)
	if (result.data) {
		const obj = result.data
		if (obj.errors) {
			console.log(JSON.stringify(obj))
			setFormErrors(formNames.INFOS_PATIENT_FORM, obj.errors)
			goToRoute(history)(routesConfig.FORMULAIRE_ORDONNANCE)
		} else {
			const idOrdonnance = result.data
			try {
				ordonnance.fileURL = await getOrdonnanceEmise(idOrdonnance)
				goToRoute(history)(routesConfig.CONFIRMATION_ORDONNANCE)
				console.log('L\'ordonnance a bien été enregistrée')
			} catch (error) {
				console.error(error)
			}
		}
	} else {
		console.error('L\'ordonnance n\'a pas pu être correctement enregistrée')
	}
	dispatchData(dataTypes.ORDONNANCE_EMISE, ordonnance)
}

export async function getOrdonnanceEmise(idOrdonnance) {
	let fileURL
	try {
		let pdfOrdonnance = await getResultFromUrl(urls.ordonnanceEmise(idOrdonnance), { responseType: 'blob' })
		pdfOrdonnance = new Blob([pdfOrdonnance.data], { type: 'application/pdf' })
		fileURL = URL.createObjectURL(pdfOrdonnance)
		if (window.navigator && window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveOrOpenBlob(pdfOrdonnance, idOrdonnance);			
		} else {
			window.open(fileURL)
		}
		fileURL = (backendURL ? backendURL : '') + urls.ordonnanceEmise(idOrdonnance)
	} catch (error) {
		console.error(error)
		throw error
	}
	return fileURL
}
