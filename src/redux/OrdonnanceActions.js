import dispatchData from "./store";
import axios from "axios";
import { apiURLs as urls } from "../config/URLs-conf";

export const dataTypes = {
  ARBORESCENCE: 'ARBORESCENCE',
  PRESCRIPTIONS: 'PRESCRIPTIONS',
  PRESCRIPTION_CHOISIE: 'PRESCRIPTION_CHOISIE',
  PRESCRIPTION_SAISIE: 'PRESCRIPTION_SAISIE',
  ORDONNANCE_EMISE: 'ORDONNANCE_EMISE'
}

export async function setArborescence() {
  const result = await getResultFromUrl(urls.arborescenceDouleurs)
  dispatchData(dataTypes.ARBORESCENCE, result);
}

export async function setPreconisations(idDouleur) {
  const result = await getResultFromUrl(urls.ficheDouleur(idDouleur))
  dispatchData(dataTypes.PRESCRIPTIONS, result);
}

export function setPrescriptionChoisie(prescription) {
  dispatchData(dataTypes.PRESCRIPTION_CHOISIE, prescription);
}

export function setPrescriptionSaisie(prescription) {  
  dispatchData(dataTypes.PRESCRIPTION_SAISIE, prescription);
}

export async function setOrdonnanceEmise(ordonnance) {
  let result = await postObjectToUrl(ordonnance, urls.nouvelleOrdonnance, {responseType: 'blob'})
  if (result.data) {
    const file = new Blob([result.data], {type: 'application/pdf'})
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    console.log('L\'ordonnance a bien été enregistrée')
  } else {
    console.error('L\'ordonnance n\'a pas pu être correctement enregistrée')
  }
  dispatchData(dataTypes.ORDONNANCE_EMISE, ordonnance)
}

export const getResultFromUrl = async (url, config) => {
  try {
    let result
    await axios.get(url, config).then(response => result = response.data)
    return result
  } catch (error) {
    return error;
  }
}

export const postObjectToUrl = async (object, url, config) => {
  try {
    let result = {}
    await axios.post(url, object, config).then(response => {
      result.status = response.status
      result.data = response.data

    })
    return result
  } catch (error) {
    return false
  }
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

