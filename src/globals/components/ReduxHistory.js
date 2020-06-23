import React from 'react'
import dispatchData from '../redux/store'
import { useHistory } from 'react-router'

export default function ReduxHistory(props) {

	const {children, ...rest} = {...props}

	const history = useHistory()
	dispatchData('history', history)

	if (children) {
		const type = children.type.WrappedComponent
		const childrenProps = children.props
		return React.createElement(type,  {history: history, ...childrenProps, ...rest})
	} else {
		return null
	}

}