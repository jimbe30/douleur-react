import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Message, Header, Divider, Label } from "semantic-ui-react";
import * as formAdapter from "../redux/reduxFormAdapter"
import Prescription from "./PrescriptionObj";

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

    this.state = {
      medicaments: this.getMedicaments()
    }
  }

  getMedicaments() {
    return this.prescriptionChoisie.medicamentsPreconises.map(
      (medicament, numMedicament) => this.prescriptionChoisie.getDesignationsProduits(numMedicament).join(' + ')
    )
  }

  formulaireMedicament(numMedicament) {

    return (

      <React.Fragment>

        <div style={{ padding: '1rem 0' }}><Label>{this.state.medicaments[numMedicament]}</Label></div>

        <input
          name={'medicament' + numMedicament}
          type='hidden'
          index={numMedicament}
          value={this.state.medicaments[numMedicament]}
        />

        <Form.Group>
          <Field
            component={Form.Input}
            label="Dosage"
            name={'dosage' + numMedicament}
            placeholder="Dosage en mg"
            required
          />
          <Field
            component={Form.Input}
            label="Quantité par prise"
            name={'quantite' + numMedicament}
            placeholder="Nb comprimés"
            required
          />
          <Field
            component={formAdapter.renderSelect}
            label="Forme"
            name={'forme' + numMedicament}
            placeholder="Comprimé, Gélule ..."
            options={[
              { key: "forme1", text: "Comprimé", value: "comprimé(s)" },
              { key: "forme2", text: "Gélule", value: "gélule(s)" }
            ]}
          />
        </Form.Group>
        <Form.Group>
          <Field
            component={Form.Input}
            label="Fréquence"
            name={'frequence' + numMedicament}
            placeholder="Nb fois par jour"
            required
          />
          <Field
            component={Form.Input}
            label="Durée"
            name={'duree' + numMedicament}
            placeholder="Nb de jours"
            required
          />
        </Form.Group>
      </React.Fragment>
    )
  }

  getRecapitulatif() {

    return (
      this.state.medicaments.map(
        (medicament, numMedicament) => (
          <div> {
            (this.props['dosage' + numMedicament] ? medicament + ' ' + this.props['dosage' + numMedicament] : '')
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
          placeholder="Effets indésirables à surveiller, cas d'arrêt du traitement, ..."
        />

        <Message>
          <Divider horizontal fitted><Header as='h5'>Récapitulatif</Header></Divider>
          {this.getRecapitulatif()}
        </Message>

        <Field
          component={formAdapter.renderCheckbox}
          label="Je souhaite délivrer cette ordonnance"
          name="isAgreed"
        />

        <Form.Group inline>
          <Form.Button primary>Valider</Form.Button>
          <Form.Button onClick={this.props.reset}>Annuler</Form.Button>
        </Form.Group>
      </Form>

    )
  }

}

export default reduxForm({
  form: "ordonnance"
})(OrdonnanceForm);
