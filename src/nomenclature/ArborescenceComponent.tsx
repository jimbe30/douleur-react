import React, { CSSProperties } from 'react'
import { Accordion, Button, Icon } from 'semantic-ui-react'
import ActiveItemHandler, { ItemRenderProps } from '../globals/hoc/ActiveItemHandler'
import TruncBox from '../globals/util-components/TruncBox'
import { AccordionProps, ArborescenceProps, BoutonsActionsProps, INomenclature, NomenclatureProps } from './types/types-nomenclature'

const buttonStyle: CSSProperties = {
	marginRight: 0,
	marginLeft: '.2rem',
	padding: '0.5rem'
}

const buttonGroupStyle: CSSProperties = {
	float: 'right',
	marginTop: '-2.4rem'
}

/**
 * Rendu de la nomenclature selon son type :
 * - si type 'niveau'    => Branche
 * - si type 'protocole' => Feuille
 */
function renderNomenclature(props: ItemRenderProps<INomenclature>) {

	const { component: nomenclature, index: key, isActive, handleClick, ...otherProps } = props	
	const args = { nomenclature, key, isActive, onClick: () => handleClick(key), ...otherProps }
	
	if (nomenclature) {		
		if (!nomenclature.type) {
			nomenclature.type = nomenclature.infosGenerales ? 'protocole' : 'niveau'
		}
		if (nomenclature.type === 'niveau') {
			return Branche(args)
		} else if (nomenclature.type === 'protocole') {
			return Feuille(args)
		}
	}
	return null
}

/**
 * Rendu des boutons d'action soit au niveau branche soit au niveau feuille
 */
function BoutonsActions(props: BoutonsActionsProps) {
	const { actions, id } = props
	return (
		<> {
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
		} </>
	)
}

export default function Arborescence(props: ArborescenceProps) {
	const { nomenclatures, ...otherProps } = props
	if (nomenclatures) {
		return (
			<ActiveItemHandler
				key={0}
				render={(props) => renderNomenclature({ ...props, ...otherProps })}
				componentList={nomenclatures}
			/>
		)
	}
	return null
}

function Branche(props: NomenclatureProps) {
	const { nomenclature, onClick, isActive, actionsBranches, ...otherProps } = props
	if (nomenclature) {
		const content = (
			<>
				<BoutonsActions actions={actionsBranches} id={nomenclature.id} />
				<ActiveItemHandler 
					key={nomenclature.id} 
					render={(props: ItemRenderProps<INomenclature>) => renderNomenclature({ ...props, actionsBranches, ...otherProps })}
					componentList={nomenclature.nomenclaturesEnfants} 
				/>
			</>
		)
		return accordion({ title: nomenclature.libelle, content, isActive, onClick })
	}
	return null
}

function Feuille(props: NomenclatureProps) {
	const { nomenclature, onClick, isActive, actionsBranches, actionsDouleurs } = props
	if (nomenclature) {
		const actions = nomenclature.type === 'protocole' ? actionsDouleurs : actionsBranches
		const content = (
			<>
				<BoutonsActions actions={actions} id={nomenclature.id} />
				{
					nomenclature.infosGenerales &&
					<TruncBox height='6rem' moreText='▼ ( voir plus ... )' lessText='▲ ( réduire ... )'>
						<pre className='infosBase'>{nomenclature.infosGenerales}</pre>
					</TruncBox>
				}
			</>
		)
		return accordion({ title: nomenclature.libelle, content, isActive, onClick })
	}
	return null
}

function accordion(props: AccordionProps) {
	const { title, content, isActive, onClick } = props
	return (
		<>
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