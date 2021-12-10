import React, { useEffect, useState } from 'react'
import Arborescence from './ArborescenceComponent';
import { dataTypes, setArborescence, modesAction, findProtocoleDouleur } from './services/GestionNomenclatureService';
import { connect } from 'react-redux';
import AjoutNiveauNomenclature from './NiveauNomenclatureModal';
import ProtocoleDouleur from './ProtocoleDouleurModal';
import { Header } from 'semantic-ui-react';

function GestionNomenclature(props) {

	let { nomenclatures, protocoleDouleur, ...rest } = { ...props }

	useEffect(() => {
		if (!nomenclatures) {
			setArborescence()
		}
	}, [nomenclatures])


	///// Gestion de la modale pour ajout d'un niveau dans la branche /////

	const [dataNiveauNomenclature, setDataNiveauNomenclature] = useState({})

	const openModalNiveauNomenclature = (idNomenclature) => {
		setDataNiveauNomenclature({ id: idNomenclature, isOpenModal: true })
	}

	const closeModalNiveauNomenclature = () => {
		setDataNiveauNomenclature({ isOpenModal: false })
	}


	///// Gestion de la modale pour saisie d'un protocole anti douleur /////

	const [dataProtocoleDouleur, setDataProtocoleDouleur] = useState({})

	const openModalProtocoleDouleur = (mode) => {
		setDataProtocoleDouleur({ isOpenModal: true, mode })
	}

	const closeModalProtocoleDouleur = () => {
		setDataProtocoleDouleur({ isOpenModal: false })
	}


	///// Définition des actions au niveau branche dans l'arborescence /////

	const actionsBranches = [{
		libelle: 'Ajouter un niveau',
		process: openModalNiveauNomenclature
	}, {
		libelle: 'Ajouter un protocole',
		process: (idNomenclature) => {
			protocoleDouleur = { idParent: idNomenclature }
			openModalProtocoleDouleur(modesAction.AJOUT)
		},
		primary: true
	},
	]


	///// Définition des actions au niveau douleur dans l'arborescence /////

	const actionsDouleurs = [
		{
			libelle: 'Modifier le protocole',
			process: (idProtocole) => {
				findProtocoleDouleur(idProtocole)
				openModalProtocoleDouleur(modesAction.MODIFICATION)
			},
		}
	]


	///// Rendu /////

	props = { nomenclatures, actionsBranches, actionsDouleurs, ...rest }

	return (
		<>
			<Header>Gestion des nomenclatures douleur</Header>
			<Arborescence {...props} />
			<AjoutNiveauNomenclature {...dataNiveauNomenclature} handleClose={closeModalNiveauNomenclature} />
			<ProtocoleDouleur protocoleDouleur={protocoleDouleur} {...dataProtocoleDouleur} handleClose={closeModalProtocoleDouleur} />
		</>
	)
}


///// Connexion au store redux /////

const mapStateToProps = state => {
	let props = state.nomenclature ? {
		nomenclatures: state.nomenclature[dataTypes.ARBORESCENCE],
		protocoleDouleur: state.nomenclature[dataTypes.PROTOCOLE_DOULEUR],
	} : null
	return props
}
export default connect(mapStateToProps)(GestionNomenclature)