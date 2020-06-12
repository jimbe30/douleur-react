import React from 'react'
import { Grid, GridRow, GridColumn, Message } from 'semantic-ui-react'
import { BoutonAjouter } from '../globals/util-components/Boutons'


export default function ListeOrdonnancesTypes({ ordonnancesTypes, creerOrdonnance, ...otherPrpos }) {

	const listeOrdonnancesTypes = Array.isArray(ordonnancesTypes) ? ordonnancesTypes : [{}]

	// fonction de gestion d'état
	function nouvelleOrdonnance() {
		if (creerOrdonnance) {
			creerOrdonnance()
		}
	}

	// fonctions de rendu
	const Entete = () =>
		<Grid.Row verticalAlign='middle'>
			<Grid.Column width={10} textAlign='center'>
				<h4>Liste des ordonnances types</h4>
				<Message info>
					<strong>
						Veuillez sélectionner une ordonnance type ci-dessous ou en créer une nouvelle
				</strong>
				</Message>
			</Grid.Column>
		</Grid.Row>

	const LignesOrdonnances = () => {
		return listeOrdonnancesTypes.map(
			(ordonnanceType, index) =>
				<GridRow key={index}>
					<GridColumn>
						{ordonnanceType.description}
					</GridColumn>
				</GridRow>
		)
	}

	const BoutonsActions = () =>
		<Grid.Row verticalAlign='middle'>
			<Grid.Column width={5} textAlign='left'>
				<BoutonAjouter size='tiny' long title='Nouvelle ordonnance type'
					handleClick={nouvelleOrdonnance} />
			</Grid.Column>
		</Grid.Row>


	// rendu
	return (
		<Grid padded>
			<Entete></Entete>
			<LignesOrdonnances></LignesOrdonnances>
			<BoutonsActions></BoutonsActions>
		</Grid>
	)
}