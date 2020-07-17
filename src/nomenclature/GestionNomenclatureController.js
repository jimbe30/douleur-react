import React, { useEffect, useState } from 'react'
import Arborescence from './ArborescenceComponent';
import { dataTypes, setArborescence, modesAction } from './services/GestionNomenclatureActions';
import { connect } from 'react-redux';
import AjoutNiveauNomenclature from './NiveauNomenclatureModal';
import ProtocoleDouleur from './ProtocoleDouleurModal';

function GestionNomenclature(props) {

	const { nomenclatures, ...rest } = { ...props }

	useEffect(() => {
		if (!nomenclatures) {
			setArborescence()
		}
	}, [nomenclatures])


	///// Gestion de la modale pour ajout d'un niveau dans la branche /////

	const [dataNiveauNomenclature, setDataNiveauNomenclature] = useState({})
	
	const openModalNiveauNomenclature = (idNomenclature) => {
		setDataNiveauNomenclature({id: idNomenclature, isOpenModal: true}) 
	}

	const closeModalNiveauNomenclature = () => {
		setDataNiveauNomenclature({isOpenModal: false}) 
	}


	///// Gestion de la modale pour saisie d'un protocole anti douleur /////

	const [dataProtocoleDouleur, setDataProtocoleDouleur] = useState({})

	const openModalProtocoleDouleur = (idNomenclature, mode) => {
		setDataProtocoleDouleur({id: idNomenclature, isOpenModal: true, mode}) 
	}

	const closeModalProtocoleDouleur = () => {
		setDataProtocoleDouleur({isOpenModal: false}) 
	}


	///// Définition des actions au niveau branche dans l'arborescence /////

	const actionsBranches = [{
			libelle: 'Ajouter un niveau',
			process: openModalNiveauNomenclature
		}, {
			libelle: 'Ajouter un protocole',
			process: (idNomenclature) => openModalProtocoleDouleur(idNomenclature, modesAction.AJOUT),
			primary: true
		},
	]


	///// Définition des actions au niveau douleur dans l'arborescence /////

	const actionsDouleurs = [{
			libelle: 'Modifier le protocole',
			process: (idNomenclature) =>  openModalProtocoleDouleur(idNomenclature, modesAction.MODIFICATION),
		}
	]


	///// Rendu /////

	props = { nomenclatures, actionsBranches, actionsDouleurs, ...rest }

	return (
		<>
			<Arborescence {...props} />
			<AjoutNiveauNomenclature {...dataNiveauNomenclature} handleClose={closeModalNiveauNomenclature} />
			<ProtocoleDouleur {...dataProtocoleDouleur} handleClose={closeModalProtocoleDouleur} />
		</>
	)
}


///// Connexion au store redux /////

const mapStateToProps = state => {
	let props = state.ordonnance ? {
		nomenclatures: state.nomenclature[dataTypes.ARBORESCENCE]
	} : {}
	return props
}
export default connect(mapStateToProps)(GestionNomenclature)





