import dispatchAction from "../redux/store";
import axios from "axios";
import urls from "../config/URLs-conf";

export const ordonnanceActions = {
    GET_PRECONISATIONS: 'GET_PRECONISATIONS', 
    GET_ARBORESCENCE: 'GET_ARBORESCENCE',
}

export function getPreconisations(idDouleur) {
  try {
    const result = axios.get(urls.preconisations + idDouleur);
    dispatchAction(ordonnanceActions.GET_PRECONISATIONS, result.data);
    return null;
  } catch (error) {
    return error;
  }
}

export async function getArborescence() {
  try {
    let result 
    await axios.get(urls.arborescence)
      .then(response => result = response.data)
    dispatchAction(ordonnanceActions.GET_ARBORESCENCE, result);
    return null;
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
        case ordonnanceActions.GET_PRECONISATIONS: {
          return {...ordonnance, preconisations: action.content}
        }
        case ordonnanceActions.GET_ARBORESCENCE: {
           return {...ordonnance, arborescence: action.content}
        }
        default:
            return ordonnance         
    } 
}

