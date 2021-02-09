import { createStore, Store } from "redux";
import { reducers } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";



// les reducers sont chargés de la mise à jour du store lorsque celui ci reçoit une action
export const store: Store = createStore(reducers, composeWithDevTools())

export function getState(namespace: string) {
	const state = store.getState()[namespace]
    return state
}

export function resetState(namespace: string) {
	dispatchData(namespace + '.reset', {})
}

export default function dispatchData(type: string, content: any) {
    store.dispatch({ type, content })
}



