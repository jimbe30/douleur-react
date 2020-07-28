import React, { useState,  } from 'react'
import { Modal, Button, Message } from 'semantic-ui-react';
import { majProtocoleDouleur } from './services/GestionNomenclatureActions';
import ProtocoleDouleurForm from './ProtocoleDouleurForm';

export default function ProtocoleDouleur(props) {

	let { id, isOpenModal, mode, handleClose, protocoleDouleur } = props

	if (!protocoleDouleur) {
		protocoleDouleur = {}
	}

	const [error, setError] = useState(null)

	const handleValider = () => {
		const retour = majProtocoleDouleur(protocoleDouleur)
		if (retour && retour.error) {
			setError(retour.error)
		} else {
			quitter()
		}
	}

	const quitter = () => {
		handleClose()
		setError(null)
	}

	if (id) {
		return (
			<>
				<Modal 
					size='tiny'
					open={isOpenModal}
					onClose={quitter}
				>
					<Modal.Header>{mode} d'un protocole anti douleur</Modal.Header>
					
					<Modal.Content> {
							error &&	<Message error content={error} />
						}
						<ProtocoleDouleurForm protocoleDouleur={protocoleDouleur} />
					</Modal.Content>
					
					<Modal.Actions>
						<Button
							onClick={handleValider}
							positive
						>
							Valider
						</Button>
						<Button 
							onClick={quitter} 
							negative
						>
							Annuler
            		</Button>
					</Modal.Actions>
					
				</Modal >
			</>
		)
	}

	return null
}
