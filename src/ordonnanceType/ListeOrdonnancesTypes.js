import React from 'react'
import { Grid, GridRow, GridColumn, Message } from 'semantic-ui-react'
import { BoutonAjouter } from '../globals/util-components/Boutons'
import { modesAction } from '../nomenclature/services/GestionNomenclatureActions'


export default function ListeOrdonnancesTypes(
	{ ordonnancesTypes, selectOrdonnanceType, creerOrdonnance, mode, ...otherPrpos }) {

	const listeOrdonnancesTypes = Array.isArray(ordonnancesTypes) ? ordonnancesTypes : [{}]

	// fonction de gestion d'état
	function nouvelleOrdonnance() {
		if (creerOrdonnance) {
			creerOrdonnance()
		}
	}

	function choisirOrdonnanceType(ordonnanceType) {
		if (selectOrdonnanceType) {
			return () => selectOrdonnanceType(ordonnanceType)
		}
		return () => {}
	}

	const modeSelection = mode === modesAction.SELECTION
	const titre = 'Veuillez sélectionner une ordonnance type ci-dessous'
		+ (modeSelection !== true ? ' ou en créer une nouvelle' : '')

	// fonctions de rendu
	const Entete = () =>
		<Grid.Row verticalAlign='middle'>
			<Grid.Column width={10} textAlign='center'>
				<h4>{titre}</h4>
			</Grid.Column>
		</Grid.Row>

	const LignesOrdonnances = () => {
		return listeOrdonnancesTypes.map(
			(ordonnanceType, index) =>
				<GridRow key={index}>
					<GridColumn as='a' onClick={choisirOrdonnanceType(ordonnanceType) }>
						{ordonnanceType.description}
					</GridColumn>
				</GridRow>
		)
	}

	const BoutonsActions = () => {
		if (modeSelection !== true) {
			return (
				<Grid.Row verticalAlign='middle'>
					<Grid.Column width={5} textAlign='left'>
						<BoutonAjouter size='tiny' long title='Nouvelle ordonnance type'
							handleClick={nouvelleOrdonnance} />
					</Grid.Column>
				</Grid.Row>
			)
		}
		return null
	}


	// rendu
	return (
		<Grid padded>
			<Entete></Entete>
			<LignesOrdonnances></LignesOrdonnances>
			<BoutonsActions></BoutonsActions>
		</Grid>
	)
}