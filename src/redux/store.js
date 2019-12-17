import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ordonnanceReducer from "../ordonnance/OrdonnanceActions";
import formsReducer from "./FormActions";

/**
 * C'est ici qu'il faut référencer les différents reducers de l'appli Redux.
 * Ce sont des fonctions qui doivent être définies dans les composants *Actions.js 
 * et qui ont pour responsabilité de calculer le nouvel état du store en fonction 
 * des actions effectuées.
 */
const reducers = combineReducers({
   ordonnance: ordonnanceReducer,
   form: formReducer,
   appForms : formsReducer
})

// les reducers sont chargés de la mise à jour du store lorsque celui ci reçoit une action
export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export function getState(namespace) {
    return store.getState()[namespace]
}

export default function dispatchData(type, content) {
    store.dispatch({ type, content })
}



