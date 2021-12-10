import React, { useState, useRef, useEffect } from 'react'
import { Modal, Button, Input, Message } from 'semantic-ui-react';
import { addNiveauNomenclature } from './services/GestionNomenclatureService';

export default function AjoutNiveauNomenclature(props) {

	const { id, isOpenModal, handleClose } = props

	const [libelle, setLibelle] = useState()
	const [error, setError] = useState(null)

	const inputRef = useRef(null)
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}		
	})

	const handleValider = () => {
		const retour = addNiveauNomenclature(id, libelle)
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
					className='modalNiveauNomenclature'
				>
					<Modal.Header>Saisissez un libellé pour cette nouvelle entrée dans la nomenclature</Modal.Header>
					<Modal.Content>
						{
							error &&	<Message error content={error} />
						}
						<Input onChange={(e, data) => setLibelle(data.value)} ref={inputRef}></Input>
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
