import React from 'react'
import { connect } from "react-redux"
import { reduxForm } from "redux-form";
import { setFormValues } from '../redux/FormActions';

export default function FormHandler({ component, formName, reset, children, ...others }) {

	let WrappedComponent = component ? component : children;
	WrappedComponent = handleForm(WrappedComponent, formName, reset);
	return <WrappedComponent {...formName} {...others}> {children} </WrappedComponent>;
}

export function handleForm(WrappedComponent, formName, reset) {

	const mapStateToProps = state => {

		let savedValues
		let currentValues = {}

		if (!reset || reset !== true) {
			if (state.appForms && formName) {
				savedValues = state.appForms[formName]
			}
		}
		if (state.form[formName]) {
			currentValues = state.form[formName].values
		}
		if (savedValues) { 
			return {
				initialValues: savedValues,
				[formName]: {...savedValues, ...currentValues},
				...currentValues
			}
	 	} else {
			 return {
				[formName]: {...currentValues},
				...currentValues
			}
		}
	}

	class FormHandler extends React.Component {

		componentDidMount() {
			if (reset && reset === true) {
				setFormValues(formName, null)
			}
		}

		componentDidUpdate(prevProps) {
			if (reset && reset === true) {
				setFormValues(formName, null)
			} else if (JSON.stringify(prevProps[formName]) !== JSON.stringify(this.props[formName])) {
				setFormValues(formName, this.props[formName])
			}
		}

		render() {
			return <WrappedComponent {...this.props} />
		}
	}

	return connect(mapStateToProps)(reduxForm({ form: formName })(FormHandler))

}





