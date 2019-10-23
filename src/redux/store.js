import { createStore } from "redux";
import reducers from "./reducers";

// les reducers sont chargés de la mise à jour du store lorsque celui ci reçoit une action
export const store = createStore(reducers)

export default function dispatchAction(actionType, actionContent) {
    store.dispatch({
        type: actionType,
        content: actionContent
    })
}



