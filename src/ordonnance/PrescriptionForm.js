import React from "react";
import { Field } from "redux-form";
import { Form, Message, Header, Divider, Label } from "semantic-ui-react";
import * as formAdapter from "../redux/reduxFormAdapter"
import Prescription from "./PrescriptionObj";
import { Grid } from "@material-ui/core";

class PrescriptionForm extends React.Component {

  // On reçoit la prescription préconisée en props. Cet objet est utilisé pour construire la Prescription
  constructor(props) {

    super(props)
    this.prescriptionChoisie = new Prescription(props.prescription)
    this.recapPrescription = props.recapPrescription
    this.medicaments = this.prescriptionChoisie.medicamentsPreconises
    this.libellesMedicaments = this.medicaments.map(
      (medicament, numMedicament) => this.prescriptionChoisie.getDesignationsProduits(numMedicament).join(' + ')
    )
  }

  render() {

    return (
      <Form size='small' onSubmit={() => this.props.onSubmit(this.prescriptionSaisie())}>

        <Message info>Veuillez renseigner la posologie dans le formulaire ci-dessous</Message>

        {
          this.prescriptionChoisie && this.prescriptionChoisie.medicamentsPreconises.map(
            (medicament, numMedicament) => this.formulaireMedicament(numMedicament)
          )
        }

        <Field
          component={formAdapter.renderTextArea}
          label="Recommandations"
          name="recommandations"
          placeholder="Conseils, effets indésirables à surveiller, cas d'arrêt du traitement..."
        />

        <Message>
          <Divider horizontal fitted><Header as='h5'>Récapitulatif</Header></Divider>
          {this.recapPrescription(this.prescriptionSaisie())}
        </Message>

        <Form.Group inline>
          <Form.Button type='submit' primary>Valider</Form.Button>
          <Form.Button onClick={this.props.reset}>Annuler</Form.Button>
        </Form.Group>

      </Form>
    )
  }

  formulaireMedicament(numMedicament) {

    return (

      <React.Fragment>

        <div style={{ padding: '1rem 0' }}><Label>{this.libellesMedicaments[numMedicament]}</Label></div>

        <input
          name={'medicament' + numMedicament}
          type='hidden'
          index={numMedicament}
          value={this.libellesMedicaments[numMedicament]}
        />

        <Grid container spacing={1}>

          {this.prescriptionChoisie.getProduits(numMedicament).map((produit, numProduit) =>
            <Grid item xs={2}>
              <Field component={Form.Input} label={numProduit === 0 ? 'dosage' : ''} name={'dosage' + numMedicament + numProduit} placeholder={produit.designation} required />
            </Grid>
          )}

          <Grid item xs={4}>
            <Field component={Form.Input} label="Quantité / prise" name={'quantite' + numMedicament} placeholder="Nb comprimés" required />
          </Grid>
          <Grid item xs={4}>
            <Field component={formAdapter.renderSelect} label="Forme" name={'forme' + numMedicament} placeholder="Comprimé ..."
              options={[
                { key: "forme1", text: "Comprimé", value: "comprimé(s)" },
                { key: "forme2", text: "Gélule", value: "gélule(s)" }
              ]}
            />
          </Grid>
          <Grid item xs={6}>
            <Field component={Form.Input} label="Fréquence" name={'frequence' + numMedicament} placeholder="Nb fois par jour" required />
          </Grid>
          <Grid item xs={6}>
            <Field component={Form.Input} label="Durée" name={'duree' + numMedicament} placeholder="Nb de jours" required />
          </Grid>

        </Grid>

      </React.Fragment>
    )
  }

  prescriptionSaisie() {

    const dosagesProduits = (numMedicament) => {
      const produits = this.prescriptionChoisie.getProduits(numMedicament)
      if (Array.isArray(produits)) {
        const dosagesProduits = produits.map(
          (produit, numProduit) => {
            const dosage = this.props['dosage' + numMedicament + numProduit]
            return { designation: produit.designation, dosage }
          }
        )
        return dosagesProduits
      }
      return null
    }

    const autresChamps = ['quantite', 'forme', 'frequence', 'duree']

    let prescpription = {
      nbMedicaments: this.medicaments.length,
      medicaments: [],
      recommandations: this.props.recommandations
    }

    for (let numMedicament = 0; numMedicament < prescpription.nbMedicaments; numMedicament++) {
      prescpription.medicaments[numMedicament] = {
        libelle: this.libellesMedicaments[numMedicament], // concat(produits, ' + ' )
        produits: dosagesProduits(numMedicament),  // Array of {produit, dosage}
      }
      autresChamps.forEach(champ => {
        prescpription.medicaments[numMedicament][champ] = this.props[champ + numMedicament]
      })
    }

    return prescpription
  }

}

export default PrescriptionForm;