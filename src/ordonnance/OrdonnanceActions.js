import dispatchData, { store } from "../redux/store";
import { apiURLs as urls, getResultFromUrl, postObjectToUrl, returnTypes } from "../services/apiService";
import { setFormValues, formNames, setFormErrors, resetFormErrors } from "../redux/FormActions";
import { goToRoute, routes } from "../services/routeService";

export const dataTypes = {
  ARBORESCENCE: 'ARBORESCENCE',
  PRESCRIPTIONS: 'PRESCRIPTIONS',
  PRESCRIPTION_CHOISIE: 'PRESCRIPTION_CHOISIE',
  PRESCRIPTION_SAISIE: 'PRESCRIPTION_SAISIE',
  ORDONNANCE_EMISE: 'ORDONNANCE_EMISE'
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
  let result = await postObjectToUrl(ordonnance, urls.nouvelleOrdonnance, { responseType: 'blob' })
  if (result.data) {
    let isError = false
    if (result.type === returnTypes.OBJECT) {
      const obj = result.data
      if (obj.errors) {
        console.log(JSON.stringify(obj))
        isError = true
        setFormErrors(formNames.INFOS_PATIENT_FORM, obj.errors)
        goToRoute(history)(routes.FORMULAIRE_ORDONNANCE)
      }
    }
    if (isError === false) {
      const file = new Blob([result.data], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      console.log('L\'ordonnance a bien été enregistrée')
    }
  } else {
    console.error('L\'ordonnance n\'a pas pu être correctement enregistrée')
  }
  dispatchData(dataTypes.ORDONNANCE_EMISE, ordonnance)
}

/**
 * Reducer pour le thème ordonnance
 * @param {*} ordonnance 
 * @param {*} action 
 */
export default function ordonnanceReducer(ordonnance = {}, action) {

  if (dataTypes[action.type]) {
    return { ...ordonnance, [dataTypes[action.type]]: action.content }
  } else if (action.type) {
    return {...ordonnance, [action.type] : action.content}
  }
  return ordonnance

}

