import { combineReducers } from "redux";
import ordonnanceReducer from "./OrdonnanceActions";
import { reducer as formReducer } from "redux-form";

/**
 * C'est ici qu'il faut référencer les différents reducers de l'appli Redux.
 * Ce sont des fonctions qui doivent être définies dans les composants *Actions.js 
 * et qui ont pour responsabilité de calculer le nouvel état du store en fonction 
 * des actions effectuées.
 */
export default combineReducers({
   ordonnance: ordonnanceReducer,
   form: formReducer,
})