import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Message, Header, Divider, Label } from "semantic-ui-react";
import * as formAdapter from "../redux/reduxFormAdapter"
import Prescription from "./PrescriptionObj";
import { Grid } from "@material-ui/core";

class OrdonnanceForm extends React.Component {

  // On reçoit l'ordonnance en props. C'est un objet de la forme suivante :
  // ordonnance
  // 	.medicamentsPreconises[]
  // 		.description
  // 		.dureeMin
  // 		.dureeMax
  // 		.idDouleur
  // 		.numOrdonnance
  // 		.numMedicament
  // 		.compatibilites[]
  // 			.produit
  // 				.code
  // 				.designation
  // 				.id
  // 				.indesirable
  // 				.indication
  // 			.dosages
  // 			.formes

  constructor(props) {

    super(props)
    this.prescriptionChoisie = new Prescription(props.ordonnance)
    this.medicaments = this.prescriptionChoisie.medicamentsPreconises
    this.libellesMedicaments = this.medicaments.map(
      (medicament, numMedicament) => this.prescriptionChoisie.getDesignationsProduits(numMedicament).join(' + ')
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

  getRecapDosage(numMedicament) {
    const produits = this.prescriptionChoisie.getProduits(numMedicament)
    if (Array.isArray(produits)) {
      const dosagesProduit = produits.map(
        (produit, numProduit) => {
          const designationProduit = produit.designation
          const dosageProduit = this.props['dosage' + numMedicament + numProduit]
           return (dosageProduit ? designationProduit + ' ' + dosageProduit : '')
        }
      )
      return dosagesProduit.join(' + ')
    }
    return null
  }


  getRecapitulatif() {
    return (
      this.libellesMedicaments.map(
        (medicament, numMedicament) => (
          <div> {
            this.getRecapDosage(numMedicament)
            + (this.props['quantite' + numMedicament] && this.props['forme' + numMedicament] ?
              ', ' + this.props['quantite' + numMedicament] + ' ' + this.props['forme' + numMedicament] : '')
            + (this.props['frequence' + numMedicament] ? ', ' + this.props['frequence' + numMedicament] + ' fois par jour' : '')
            + (this.props['duree' + numMedicament] ? ' pendant ' + this.props['duree' + numMedicament] + ' jours' : '')
          } </div>
        )
      )
    )
  }

  render() {

    return (
      <Form size='small' onSubmit={this.props.handleSubmit}>

        <Message info>Veuillez renseigner la posologie dans le formulaire ci-dessous</Message>  {
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
          {this.getRecapitulatif()}
        </Message>

        <Field
          component={formAdapter.renderCheckbox}
          label="Je souhaite délivrer cette ordonnance"
          name="estOK"
        />

        <Form.Group inline>
          <Form.Button type='submit' primary>Valider</Form.Button>
          <Form.Button onClick={this.props.reset}>Annuler</Form.Button>
        </Form.Group>

      </Form>
    )
  }
}

export default reduxForm({
  form: "ordonnance"
})(OrdonnanceForm);
