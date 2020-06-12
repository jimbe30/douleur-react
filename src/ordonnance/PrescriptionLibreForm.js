import React, { Fragment } from "react";
import { Field } from "redux-form";
import { Form, Message } from "semantic-ui-react";
import * as formAdapter from "../globals/redux/reduxFormAdapter"
import { Grid } from "@material-ui/core";
import { BoutonAjouter, BoutonSupprimer } from "../globals/util-components/Boutons";

export default function PrescriptionLibreForm({ numMedicaments, handleClickAjouter, handleClickSupprimer }) {
	return (
		<Fragment> {
			Array.isArray(numMedicaments) && numMedicaments.map((numMedicament, index) => {
				return (
					<Fragment key={index}>
						{(index === 0) ?
							<Message info>Vous pouvez saisir librement ci-dessous les médicaments à ajouter à votre prescription </Message> : ''
						}
						<LigneDispensation numMedicament={numMedicament} handleClickSupprimer={handleClickSupprimer} />
					</Fragment>
				)
			})}
			<div style={{ paddingTop: '1rem' }}>
				<BoutonAjouter title='Ajouter un médicament' handleClick={handleClickAjouter} />
			</div>
		</Fragment>
	)
}

const LigneDispensation = function ({ numMedicament, handleClickSupprimer }) {
	return (
		<Grid container spacing={1} >
			<Grid item xs={4}>
				<Field component={Form.Input} label='Désignation' name={'medicament' + numMedicament} placeholder='médicament' />
			</Grid>
			<Grid item xs={3}>
				<Field component={Form.Input} label='Dosage' name={'dosage' + numMedicament + 0} placeholder='dosage' />
			</Grid>
			<Grid item xs={3}>
				<Field component={Form.Input} label="Qté/prise" name={'quantite' + numMedicament} placeholder="Nb comprimés" />
			</Grid>
			<Grid item xs={3}>
				<Field component={formAdapter.FormSelect} label="Forme" name={'forme' + numMedicament} placeholder="Comprimé ..."
					options={[
						{ key: "forme1", text: "Comprimé", value: "comprimé(s)" },
						{ key: "forme2", text: "Gélule", value: "gélule(s)" }
					]}
				/>
			</Grid>
			<Grid item xs={4}>
				<Field component={Form.Input} label="Fréquence" name={'frequence' + numMedicament} placeholder="Nb fois / jour" />
			</Grid>
			<Grid item xs={3}>
				<Field component={Form.Input} label="Durée" name={'duree' + numMedicament} placeholder="Nb jours" />
			</Grid>
			<Grid item xs={1}>
				<div style={{ marginLeft: '0.5rem', marginTop: '50%' }} >
					<BoutonSupprimer index={numMedicament} handleClick={handleClickSupprimer} title='Supprimer le médicament' />
				</div>
			</Grid>
		</Grid>
	)
}


