import React from 'react'
import { Button, Icon, Form, Grid, Label } from 'semantic-ui-react'
import * as formAdapter from '../redux/reduxFormAdapter';

import { Field } from 'redux-form';

export default function GestionNomenclature(props) {

	props = {
		...props,
		designation: 'produit test',
		uniteDosage: 'mg',
		listeDosages: [
			200, 400, 1000
		]
	}

	return <ProduitForm {...props} />
}


function ProduitForm({ medicament, listeProduits, numProduit, designation, uniteDosage, listeDosages }) {

	const { numMedicament, libellesMedicament} = { medicament }

	return (
		<React.Fragment key={numProduit}>			

			<Grid container spacing={1}>
				<Grid item xs={2} key={numProduit}>
					<Form.Input label='Désignation ' value={designation} name={'designation' + numMedicament + numProduit} placeholder='désignation' required />
				</Grid>
			</Grid>

			

			<Grid container spacing={1}>
				<Grid item xs={4}>
					<Form.Input label="Unité " name={'unite' + numMedicament + numProduit} value={uniteDosage} required />
				</Grid>
				<Grid item xs={4}>
					<Form.Select label="valeurs possibles " name={'dosage' + numMedicament}
						options={
							listeProduits
						}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}