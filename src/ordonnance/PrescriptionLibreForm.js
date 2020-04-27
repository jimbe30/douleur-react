import React, { Fragment } from "react";
import { Field } from "redux-form";
import { Form, Popup, Message, Icon } from "semantic-ui-react";
import * as formAdapter from "../redux/reduxFormAdapter"
import { Grid } from "@material-ui/core";

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
			<BoutonAjout handleClick={handleClickAjouter} />
		</Fragment>
	)
}

const BoutonAjout = function ({ handleClick }) {
	return (
		<div style={{ padding: '1rem 0' }}>
			<Popup content='Ajouter un médicament' trigger={
				<Icon name='add' size='tiny'
					bordered circular color='green'
					onClick={event => handleClick(event)} />
			} />
		</div>
	)
}

const BoutonSuppression = function ({ numMedicament, handleClick }) {
	return (
		<Popup content='Supprimer le médicament' trigger={
			<Icon name='delete' size='tiny' key={numMedicament}
				bordered circular color='red'
				style={{ 'marginTop': '50%', 'marginLeft': '50%' }}
				onClick={event => handleClick(event, numMedicament)} />
		} />
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
				<Field component={formAdapter.renderSelect} label="Forme" name={'forme' + numMedicament} placeholder="Comprimé ..."
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
			<Grid item xs={1}><BoutonSuppression numMedicament={numMedicament} handleClick={handleClickSupprimer} /></Grid>
		</Grid>
	)
}


