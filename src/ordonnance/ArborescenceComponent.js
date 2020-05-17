import React from 'react'
import { Accordion, Button, Icon } from 'semantic-ui-react'
import "./Arborescence.css";
import TruncBox from '../globals/util-components/TruncBox';
import ActiveItemHandler from '../globals/hoc/ActiveItemHandler';


export default function Arborescence({ nomenclatures, ...otherProps }) {
	function renderBranche({ component, index, isActive, handleClick, otherProps }) {
		return (
			<Branche key={index} onClick={() => handleClick(index)} isActive={isActive}
				libelle={component.libelle}	nomenclaturesEnfants={component.nomenclaturesEnfants}	{...otherProps} />
		)
	}
	return <ActiveItemHandler render={renderBranche} componentList={nomenclatures} {...otherProps} />
}

function Branche({ libelle, nomenclaturesEnfants, isActive, onClick, ...otherProps })  {
	// Fonction de rendu de chaque nomenclature enfant :
	function renderNomenclatureEnfant({ component, index, isActive, handleClick, otherProps }) {
		if (component.nomenclaturesEnfants && component.nomenclaturesEnfants.length > 0) {
			// l'enfant a des enfants : on construit la branche de niveau inférieur
			return (
				<Branche key={index} onClick={() => handleClick(index)} isActive={isActive}
					libelle={component.libelle} nomenclaturesEnfants={component.nomenclaturesEnfants} {...otherProps} />
			)
		} else {
			// l'enfant n'a pas d'enfant: on construit la feuille correspondante
			return (
				<Feuille key={index} onClick={() => handleClick(index)} isActive={isActive}
					libelle={component.libelle} infosGenerales={component.infosGenerales} idDouleur={component.id} {...otherProps} />
			)
		}
	}
	const content = <ActiveItemHandler render={renderNomenclatureEnfant} componentList={nomenclaturesEnfants} {...otherProps} />
	return accordion({ title: libelle, content, isActive, onClick })
}


function Feuille ({ libelle, infosGenerales, idDouleur, handleClickDouleur, onClick, isActive }) {
	const buttonStyle = { float: 'right', maxWidth: '100%', marginTop: '-30px', marginBottom: '3px', marginRight: '2%' }
	function buildContent(data) {
		if (data) {
			return (
				<React.Fragment>
					<Button primary size='tiny' style={buttonStyle} onClick={() => handleClickDouleur(idDouleur)}>
						Faire l'ordonnance
          </Button>
					<TruncBox height='6rem' moreText='▼ ( voir plus ... )' lessText='▲ ( réduire ... )'>
						<pre className='infosBase'>{data}</pre>
					</TruncBox>
				</React.Fragment>
			)
		}
		return '';
	}
	const content = buildContent(infosGenerales)
	return accordion({ title: libelle, content, isActive, onClick })
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