import dispatchData, { store } from "../../_redux/store";
import { ordonnanceData } from "../../_redux/conf";
import { setFormValues, formNames, setFormErrors, resetFormErrors } from "../../_redux/forms/formActions";
import { apiURLs as urls, getResultFromUrl, postObjectToUrl, backendURL } from "../../globals/services/apiService";
import { goToRoute, routesConfig } from "../../globals/services/routeService";


export async function setInfosTest(infos) {
	dispatchData(ordonnanceData.INFOS_TEST, infos);
}


export async function setPreconisations(idDouleur) {
	const result = await getResultFromUrl(urls.ficheDouleur(idDouleur))
	dispatchData(ordonnanceData.PRESCRIPTIONS, result.data);
}


export function setPrescriptionChoisie(prescription) {
	let state = store.getState().ordonnance
	let precedente = state && state[ordonnanceData.PRESCRIPTION_CHOISIE] ? state[ordonnanceData.PRESCRIPTION_CHOISIE] : {}
	if (JSON.stringify(precedente) !== JSON.stringify(prescription)) {
		setFormValues(formNames.PRESCRIPTION_FORM, null)
	}
	dispatchData(ordonnanceData.PRESCRIPTION_CHOISIE, prescription);
}


export function setPrescriptionSaisie(prescription) {
	dispatchData(ordonnanceData.PRESCRIPTION_SAISIE, prescription);
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
	dispatchData(ordonnanceData.ORDONNANCE_EMISE, ordonnance)
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
