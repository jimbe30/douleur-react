import React from 'react'
import { Grid, GridRow, GridColumn, Header, Table, TableBody, TableRow, TableCell, Divider, Container, List } from 'semantic-ui-react'
import { BoutonAjouter, BoutonModifier, BoutonSupprimer } from '../globals/util-components/Boutons'
import Helper from '../globals/util-components/Helper'
import { modesAction } from '../nomenclature/services/GestionNomenclatureActions'


export default function ListeOrdonnancesTypes(
	{ ordonnancesTypes, selectOrdonnanceType, creerOrdonnance, mode, titre, ...otherPrpos }) {

	const listeOrdonnancesTypes = Array.isArray(ordonnancesTypes) ? ordonnancesTypes : [{}]

	if (!titre) {
		titre = 'Veuillez sélectionner ou ajouter une ordonnance type'
	}

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
		return () => { }
	}

	const modeSelection = mode === modesAction.SELECTION


	// fonctions de rendu

	const Entete = () => <Header>Liste ordonnances types</Header>

	const ListeOrdonnances = () =>
		<List bulleted>
			{
				listeOrdonnancesTypes.map(	(ordonnanceType, index) =>	
					<LigneOrdonnance ordonnanceType={ordonnanceType} key={index} />
				)
			} 
		</List>

	const LigneOrdonnance = ({ ordonnanceType }) =>
		<List.Item as='a' onClick={choisirOrdonnanceType(ordonnanceType)}>
			{ordonnanceType.description}
		</List.Item>

	const BoutonsActions = () => {
		if (modeSelection !== true) {
			return (
				<TableRow>
					<TableCell verticalAlign='middle'>
						<BoutonAjouter size='tiny' long title='Nouvelle'
							handleClick={nouvelleOrdonnance} />
					</TableCell>
				</TableRow>
			)
		}
		return null
	}

	// rendu final
	return (
		<>
			<Entete/>

			<Table>				
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>
							{titre}
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<TableBody>
					<TableRow>
						<TableCell verticalAlign='middle'>
							<ListeOrdonnances></ListeOrdonnances>
						</TableCell>
					</TableRow>

					<BoutonsActions></BoutonsActions>
				</TableBody>
			</Table>

		</>
	)
}