import dispatchData from "./store";
import axios from "axios";
import { apiURLs as urls } from "../config/URLs-conf";

export const dataTypes = {
  ARBORESCENCE: 'ARBORESCENCE',
  PRESCRIPTIONS: 'PRESCRIPTIONS',
  PRESCRIPTION_CHOISIE: 'PRESCRIPTION_CHOISIE',
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

const getResultFromUrl = async url => {
  try {
    let result
    await axios.get(url).then(response => result = response.data)
    return result
  } catch (error) {
    return error;
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

