import React, { useState } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { useEffect } from 'react'
import FormInput from '../globals/util-components/FormInput'


export default function ProduitForm({ listeProduits, listeUnitesDosage, produit, 
		numMedicament, numProduit, changeDosage, ...rest }) {

	if (!produit) {
		produit = {}
	}
	if (!numProduit) {
		numProduit = 0
	}

	const cleProduit = numMedicament + '_' + numProduit

	const produitsProposes = listeProduits.map(
		itemProduit => ({
			value: itemProduit.id,
			text: itemProduit.designation,
		})
	)
	const unitesDosage = listeUnitesDosage.map(
		unite => ({
			value: unite,
			text: unite,
		})
	)

	const listeDosages = produit.listeDosages ? produit.listeDosages : []

	// hook useState()
	const [dosageEnCours, setDosageEnCours] = useState()

	function handleChangeDosage(input, index) {		
		const value = input.value
		changeDosage(value, index)
		setDosageEnCours(input.name) // on va redonner le focus à l'élément émetteur après le rendu grâce à useEffect
	}

	// hook useEffect (équivalent à componentDidMount et componentDidUpdate)
	useEffect(() => {
		// focus sur le dosage en cour de saisie après chaque rendu
		if (dosageEnCours) {
			document.querySelector(`input[name=${dosageEnCours}]`).focus();
			setDosageEnCours(undefined)
		}
	 }, [dosageEnCours]);

	// rendu
	return (
		<React.Fragment>

			<Grid verticalAlign='middle' padded='horizontally' container>

				{/* 1ère ligne : la désignation du produit à choisir dans la liste 'produitsProposes' */}
				<Grid.Row >
					<Grid.Column width={5}>
						<Form.Select inline
							label='Désignation'
							title='Choisissez un produit dans la liste proposée'
							name={`produit_${cleProduit}`}
							options={produitsProposes}
							defaultValue={produit.idProduit}
							placeholder='désignation' required />
					</Grid.Column>
				</Grid.Row>

				{/* 2ème ligne : les dosages avec choix de l'unité de dosage + valorisation des doses possibles */}
				<Grid.Row >	
					<Grid.Column width={4}>
						<Form.Select inline required
							label='Unité dosage'
							name={`uniteDosage_${cleProduit}`}
							options={unitesDosage}
							defaultValue={produit.uniteDosage ? produit.uniteDosage : 'mg'} />
					</Grid.Column>
					<Grid.Column width={2}>
						Dosages
					</Grid.Column>	
					{
						Array.isArray(listeDosages) && listeDosages.map(
							(dosage, index) =>
							<Grid.Column width={2}>
								<FormInput placeholder='dosage'
									name={`dosage_${cleProduit}_${index}`}
									value={dosage}
									onChange={(e) => handleChangeDosage(e.target, index)}
									form={rest.form}
								/>
							</Grid.Column>
						)						
					}
					<Grid.Column width={2}>
						<FormInput placeholder='dosage'
							required={listeDosages.length === 0}
							name={`dosage_${cleProduit}_${listeDosages.length}`}
							value=''
							onChange={(e) => handleChangeDosage(e.target, listeDosages.length)}
							form={rest.form}
						/>
					</Grid.Column>

				</Grid.Row>

			</Grid>
		</React.Fragment>
	)
}