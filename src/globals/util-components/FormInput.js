import React from 'react'
import { Field } from 'redux-form';
import { Form, Popup } from 'semantic-ui-react';


export default class FormInput extends React.Component {

	constructor(props) {
		super(props)
		this.inputRef = React.createRef()
		this.openPopup = this.openPopup.bind(this)
		this.closePopup = this.closePopup.bind(this)
		this.clickInput = this.clickInput.bind(this)
		this.checkError()

		this.state = {
			openPopup: true,
			indexDisplayError: 0,
		}
	}

	componentDidUpdate(prevProps) {
		this.checkError()
	}

	checkError() {
		if (this.props.form) {
			this.error = this.props.form['error.' + this.props.name]
			if (!this.error) {
				this.error = this.props.form[this.props.name + '.error']
			}
		}
		if (!this.error && this.props.error) {
			this.error = this.props.error
		}
		if (!this.error && this.props.errors) {
			this.error = this.props.errors[this.props.name]
		}
	}

	clickInput() {
		if (this.error) {
			this.setState({ indexDisplayError: this.state.indexDisplayError + 1 })
		}
	}

	openPopup() {
		this.setState({ openPopup: true })
	}

	closePopup() {
		if (this.state.indexDisplayError > 0) {
			this.setState({ openPopup: false })
		}
	}

	render() {

		const props = {
			...this.props,
			error: this.error !== undefined,
			name: this.props.name,
			onMouseOver: () => this.openPopup(),
			onMouseOut: () => this.closePopup(),
			onClick: () => this.clickInput(),
		}

		let input = props.value !== undefined ?
			<Form.Input {...props} /> : <Field component={Form.Input} {...props} />


		if (this.error) {
			input =
				<Popup open={this.state.openPopup} size='tiny' mouseLeaveDelay={500}
					hoverable on='hover' trigger={<span ref={this.inputRef}>{input}</span>}>
					<Popup.Content>
						<div className='error'>{this.error}</div>
					</Popup.Content>
				</Popup>
		}

		return input
	}
}
