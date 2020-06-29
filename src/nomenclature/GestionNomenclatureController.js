import React, { useEffect, useState } from 'react'
import Arborescence from './ArborescenceComponent';
import { dataTypes, setArborescence } from './services/GestionNomenclatureActions';
import { connect } from 'react-redux';
import AjoutNiveauNomenclature from './AjoutNiveauNomenclatureForm';

function GestionNomenclature(props) {

	const { nomenclatures, ...rest } = { ...props }

	useEffect(() => {
		if (!nomenclatures) {
			setArborescence()
		}
	}, [nomenclatures])

	///// Gestion de la modale pour ajout d'un niveau dans la branche /////

	const [dataModalBranche, setDataModalBranche] = useState({})
	const openModalBranche = (idBranche) => {
		setDataModalBranche({id: idBranche, isOpenModal: true}) 
	}
	const closeModalBranche = () => {
		setDataModalBranche({isOpenModal: false}) 
	}

	///// Définition des actions au niveau branche dans l'arborescence /////

	const actionsBranches = [{
			libelle: 'Ajouter une entrée',
			process: openModalBranche
		}, {
			libelle: 'ajouter un protocole',
			process: (id) => { console.log("ajout d'un protocole anti douleur à l'idDouleur " + id) },
			primary: true
		},
	]

	///// Définition des actions au niveau douleur dans l'arborescence /////

	const actionsDouleurs = [{
			libelle: 'modifier le protocole',
			process: (id) => { console.log("modification du protocole pour l'idDouleur " + id) }
		}
	]

	///// Rendu /////

	props = { nomenclatures, actionsBranches, actionsDouleurs, ...rest }

	return (
		<>
			<Arborescence {...props} />
			<AjoutNiveauNomenclature {...dataModalBranche} handleClose={closeModalBranche} />
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





