import dispatchData from "./store";
import { apiURLs as urls, getResultFromUrl, postObjectToUrl, returnTypes } from "../services/apiService";

export const dataTypes = {
  ARBORESCENCE: 'ARBORESCENCE',
  PRESCRIPTIONS: 'PRESCRIPTIONS',
  PRESCRIPTION_CHOISIE: 'PRESCRIPTION_CHOISIE',
  PRESCRIPTION_SAISIE: 'PRESCRIPTION_SAISIE',
  PRESCRIPTION_FORM_VALUES: 'PRESCRIPTION_FORM_VALUES',
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
  dispatchData(dataTypes.PRESCRIPTION_CHOISIE, prescription);
}

export function setPrescriptionFormValues(formValues) {
  dispatchData(dataTypes.PRESCRIPTION_FORM_VALUES, formValues);
}

export function setPrescriptionSaisie(prescription) {
  dispatchData(dataTypes.PRESCRIPTION_SAISIE, prescription);
}

export async function setOrdonnanceEmise(ordonnance) {
  let result = await postObjectToUrl(ordonnance, urls.nouvelleOrdonnance, { responseType: 'blob' })
  if (result.data) {
    let isError = false
    if (result.type === returnTypes.OBJECT) {
      const obj = result.data
      if (obj.error || obj.errors) {
        console.log("error: " + (obj.error ? JSON.stringify(obj.error) : JSON.stringify(obj.errors)))
        isError = true
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
  }
  return ordonnance

}

