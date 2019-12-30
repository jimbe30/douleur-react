import React from "react";
import { Field } from "redux-form";
import { Form, Message } from "semantic-ui-react";
import { Grid } from "@material-ui/core";

import * as formAdapter from "../redux/reduxFormAdapter";
import FormInput from "../utils-components/FormInput";
import { formNames } from "../redux/FormActions";

export default class OrdonnanceForm extends React.Component {	

  render() {

		const form = this.props[formNames.INFOS_PATIENT_FORM];

    return (
      <Form size='small' onSubmit={(event) => this.props.onSubmit(form, event)}>
        <Message info>Veuillez renseigner les informations du patient dans le formulaire ci-dessous</Message>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <FormInput form={form} label="Nom de famille" name='nomPatient' placeholder="Nom obligatoire" required />
          </Grid>
          <Grid item xs={3}>
            <FormInput form={form} label="Nom usuel" name='nomUsuPatient' placeholder="Facultatif" />
          </Grid>
          <Grid item xs={3}>
            <FormInput form={form} label="Prénom" name='prenomPatient' placeholder="Prénom" required />
          </Grid>
          <Grid item xs={3}>
						<FormInput form={form} name='dateNaissance' placeholder="jj/mm/aaaa" label="Date naissance" required />
          </Grid>
          <Grid item xs={4}>
            <FormInput form={form} label="N° immatriculation" name='insee' placeholder="n° sur 13 car" required />
          </Grid>
          <Grid item xs={6}>
            <div className='field'><label>Sexe</label></div>
            <Form.Group inline>
              <Field
                component={formAdapter.renderRadio}
                label="Masculin"
                className='field'
                name="sexe"
                radioValue='M'
              />
              <Field
                component={formAdapter.renderRadio}
                label="Féminin"
                className='field'
                name="sexe"
                radioValue='F'
              />
            </Form.Group>
          </Grid>
        </Grid>
        <p></p>
        <Form.Group inline>
          <Form.Button type='submit' primary>Délivrer cette ordonnance</Form.Button>
          <Form.Button type='reset'>Annuler</Form.Button>
        </Form.Group>
      </Form>
    )
  }

}