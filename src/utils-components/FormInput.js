import React from 'react'
import { Field } from 'redux-form';
import { Form, Popup } from 'semantic-ui-react';

export default class FormInput extends React.Component {


	constructor(props) {
		super(props);
		this.openPopup = this.openPopup.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.clickInput = this.clickInput.bind(this);
		this.state = {
			openPopup: true,
			indexDisplayError: 0,
		}
	}

	componentDidUpdate() {
		if (this.props.form) {
			this.error = this.props.form['error.' + this.props.name];
		}
	}

	clickInput() {
		if (this.error) {
			this.setState({ indexDisplayError: this.state.indexDisplayError + 1 });
		}
	}

	openPopup() {
		this.setState({ openPopup: true });
	}

	closePopup() {
		if (this.state.indexDisplayError > 0) {
			this.setState({ openPopup: false });
		}
	}

	render() {

		let input;

		input = (
			<div>
				<Field component={Form.Input}
					error={this.error !== undefined}
					name={this.props.name}
					onMouseOver={() => this.openPopup()}
					onMouseOut={() => this.closePopup()}
					onClick={() => this.clickInput()}
					{...this.props}
				/>
			</div>
		);

		if (this.error) {
			input =
				<Popup open={this.state.openPopup} trigger={input} size='tiny' mouseLeaveDelay={1000} hoverable on='hover'>
					<Popup.Content>
						<div className='error'>{this.error}</div>
					</Popup.Content>
				</Popup>
		}

		return input;
	}
}
