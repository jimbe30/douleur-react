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
	marginTop: '-2.4rem'
}

/**
 * fonction de rendu des boutons d'action soit au niveau branche soit au niveau feuille
 */

const BoutonsActions = ({ actions, id }) => 
	<>	
	{
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

	if (nomenclatures) {
		function renderBranche({ component, index, isActive, handleClick }) {
			return (
				<>
					<Branche
						key={index}
						nomenclature={component}
						onClick={() => handleClick(index)}
						isActive={isActive}
						actionsBranches={actionsBranches}
						actionsDouleurs={actionsDouleurs}
						{...otherProps}>
					</Branche>
				</>
			)
		}
		return <ActiveItemHandler key={0} render={renderBranche} componentList={nomenclatures} />
	}
	return null
}

function Branche({ nomenclature, onClick, isActive, actionsBranches, actionsDouleurs, ...otherProps }) {

	if (nomenclature) {

		if (!nomenclature.type) {
			nomenclature.type = nomenclature.infosGenerales ? 'protocole' : 'niveau'
		}

		function renderNomenclatureEnfant({ component, index, isActive, handleClick }) {
			// Fonction de rendu de chaque nomenclature enfant :	

			if (component) {
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
							actionsBranches={actionsBranches}
							actionsDouleurs={actionsDouleurs}
							{...otherProps} />
					)
				}
			}
			return null
		}

		const content =
			<>
				<BoutonsActions actions={actionsBranches} id={nomenclature.id} />
				<ActiveItemHandler key={nomenclature.id} render={renderNomenclatureEnfant} componentList={nomenclature.nomenclaturesEnfants} />
			</>

		return accordion({ title: nomenclature.libelle, content, isActive, onClick })

	} else {
		return null
	}

}


function Feuille({ nomenclature, onClick, isActive, actionsBranches, actionsDouleurs }) {

	if (!nomenclature.type) {
		nomenclature.type = nomenclature.infosGenerales ? 'protocole' : 'niveau'
	}

	const actions = nomenclature.type === 'protocole' ? actionsDouleurs : actionsBranches

	const content =
		<>
			{ /** ArborescenceComponent.Feuille */}
			<BoutonsActions actions={actions} id={nomenclature.id} />
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
		<>
			{ /** ArborescenceComponent.accordion */}
			<Accordion styled className={'center' + (!isActive ? ' noborder' : '')}>
				<Accordion.Title active={isActive} index={0} onClick={onClick} >
					<Icon name='dropdown' />
					{title}
				</Accordion.Title>
				<Accordion.Content active={isActive}>{content}</Accordion.Content>
			</Accordion>
		</>
	)

}