import React from "react";
import { Field } from "redux-form";
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

  render() {

    return (
      <Form size='small' onSubmit={() => this.props.onSubmit(this.ordonnanceSaisie())}>

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

  getDosages(numMedicament) {
    const produits = this.prescriptionChoisie.getProduits(numMedicament)
    if (Array.isArray(produits)) {
      const dosagesProduit = produits.map(
        (produit, numProduit) => {
          return this.props['dosage' + numMedicament + numProduit]
        }
      )
      return dosagesProduit
    }
    return null
  }


  getRecapitulatif() {
    return (
      this.medicaments.map(
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


  ordonnanceSaisie() {

    const autresChamps = ['quantite', 'forme', 'frequence', 'duree']

    let ordonnance = {
      nbMedicaments: this.medicaments.length,
      medicaments: [],
      recommandations: this.props.recommandations
    }

    for (let numMedicament = 0; numMedicament < ordonnance.nbMedicaments; numMedicament++) {
      ordonnance.medicaments[numMedicament] = {
        medicament: this.libellesMedicaments[numMedicament],
        dosages: this.getDosages(numMedicament),
      }
      autresChamps.forEach(champ => {
        ordonnance.medicaments[numMedicament][champ] = this.props[champ + numMedicament]
      })
    }
    return ordonnance
  }

}

export default OrdonnanceForm;
