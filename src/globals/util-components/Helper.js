import React from 'react'
import { Popup, Icon } from 'semantic-ui-react'


export default function Helper({ text, helpText, type, ...otherProps }) {

	let name = 'question', color = 'blue'

	switch (type) {
		case 'info' : name='info'; break
		case 'warning' : name='exclamation'; color='yellow'; break
		case 'error' : name='bolt'; color='red'; break
		default : 
	}

	if (text) {
		name += ' circle'
	}

	return (
		<>
			<span style={{ verticalAlign: 'middle' }}>
				{text}
			</span>
			<Popup size='small' mouseLeaveDelay={200} hoverable on='hover' trigger={
				<Icon name={name} color={color} 
					style={{ marginLeft: '0.7rem', marginBottom: '0.5rem' }} 
					{...otherProps}
				/>
			}>
				<Popup.Content >{helpText}</Popup.Content>
			</Popup>
		</>
	)
}