import dispatchData, { getState } from "../store";

/////////////////////////////////////////////////////////
interface FormValues {
	[fieldname: string]: FieldValue
}

type FieldValue = string | number | string[] | number[];


/////////////////////////////////////////////////////////

export const formNames = {
	TEST_FORM: 'TEST_FORM',
	PRESCRIPTION_FORM: 'PRESCRIPTION_FORM',
	INFOS_PATIENT_FORM: 'infosPatient',
	CONFIG_ORDONNANCE_FORM: 'configOrdonnance'
}

/**
 * action pour dispatcher les valeurs de formulaires
 */
export function setFormValues(formName: string, formValues: FormValues) {	
	dispatchData(formName, formValues);
}

export function setFormValue(formName: string, fieldName: string, value: FieldValue) {
	const formData = {...getFormValues(formName), [fieldName]: value}
	dispatchData(formName, formData)
}

export function resetForm(formName: string) {
	dispatchData(formName, null);
}

export function resetFormErrors(formName: string) {
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

export function getFormValues(formName: string) {
	const formState = Object.assign({}, getState('appForms')[formName])
	return formState
}

export function setFormErrors(formName: string, errors: FormValues) {
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
