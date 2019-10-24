import dispatchAction from "../redux/store";
import axios from "axios";
import urls from "../config/URLs-conf";

export const ordonnanceActions = {
    GET_PRECONISATIONS: 'GET_PRECONISATIONS', 
    GET_ARBORESCENCE: 'GET_ARBORESCENCE',
}

export async function getPreconisations(idDouleur) {
  const result = await getResultFromUrl(urls.douleurs + idDouleur)
  dispatchAction(ordonnanceActions.GET_PRECONISATIONS, result);  
}

export async function getArborescence() {
    const result = await getResultFromUrl(urls.douleurs)
    dispatchAction(ordonnanceActions.GET_ARBORESCENCE, result);
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

