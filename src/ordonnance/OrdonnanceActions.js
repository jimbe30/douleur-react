import {dispatchAction} from "../redux/store";
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

export function getArborescence() {
  try {
    const result = axios.get(urls.arborescence);
    dispatchAction(ordonnanceActions.GET_ARBORESCENCE, result.data);
    return null;
  } catch (error) {
    return error;
  }
}

/**
 * Reducer pour le thème ordonnance
 * @param {*} state 
 * @param {*} action 
 */
export default function ordonnanceReducer(state = {}, action) {

    switch(action.type) {
        case ordonnanceActions.GET_PRECONISATIONS: {
          return {...state, preconisations: action.content}
        }
        case ordonnanceActions.GET_ARBORESCENCE: {
           return {...state, arborescence: action.content}
        }
        default:
            return state         
    } 
}

