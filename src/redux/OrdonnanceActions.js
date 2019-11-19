import dispatchAction from "./store";
import axios from "axios";
import { apiURLs as urls } from "../config/URLs-conf";

export const ordonnanceActions = {
    SET_PRESCRIPTIONS: 'SET_PRESCRIPTIONS', 
    SET_ARBORESCENCE: 'SET_ARBORESCENCE',
}

export async function setPreconisations(idDouleur) {
  const result = await getResultFromUrl(urls.ficheDouleur(idDouleur))
  dispatchAction(ordonnanceActions.SET_PRESCRIPTIONS, result);  
}

export async function setArborescence() {
    const result = await getResultFromUrl(urls.arborescenceDouleurs)
    dispatchAction(ordonnanceActions.SET_ARBORESCENCE, result);
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

    switch(action.type) {
        case ordonnanceActions.SET_PRESCRIPTIONS: {
          return {...ordonnance, prescriptions: action.content}
        }
        case ordonnanceActions.SET_ARBORESCENCE: {
           return {...ordonnance, arborescence: action.content}
        }
        default:
            return ordonnance         
    } 
}

