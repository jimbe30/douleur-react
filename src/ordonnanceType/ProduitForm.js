import React, { useContext } from 'react'
import { Grid, FormGroup } from 'semantic-ui-react'
import { useEffect } from 'react'

import FormInput from '../globals/util-components/FormInput'
import Helper from '../globals/util-components/Helper'
import { FormSelect } from '../globals/redux/reduxFormAdapter'
import { OrdonnanceTypeContext } from './SaisieOrdonnanceTypeController'


export default function ProduitForm({ produit, majProduit, numProduit, ...rest }) {

	// hook useContext()
	let { listeProduits, listeUnitesDosage } = useContext(OrdonnanceTypeContext)

	const produitsProposes = listeProduits.map(
		itemProduit => ({ value: itemProduit.id, text: itemProduit.designation })
	)
	const unitesDosage = listeUnitesDosage.map(
		unite => ({ value: unite, text: unite })
	)

	if (!produit) {
		produit = {}
	}
	if (!produit.uniteDosage) {
		produit.uniteDosage = 'mg'
	}

	const listeDosages = produit.listeDosages ? produit.listeDosages : []

	// hook useEffect() : focus sur le dosage en cours de saisie après chaque rendu
	useEffect(() => {
		if (produit.focus) {
			let input = document.querySelector(`input[name=${produit.focus}]`)
			produit.focus = null
			if (input) {
				input.focus()				
			}
		}
	}, [produit.focus]);

	function handleChangeData(attribut, data) {
		if (majProduit) {
			const { value } = data
			let designation = {}
			if (attribut === 'idProduit') {
				designation.designation = listeProduits.find(
					produitPropose => produitPropose.id === value
				)['designation']
			}
			majProduit({ ...produit, [attribut]: value, ...designation })
		}
	}

	function handleChangeDosage(input, index) {
		const dosage = input.value
		let nouvelleListeDosages = [...listeDosages]
		if (!dosage) {
			nouvelleListeDosages.splice(index, 1)
		} else {
			nouvelleListeDosages[index] = dosage
		}
		if (majProduit) {
			majProduit({ ...produit, listeDosages: nouvelleListeDosages, focus: input.name })
		}
	}

	function dosageError(index) {
		if (produit.errors['listeDosages[' + index + ']']) {
			return produit.errors['listeDosages[' + index + ']']
		}
		return null
	}

	// rendu
	return (
		<>
			<Grid verticalAlign='middle' padded>

				{/* 1ère ligne : la désignation du produit à choisir dans la liste 'produitsProposes' */}
				<Grid.Row >
					<Grid.Column width={10}>
						<FormSelect inline
							onChange={(e, data) => handleChangeData('idProduit', data)}
							label='Désignation'
							title='Choisissez un produit dans la liste proposée'
							name={'idProduit' + numProduit}
							options={produitsProposes}
							value={produit ? produit.idProduit : ''}
							placeholder='désignation'
							required />
					</Grid.Column>
				</Grid.Row>

				{/* 2ème ligne : les dosages avec choix de l'unité de dosage + valorisation des doses possibles */}
				<Grid.Row >
					<Grid.Column width={4}>
						<FormSelect inline required
							onChange={(e, data) => handleChangeData('uniteDosage', data)}
							label='Unité dosage'
							name={'uniteDosage' + numProduit}
							options={unitesDosage}
							value={produit.uniteDosage} />
					</Grid.Column>
					
					<Grid.Column width={3}>
						<Helper text='Dosages' helpText='renseigner les dosages possibles : 4 occurrences maxi' />
					</Grid.Column>												 
					
					<Grid.Column width={9}>
						<FormGroup widths={listeDosages.length + 1} unstackable>						
							{ listeDosages.map(
								(dosage, index) =>
									<FormInput placeholder='dosage'
										key={index}
										error={dosageError(index)}
										name={'dosage' + numProduit + '_' + index}
										value={dosage}
										onChange={(e) => handleChangeDosage(e.target, index)}
									/>
							)}
							{ listeDosages.length < 4 &&
								<FormInput placeholder='dosage'
									required={listeDosages.length === 0}
									name={'dosage' + numProduit + '_' + listeDosages.length}
									value=''
									onChange={(e) => handleChangeDosage(e.target, listeDosages.length)}
								/>
							}
						</FormGroup>
					</Grid.Column>


				</Grid.Row>

			</Grid>
		</>
	)
}