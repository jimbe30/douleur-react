import React, { useEffect, useState } from 'react';
import { Header } from 'semantic-ui-react';
import { StateToProps, StateToPropsType } from '../globals/redux/store';
import Arborescence from './ArborescenceComponent';
import AjoutNiveauNomenclature from './NiveauNomenclatureModal';
import ProtocoleDouleur from './ProtocoleDouleurModal';
import { dataTypes, findProtocoleDouleur, modesAction, setArborescence } from './services/GestionNomenclatureService';
import { GestionNomenclatureProps } from './types/types-nomenclature';

///// Correspondance des propriétés avec le store redux /////
const reduxProps: StateToPropsType = {
	ns: 'nomenclature',
	propsMapping: {
		[dataTypes.ARBORESCENCE]: 'nomenclatures',
		[dataTypes.PROTOCOLE_DOULEUR]: dataTypes.PROTOCOLE_DOULEUR
	},
	component: GestionNomenclature
}

function GestionNomenclature(props: GestionNomenclatureProps) {

	let { nomenclatures, protocoleDouleur, ...rest } = { ...props }

	useEffect(() => {
		if (!nomenclatures) {
			setArborescence()
		}
	}, [nomenclatures])

	///// Gestion de la modale pour ajout d'un niveau dans la branche /////
	const [dataNiveauNomenclature, setDataNiveauNomenclature] = useState({})

	const openModalNiveauNomenclature = (idNomenclature: number) => {
		setDataNiveauNomenclature({ id: idNomenclature, isOpenModal: true })
	}

	const closeModalNiveauNomenclature = () => {
		setDataNiveauNomenclature({ isOpenModal: false })
	}

	///// Gestion de la modale pour saisie d'un protocole anti douleur /////
	const [dataProtocoleDouleur, setDataProtocoleDouleur] = useState({})

	const openModalProtocoleDouleur = (mode: string) => {
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
		process: (idNomenclature: number) => {
			protocoleDouleur = { idParent: idNomenclature }
			openModalProtocoleDouleur(modesAction.AJOUT)
		},
		primary: true
	}]

	///// Définition des actions au niveau douleur dans l'arborescence /////
	const actionsDouleurs = [{
		libelle: 'Modifier le protocole',
		process: (idProtocole: number) => {
			findProtocoleDouleur(idProtocole)
			openModalProtocoleDouleur(modesAction.MODIFICATION)
		}
	}]


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

export default function(props: GestionNomenclatureProps) {
	return <StateToProps {...reduxProps} {...props}	/>
}

