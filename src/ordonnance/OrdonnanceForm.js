import React from "react";
import { Field } from "redux-form";
import { Form, Message } from "semantic-ui-react";
import { Grid } from "@material-ui/core";

import * as formAdapter from "../redux/reduxFormAdapter";

export default class OrdonnanceForm extends React.Component {

  render() {

    return (
      <Form size='small' onSubmit={this.props.onSubmit}>

        <Message info>Veuillez renseigner les informations du patient dans le formulaire ci-dessous</Message>

        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Field component={Form.Input} label="Nom de famille" name='nomPatient' placeholder="Nom obligatoire" required />
          </Grid>
          <Grid item xs={3}>
            <Field component={Form.Input} label="Nom usuel" name='nomUsuPatient' placeholder="Facultatif" />
          </Grid>
          <Grid item xs={3}>
            <Field component={Form.Input} label="Prénom" name='prenomPatient' placeholder="Prénom" required />
          </Grid>
          <Grid item xs={3}>
            <Field component={Form.Input} label="Date naissance" name='dateNaissance' placeholder="jj/mm/aaaa" required />
          </Grid>
          <Grid item xs={4}>
            <Field component={Form.Input} label="N° immatriculation" name='insee' placeholder="n° sur 13 car" required />
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
          <Form.Button type='submit' primary>Editer l'ordonnance</Form.Button>
          <Form.Button onClick={this.props.reset}>Annuler</Form.Button>
        </Form.Group>

      </Form>
    )
  }

}