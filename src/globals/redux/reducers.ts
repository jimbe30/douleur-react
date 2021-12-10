import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { dataTypes as testDataTypes } from "../../Test"
import { dataTypes as ordonnanceDataTypes  } from "../../ordonnance/services/OrdonnanceActions";
import { dataTypes as nomenclatureDataTypes  } from "../../nomenclature/services/GestionNomenclatureService";
import { dataTypes as ordonnanceTypeDataTypes  } from "../../ordonnanceType/services/OrdonnanceTypeActions";
import { formNames } from "./FormActions"
import { dataTypes as authDataTypes} from "../../auth/services/AuthService"
import { ActionType, NamespacesDataType, NestedStateType, ReducerType } from "./store";

/**
 * Ici on répertorie les types de données à gérer par redux, répartis par fonctionnalité (namespace)
 * Ces types de données sont transmis aux actions redux via la méthode dispatch()
 */
export const namespaces: NamespacesDataType = {
	test: testDataTypes,
	nomenclature: nomenclatureDataTypes,
	ordonnance: ordonnanceDataTypes, 
	ordonnanceType: ordonnanceTypeDataTypes,
	appForms: formNames,
	auth: authDataTypes,
	router: { history: 'history' }
}

/**
 * Ici on référence les reducers de l'appli Redux pour chaque fonctionnalité.
 * Ce sont des fonctions chargées de calculer le nouvel état du store 
 * à partir de l'état précédent et de l'action effectuée.
 */
export const reducers = combineReducers<NestedStateType>({
	...getReducers(),
	form: formReducer,
})

function getReducers() {
	let reducers: { 
		[namespace: string]: (state: NestedStateType, action: ActionType) => NestedStateType 
	} = {} 
	Object.keys(namespaces).forEach(namespace =>	{
		reducers[namespace] = getReducer(namespace)
	})
	return reducers
}

/**
 * Fournit un reducer générique pour la fonctionnalité concernée (namespace) 
 */
function getReducer(namespace: string) {

	const reducer: ReducerType =  (state: NestedStateType = {}, action: ActionType) => {
		if (namespaces[namespace][action.type]) {
			return { ...state, [namespaces[namespace][action.type]]: action.content }
		} else if (typeof namespaces[namespace] === 'object') {
			if (action.type === namespace + '.reset') {
				return {}
			}
			const namespaceData = namespaces[namespace]
			if ( Object.values(namespaceData).findIndex(value => 
						value === action.type) >= 0 ) {
				return { ...state, [action.type]: action.content }
			}
		}
		return state
	}
	return reducer
}

