import dispatchData, { getState } from "./store";

export const formNames = {
	TEST_FORM: 'testForm',
	PRESCRIPTION_FORM: 'prescriptionForm',
	INFOS_PATIENT_FORM: 'infosPatient',
}

/**
 * action pour dispatcher les valeurs de formulaires
 */
export function setFormValues(formName, formValues) {
	dispatchData(formName, formValues);
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

/**
 * Reducer pour stocker les contenus des formulaires
 */
export default function formsReducer(appForms = {}, action) {
	if (action.type) {
		return { ...appForms, [action.type]: action.content }
	}
	return appForms
}

