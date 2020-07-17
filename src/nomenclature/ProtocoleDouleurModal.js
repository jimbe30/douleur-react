import React, { useState,  } from 'react'
import { Modal, Button, Message } from 'semantic-ui-react';
import { majProtocoleDouleur } from './services/GestionNomenclatureActions';
import ProtocoleDouleurForm from './ProtocoleDouleurForm';

export default function ProtocoleDouleur(props) {

	const { id, isOpenModal, mode, handleClose, } = props

	const [libelle, setLibelle] = useState()
	const [error, setError] = useState(null)

	const handleValider = () => {
		const retour = majProtocoleDouleur(id, libelle)
		if (retour && retour.error) {
			setError(retour.error)
		} else {
			quitter()
		}
	}

	const quitter = () => {
		handleClose()
		setError(null)
		setLibelle(null)
	}

	if (id) {
		return (
			<>
				< Modal size='tiny'
					open={isOpenModal}
					onClose={quitter}
				>
					<Modal.Header>{mode} d'un protocole anti douleur</Modal.Header>
					<Modal.Content>
						{
							error &&	<Message error content={error} />
						}

						<ProtocoleDouleurForm />
					</Modal.Content>
					<Modal.Actions>
						<Button
							onClick={handleValider}
							positive
						>
							Valider
					</Button>
						<Button onClick={quitter} negative>
							Annuler
            	</Button>
					</Modal.Actions>
				</Modal >
			</>
		)
	}

	return null
}
