import { createStore } from "redux";
import { reducers } from "./reducers";


// les reducers sont chargés de la mise à jour du store lorsque celui ci reçoit une action
export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export function getState(namespace) {
	const state = store.getState()[namespace]
    return state
}

export default function dispatchData(type, content) {
    store.dispatch({ type, content })
}



