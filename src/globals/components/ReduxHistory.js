import React from 'react'
import dispatchData from '../redux/store'
import { useHistory } from 'react-router'

export default function ReduxHistory(props) {

	const history = useHistory()
	dispatchData('history', history)

	return null

}