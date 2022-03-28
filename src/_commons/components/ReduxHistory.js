import React from 'react'
import dispatchData from '../../_redux/store'
import { useHistory } from 'react-router'

/**
 * Stocke l'objet `history` de react-router dans le store redux et le propage en tant que `prop` aux `children`
 * @param {*} props 
 * @returns 
 */
export default function ReduxHistory(props) {
	const { children, ...rest } = { ...props };
	const history = useHistory();
	dispatchData('history', history);
	if (children) {
		if (!Array.isArray(children)) {
			children = [children]
		}
		const renderChildren = children.map((child, index) => {
			const type = child.type
			const childProps = child.props
			return React.createElement(type, { history: history, key: index, ...childProps, ...rest });
		})
		return <>{renderChildren}</>
	} else {
		return null;
	}
}