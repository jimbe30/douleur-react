import { useState } from 'react'
import { AnyObject } from '../../types/global-types'

///////////////           TYPES           ///////////////
export interface ItemRenderProps<T> extends AnyObject {
	component?: T, 
	index: number, 
	isActive: boolean, 
	handleClick: (index: number) => void
}

export interface ItemHandlerProps<T> {
	render: (arg: ItemRenderProps<T>) => any, 
	componentList?: T[] | T
}

///////////////

export default function ActiveItemHandler<T>(props: ItemHandlerProps<T>)  {

	const { render, componentList } = props
	const [activeIndex, setActiveIndex] = useState(-1)
	
	function handleClick(index: number) {
		if (activeIndex === index) {
			setActiveIndex(-1)
		} else {
			setActiveIndex(index)
		}
	}

	if (Array.isArray(componentList)) {
		return componentList.map((component, index) => {
			const isActive = index === activeIndex
			return render({ component, index, isActive, handleClick })
		})
	} else {
		const isActive = 0 === activeIndex
		return render({ component: componentList, index: 0, isActive, handleClick })
	}
}