import React from 'react'
import { Popup, Icon } from 'semantic-ui-react'



export const BoutonAjouter = function ({ handleClick, title }) {
	return (
		<div style={{ padding: '1rem 0' }}>
			<Popup content={title} trigger={
				<Icon name='add' color='green'
					onClick={event => handleClick(event)} />
			} />
		</div>
	)
}

export const BoutonSupprimer = function ({ index, handleClick, title }) {
	return (
		<Popup content={title} trigger={
			<Icon name='delete' key={index} color='red'
				style={{ 'marginTop': '50%', 'marginLeft': '50%' }}
				onClick={event => handleClick(event, index)} />
		} />
	)
}

export const BoutonModifier = function ({ index, handleClick, title }) {
	return (
		<Popup content={title} trigger={
			<Icon name='edit' key={index}	color='orange'
				style={{ 'marginTop': '50%', 'marginLeft': '50%' }}
				onClick={event => handleClick(event, index)} />
		} />
	)
}