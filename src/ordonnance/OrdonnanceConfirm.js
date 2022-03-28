import React from 'react'
import { connect } from 'react-redux'
import { Message, Button, Icon } from 'semantic-ui-react'
import { ordonnanceNs, ordonnanceData } from "../_redux/conf";
import ComponentLoader from '../globals/util-components/ComponentLoader';

function mapStateToProps(state) {
	return {
		ordonnance: state[ordonnanceNs][ordonnanceData.ORDONNANCE_EMISE],
	}
}

function OrdonnanceConfirm({ ordonnance, ...others }) {
	return (
		<ComponentLoader loadedObject={ordonnance}>
			{ordonnance && ordonnance.fileURL ?
				<Message info>
					<p>Votre ordonnance a bien été enregistrée.</p>
					<p>Si elle ne s'affiche pas automatiquement, vous pouvez y accéder en cliquant le lien suivant</p>
					<a id='ordo' title='ordonnance émise' href={ordonnance.fileURL} target='_blank' rel='noopener noreferrer'>
						<Button primary icon labelPosition='left' size='small'>
							<Icon name='file outline' />
							Editer l'ordonnance
						</Button>
					</a>
				</Message>
				:
				<Message error>
					Un problème est survenu : l'ordonnance n'a pas pu être émise. Veuillez recommencer ultérieurement
				</Message>
			}
		</ComponentLoader>


	)
}

export default connect(mapStateToProps)(OrdonnanceConfirm)

