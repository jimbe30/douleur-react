import dispatchData, { getState } from "./store";

export const formNames = {
	TEST_FORM: 'TEST_FORM',
	PRESCRIPTION_FORM: 'PRESCRIPTION_FORM',
	INFOS_PATIENT_FORM: 'infosPatient',
	CONFIG_ORDONNANCE_FORM: 'configOrdonnance'
}

/**
 * action pour dispatcher les valeurs de formulaires
 */
export function setFormValues(formName, formValues) {	
	dispatchData(formName, formValues);
}

export function setFormValue(formName, fieldName, value) {
	const formData = {...getFormValues(formName), [fieldName]: value}
	dispatchData(formName, formData)
}

export function resetForm(formName) {
	dispatchData(formName, null);
}

export function resetFormErrors(formName) {
	let stateForm = Object.assign({}, getState('appForms')[formName])
	let newState = {}
	const fields = Object.keys(stateForm)
	if (Array.isArray(fields)) {
		fields.filter(field => !field.startsWith('error.')).forEach(
			field => {
				newState = { ...newState, [field]: stateForm[field] }
			}
		)
	}
	dispatchData(formName, newState);
}

export function getFormValues(formName) {
	const formState = Object.assign({}, getState('appForms')[formName])
	return formState
}

export function setFormErrors(formName, errors) {
	let stateForm = Object.assign({}, getState('appForms')[formName])
	const fields = Object.keys(errors)
	if (Array.isArray(fields)) {
		fields.filter(
			field => field.startsWith(formName + ".") || !field.includes('.')
		).forEach(
			field => {
				stateForm = { ...stateForm, ['error.' + field.replace(formName + '.', '')]: errors[field] }
			}
		)
	}
	dispatchData(formName, stateForm);
}
