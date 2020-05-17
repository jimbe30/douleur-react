import React from 'react'

export default class ActiveItemHandler extends React.Component {

	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.state = {
			activeIndex: -1
		}
	}

	handleClick = (index) => {
		let currentActive = this.state.activeIndex
		if (currentActive === index) {
			currentActive = -1
		} else {
			currentActive = index
		}
		this.setState({ activeIndex: currentActive })
	}

	render() {
		const { render, componentList, ...otherProps } = this.props
		if (Array.isArray(componentList)) {
			return componentList.map((component, index) => {
				const isActive = index === this.state.activeIndex
				return render({ component, index, isActive, handleClick: this.handleClick, otherProps })
			})
		} else {
			const isActive = 0 === this.state.activeIndex
			return render({ component: componentList, index: 0, isActive, handleClick: this.handleClick, otherProps })
		}
	}
}