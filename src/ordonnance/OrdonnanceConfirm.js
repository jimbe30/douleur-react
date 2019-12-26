import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'
import LoadComponent from "../components/LoadComponent";
import { dataTypes } from './OrdonnanceActions';

function mapStateToProps(state) {
	return {
		ordonnance: state.ordonnance[dataTypes.ORDONNANCE_EMISE],
	}
}

function OrdonnanceConfirm({ ordonnance, ...others }) {
	return (
		<LoadComponent loadedObject={ordonnance}>
			{ordonnance && ordonnance.fileURL ?
				<iframe title='ordonnance émise' src={ordonnance.fileURL} width="750" height="900">
				</iframe>
				:
				<Message error>
					Un problème est survenu : l'ordonnance n'a pas pu être émise. Veuillez recommencer ultérieurement
				</Message>
			}
		</LoadComponent>


	)
}

export default connect(mapStateToProps)(OrdonnanceConfirm)

