import React from "react";
import { Form } from "semantic-ui-react";
import { Field } from "redux-form";

export const renderCheckbox = field => (
	<Form.Checkbox
		checked={!!field.input.value}
		name={field.input.name}
		label={field.label}
		onChange={(e, { checked }) => field.input.onChange(checked)}
	/>
);

export const renderRadio = field => (
	<Form.Radio
		checked={field.input.value === field.radioValue}
		label={field.label}
		name={field.input.name}
		onChange={(e, { checked }) => field.input.onChange(field.radioValue)}
	/>
);

export const FormSelect = fieldProps => {

	let input = fieldProps && fieldProps.input ? fieldProps.input : {}
	let handleChange = input.onChange ? {onChange: (event, data) => input.onChange(data.value)} : {}
	return (
		<Form.Select
			{...fieldProps}
			{...input}
			{...handleChange}
		/>
	)
}

export function ReduxSelect({ label, name, placeholder, options, defaultValue, ...otherProps }) {
	return (
		<Field component={FormSelect} label={label} name={name} placeholder={placeholder}
			options={options} defaultValue={defaultValue} {...otherProps}
		/>
	)
}

export const renderTextArea = field => (
	<Form.TextArea
		{...field.input}
		label={field.label}
		placeholder={field.placeholder}
	/>
);