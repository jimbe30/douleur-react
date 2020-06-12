import React from 'react'
import { Popup, Icon, Button, Label } from 'semantic-ui-react'
import { blue, teal } from '@material-ui/core/colors'



export const BoutonAjouter = function ({ handleClick, title, ...others }) {
	title = title ? title : 'ajouter'
	const props = { handleClick, title, ...others }
	return <Bouton icon='add' color='teal' {...props} />

}

export const BoutonSupprimer = function ({ index, handleClick, title, ...others }) {
	title = title ? title : 'supprimer'
	const props = { index, handleClick, title, ...others }
	return <Bouton icon='delete' color='red' {...props} />
}

export const BoutonModifier = function ({ index, handleClick, title, ...others }) {
	title = title ? title : 'modifier'
	const props = { index, handleClick, title, ...others }
	return <Bouton icon='pencil alternate' {...props} />
}

export const BoutonValider = function ({ index, handleClick, title, ...others }) {
	title = title ? title : 'valider'
	const props = { index, handleClick, title, ...others }
	return <Bouton icon='check' color='green' {...props} />
}

export const BoutonAnnuler = function ({ index, handleClick, title, ...others }) {
	title = title ? title : 'annuler'
	const props = { index, handleClick, title, ...others }
	return <Bouton icon='undo' color='red' {...props} />
}


export const Bouton = function ({ index, handleClick, title, icon, color, long, ...others }) {

	index = index ? index : 0
	handleClick = handleClick ? handleClick : () => { }

	if (long !== true && icon && title) {
		return (
			<Popup content={title} trigger={
				<Label as='a' size='tiny'
					onClick={event => handleClick(event, index)} {...others}>
					<Icon name={icon} color={color ? color : blue} link style={{ marginRight: 0, marginLeft: 0}} />
				</Label >
			} />)
	} else {
		return (
			<Button size='tiny' compact icon labelPosition='left'
				onClick={event => handleClick(event, index)} {...others}>
				{icon &&
					<Icon name={icon} color={color ? color : teal} />
				}
				{title}
			</Button >)
	}

}



