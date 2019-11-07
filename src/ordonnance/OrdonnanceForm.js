import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Message, Header, Divider } from "semantic-ui-react";
import * as formAdapter from "../redux/reduxFormAdapter"
import Prescription from "./PrescriptionObj";

const OrdonnanceForm = props => {


  const {
    ordonnance,
    handleSubmit,
    reset,
    dosage,
    quantite,
    forme,
    frequence,
    duree,
    recommandations
  } = props;

  let prescriptionChoisie = new Prescription(ordonnance)


  const formulaireMedicament = (numMedicament) => {

    const medicament = prescriptionChoisie.getDesignationsProduits(numMedicament).join(' + ')

    return (

      <React.Fragment>

        <div style={{ padding: '1rem 0' }}><h5>{medicament}</h5></div>

        <Field
            component='input'
            name={'medicament' + numMedicament}
            type='hidden'
            index={numMedicament}
            value={medicament}
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
            name="quantite"
            placeholder="Nb comprimés"
            required
          />
          <Field
            component={formAdapter.renderSelect}
            label="Forme"
            name="forme"
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
            name="frequence"
            placeholder="Nb fois par jour"
            required
          />
          <Field
            component={Form.Input}
            label="Durée"
            name="duree"
            placeholder="Nb de jours"
            required
          />
        </Form.Group>
      </React.Fragment>
    )
  }


  return (

    <Form size='small' onSubmit={handleSubmit}>

      <Message info>Veuillez renseigner la posologie dans le formulaire ci-dessous</Message>

      {
        prescriptionChoisie && prescriptionChoisie.medicamentsPreconises.map(
          (medicament, numMedicament) => formulaireMedicament(numMedicament)
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

        {dosage && `Ibuprofène ${dosage} mg, `}
        {quantite && forme && `${quantite} ${forme} `}
        {frequence && `${frequence} fois par jour `}
        {duree && `pendant ${duree} jour(s) `}
        {recommandations && (
          <div className="infosBase">{recommandations}</div>
        )}
      </Message>

      <Field
        component={formAdapter.renderCheckbox}
        label="Je souhaite délivrer cette ordonnance"
        name="isAgreed"
      />

      <Form.Group inline>
        <Form.Button primary>Valider</Form.Button>
        <Form.Button onClick={reset}>Annuler</Form.Button>
      </Form.Group>
    </Form>

  );
};

export default reduxForm({
  form: "ordonnance"
})(OrdonnanceForm);
