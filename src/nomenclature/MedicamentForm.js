import React, { useContext } from 'react'
import { Table, TableBody, TableRow, TableCell, Grid, Label, FormField } from 'semantic-ui-react'
import ProduitForm from './ProduitForm'
import { BoutonSupprimer, BoutonAjouter } from '../globals/util-components/Boutons'
import { verifierMedicament } from './services/GestionNomenclatureService'

import Helper from '../globals/util-components/Helper'
import { OrdonnanceTypeContext } from './SaisieOrdonnanceTypeController'


export default function Medicament({ produits, formes, numMedicament, majMedicament }) {

	// Attributs
	const medicament = { produits, formes }

	const { formesMedicamenteuses } = useContext(OrdonnanceTypeContext)
	const formesProposees = formesMedicamenteuses.map(
		item => ({ value: item, text: item })
	)
	const isMedicamentOK = verifierMedicament(medicament)

	// Fonctions de gestion d'état	
	function supprimerProduit(index) {
		if (majMedicament) {
			let nouveauxProduits = [...produits]
			nouveauxProduits.splice(index, 1)
			majMedicament({ ...medicament, produits: nouveauxProduits })
		}
	}
	function ajouterProduit() {
		if (majMedicament) {
			let nouveauxProduits = produits ? [...produits, { idProduit: '' }] : [{ idProduit: '' }]
			majMedicament({ ...medicament, produits: nouveauxProduits })
		}
	}
	function majProduit(index) {
		return function (produit) {
			if (majMedicament) {
				let nouveauxProduits = [...produits]
				nouveauxProduits.splice(index, 1, produit)
				majMedicament({ ...medicament, produits: nouveauxProduits })
			}
		}
	}
	function ajouterForme(value) {
		if (value && (!formes || formes.indexOf(value) < 0)) {
			majMedicament({ ...medicament, formes: formes ? [...formes, value] : [value] })
		}
	}
	function supprimerForme(index) {
		let nouvellesFormes = [...formes]
		nouvellesFormes.splice(index, 1)
		majMedicament({ ...medicament, formes: nouvellesFormes })

	}

	// fonctions de rendu
	const Titre = () => {
		const helpText = <>
				<strong>Sont obligatoires les infos suivantes :</strong><br/>
				Au moins une forme médicamenteuse et un produit, avec pour chaque produit les dosages possibles
			</>
		let titre
		if (Array.isArray(produits)) {
			titre = produits.map(produit => produit.designation).join(' + ')
		}
		if (!titre) {
			titre = <Helper helpText={helpText} text="Ajout d'un médicament"/>
		} else if (!isMedicamentOK) {
			titre = <Helper helpText={helpText} type='warning' text={titre} />
		}
		return <h6>{titre}</h6>		
	}

	const Formes = () => {
		return (
			<Grid padded>
				<Grid.Row>				
					<Grid.Column width='6' style={{ paddingLeft: '0' }}>
						<FormField inline
							control='select'
							label='Formes médicamenteuses'
							onChange={e => ajouterForme(e.target.value)}
							style={{color:'#a0a0a0'}}
							name={'formes' + numMedicament}
							defaultValue=''
						>
							<option value='' disabled>- choisir -</option>
							{formesProposees.map((forme, index) =>
								<option key={index} value={forme.value}>{forme.text}</option>
							)}
						</FormField>
					</Grid.Column>					
				</Grid.Row>
				<Grid.Row> {
				Array.isArray(formes) && formes.length > 0 &&
					<Grid.Column width='16'>{
						formes.map(
							(forme, index) =>
								<Label key={index}>
									{forme} <BoutonSupprimer handleClick={e => supprimerForme(index)} />
								</Label>
						)}
					</Grid.Column>
				}
				</Grid.Row>
			</Grid>

		)
	}

	const DetailsProduits = () => {
		if (Array.isArray(produits) && produits.length >= 1) {
			return <Table >
				<TableBody >
					{produits.map(
						(produit, index) =>
							<TableRow key={index} >
								<TableCell>
									<ProduitForm produit={produit}
										numProduit={numMedicament + '_' + index}
										majProduit={majProduit(index)}
									/>
								</TableCell>
								<TableCell verticalAlign='middle'>
									<BoutonSupprimer size='tiny' handleClick={() => supprimerProduit(index)} title='Supprimer ce produit' />
								</TableCell>
							</TableRow>
					)}
				</TableBody>
			</Table>
		} else {
			ajouterProduit()
			return ''
		}
	}

	// rendu en retour
	return (
		<>
			<Titre />
			<Formes />	
			<DetailsProduits />
			{/* Bouton d'action : ajout d'un produit */}
			{isMedicamentOK &&
				<BoutonAjouter size='mini' long handleClick={() => ajouterProduit()} title='Ajouter un produit' />
			}
		</>
	)
}