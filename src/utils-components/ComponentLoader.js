import React from 'react'
import { Loader, Message } from 'semantic-ui-react'


export default class ComponentLoader extends React.Component {

	IN_PROGRESS=0
	FINISHED=1  

	constructor(props) {
		super(props)
		this.state = {
			progression: this.IN_PROGRESS
		}
	}
	
	error(errorMessage, props) {
		return this.errors([errorMessage])
	}

	errors(errorList, props) {
		if (Array.isArray(errorList)) {
			return <Message error {...props}>{
				errorList.map(
					(error, index) => {
						let key = index, message = error
						if (error.key) {
							key = error.key
						}
						if (error.message) {
							message = (error.key ? error.key + ': ' : index + '. ') + error.message
						}
						return <div key={key}>{message}</div>
					}
				)}
			</Message>
		}
	}

	componentDidMount() {
		this.timeout = setTimeout(() => {
				this.setState({ progression: this.FINISHED})
			}, this.props.timeout ? this.props.timeout: 30000);
	}

	componentWillUnmount() {
		clearTimeout(this.timeout)
	}

	render() {

		const { loadedObject, render, children, timeout, ...rest } = this.props
		const loader = <Loader active style={{ top: '30%' }}>Chargement en cours ... veuillez patienter</Loader>

		if (!loadedObject && this.state.progression === this.IN_PROGRESS) {			
			return loader
		} else if (loadedObject && loadedObject.error) {
			return this.error(loadedObject.error, rest)
		} else if (loadedObject && loadedObject.errors) {
			return this.errors(loadedObject.errors, rest)
		} else if (loadedObject && render) {
			return render
		} else if (loadedObject && children) {
			return children
		} else {
			return <Message error>Aucun résultat n'a été trouvé pour votre requête</Message>
		}
	}
}

