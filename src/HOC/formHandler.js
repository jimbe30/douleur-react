import React from 'react'
import { connect } from "react-redux"
import { reduxForm } from "redux-form";
import { setFormValues } from '../redux/FormActions';

export default function handleForm(WrappedComponent, formName, reset) {

  const mapStateToProps = state => {
    let formValues = {} 
    if (!reset || reset !== true) {
      formValues = state.appForms && formName ? state.appForms[formName] : {}
    }
    return {
      initialValues: formValues,
      [formName] : state.form[formName] ? {...formValues, ...state.form[formName].values} : {...formValues},
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
      } else if (prevProps[formName] != this.props[formName]) {
        setFormValues(formName, this.props[formName])
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return connect(mapStateToProps)(reduxForm({ form: formName })(FormHandler))

}

