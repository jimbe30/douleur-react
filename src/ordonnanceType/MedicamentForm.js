import React from 'react'
import { Table, TableBody, TableRow, TableCell, Grid, Label, FormField, FormSelect, FormDropdown, Dropdown } from 'semantic-ui-react'
import ProduitForm from './ProduitForm'
import { BoutonSupprimer, BoutonAjouter } from '../globals/util-components/Boutons'
import { verifierMedicament } from './services/OrdonnanceTypeService'

import Helper from '../globals/util-components/Helper'
import { getReferentielMedicaments } from './services/OrdonnanceTypeActions'


export default function Medicament({ produits, formes, numMedicament, majMedicament }) {

	// Attributs
	const medicament = { produits, formes }

	const { formesMedicamenteuses } = getReferentielMedicaments()

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

	function majFormes(value) {
		if (value && (!formes || formes.indexOf(value) < 0)) {
			majMedicament({ ...medicament, formes: value })
		}
	}

	// fonctions de rendu
	const Titre = () => {
		const helpText = 
			<>
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
		return <h5 style={{margin: 0}}>{titre}</h5>		
	}

	const Formes = () => {
		return (
			<Grid padded>
				<Grid.Row>				
					<Grid.Column width='12' style={{ paddingLeft: '0' }}>
						<FormSelect selection={false}
							multiple
							required
							inline
							placeholder='forme'
							label='Formes médicamenteuses'
							onChange={(e, {value}) => majFormes(value)}
							title='Choisissez une ou plusieurs formes dans la liste proposée'
							name={'formes' + numMedicament}
							options={formesMedicamenteuses.map((forme, index) =>
								{return { key: index, value: forme.libelle, text: forme.libelle }}
							)}
							value={formes ? formes : []}
						/>
					</Grid.Column>					
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