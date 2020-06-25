import React from 'react'
import { Accordion, Button, Icon } from 'semantic-ui-react'
import TruncBox from '../globals/util-components/TruncBox'
import ActiveItemHandler from '../globals/hoc/ActiveItemHandler'

const buttonStyle = {
	marginRight: 0,
	marginLeft: '.2rem',
	padding: '0.5rem'
}

const buttonGroupStyle = {
	float: 'right',
	marginTop: '-2.3rem'
}

const BoutonsActions = ({ actions, id }) =>
	<>	{
		Array.isArray(actions) &&
		<div style={buttonGroupStyle}> {
			actions.map(
				(action, index) =>
					<Button
						key={index}
						primary={action.primary === true}
						size='tiny'
						onClick={() => action.process(id)}
						style={buttonStyle}>
						{action.libelle}
					</Button>
			)}
		</div>
	}
	</>


export default function Arborescence({ nomenclatures, actionsBranches, actionsDouleurs, ...otherProps }) {
	function renderBranche({ component, index, isActive, handleClick }) {
		return (
			<>
				<Branche
					key={index}
					nomenclature = {component}
					onClick={() => handleClick(index)}
					isActive={isActive}
					actionsBranches={actionsBranches}
					actionsDouleurs={actionsDouleurs}
					{...otherProps}>
				</Branche>
			</>
		)
	}
	return <ActiveItemHandler render={renderBranche} componentList={nomenclatures} />
}

function Branche({ nomenclature, onClick, isActive, actionsBranches, actionsDouleurs, ...otherProps }) {

	function renderNomenclatureEnfant({ component, index, isActive, handleClick }) {
		// Fonction de rendu de chaque nomenclature enfant :	

		if (component.nomenclaturesEnfants && component.nomenclaturesEnfants.length > 0) {
			// l'enfant a des enfants : on construit la branche de niveau inférieur
			return (
				<Branche
					key={index}
					nomenclature={component}
					onClick={() => handleClick(index)}
					isActive={isActive}
					actionsBranches={actionsBranches}
					actionsDouleurs={actionsDouleurs}
					{...otherProps}>
				</Branche>
			)
		} else {
			// l'enfant n'a pas d'enfant: on construit la feuille correspondante
			return (
				<Feuille
					key={index}
					nomenclature={component}
					onClick={() => handleClick(index)}
					isActive={isActive}
					actionsDouleurs={actionsDouleurs}
					{...otherProps} />
			)
		}
	}

	const content =
		<>
			<BoutonsActions actions={actionsBranches} id={nomenclature.id} />
			<ActiveItemHandler render={renderNomenclatureEnfant} componentList={nomenclature.nomenclaturesEnfants} />
		</>

	return accordion({ title: nomenclature.libelle, content, isActive, onClick })
}


function Feuille({ nomenclature, onClick, isActive, actionsDouleurs }) {

	const content =
		<>
			<BoutonsActions actions={actionsDouleurs} id={nomenclature.id} />
			{
				nomenclature.infosGenerales &&
				<TruncBox height='6rem' moreText='▼ ( voir plus ... )' lessText='▲ ( réduire ... )'>
					<pre className='infosBase'>{nomenclature.infosGenerales}</pre>
				</TruncBox>
			}
		</>

	return accordion({ title: nomenclature.libelle, content, isActive, onClick })
}


function accordion({ title, content, isActive, onClick }) {

	return (
		<Accordion styled className={!isActive ? 'noborder' : ''}>
			<Accordion.Title active={isActive} index={0} onClick={onClick} >
				<Icon name='dropdown' />
				{title}
			</Accordion.Title>
			<Accordion.Content active={isActive}>{content}</Accordion.Content>
		</Accordion>
	)

}