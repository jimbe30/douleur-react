import React from 'react';
import { connect } from "react-redux";
import { createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { AnyObject } from "../../types/global-types";
import { reducers } from "./reducers";

///////////////////////      TYPES      /////////////////////////////
export interface NestedStateType {
	[stateAttr: string]: AnyObject | undefined
}
export interface ActionType {
	type: string,
	content: any
} 
export interface NamespacesDataType {
	[namespace: string]: {
		[dataRegistry: string]: any
	}
} 
export interface ReducerType {
	(state: NestedStateType, action: ActionType): NestedStateType
}
export type AppState = ReturnType<typeof reducers> | undefined

export type StateToPropsType = AnyObject & {
	ns: string,
	propsMapping: string[] | AnyObject,
	component?: React.ComponentType 
}
////////////////////////////////////////////////////


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

export function StateToProps(args: StateToPropsType) {

	let { ns, propsMapping, component: Component, ...props } = args

	function mapStateToProps(state: AppState) {
		let stateToProps: AnyObject = {}
		if (state && state[ns]) {
			const nestedState = state[ns]
			if (nestedState) {
				if (Array.isArray(propsMapping)) {
					propsMapping.forEach((propName) => {
						stateToProps[propName] = nestedState[propName]
					})
				} else if (typeof propsMapping === 'object') {
					for (const stateProp in propsMapping) {
						const componentProp = propsMapping[stateProp]
						stateToProps[componentProp] = nestedState[stateProp]
					}							
				}
			}
		}
		return stateToProps
	}

	if (Component) {		
		Component = connect(mapStateToProps)(Component)
		return <Component {...props}/>
	} else {
		return null
	}
}
