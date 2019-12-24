import React from 'react'

export default class ActiveItemHandler extends React.Component {

	constructor(props) {
		super(props)
		this.handleItemClick = this.handleItemClick.bind(this)
		this.state = {
			activeIndex: -1
		}
	}

	handleItemClick = (index) => {
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
				return render({ handleItemClick: this.handleItemClick, ...this.state, component, index, otherProps })
			})
		} else {
			return render({ handleItemClick: this.handleItemClick, ...this.state, component: componentList, index: 0, otherProps })
		}
	}
}