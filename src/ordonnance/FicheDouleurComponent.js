import React, { Fragment } from 'react'
import { Message, Label, Divider, Header } from 'semantic-ui-react'

export default function FicheDouleurComponent(props) {

  const { prescriptions, prescriptionChoisie, clickOrdonnance } = props

  /**
   * Si une prescription a été choisie on n'affiche que celle ci avec un message approprié
   * Sinon on affiche la liste des prescriptions proposées avec possibilité d'en choisir une par clic
   */

  let douleur = () => {
    let nomenclatureDouleur = null
    if (prescriptionChoisie) {
      nomenclatureDouleur = prescriptionChoisie.nomenclatureDouleur
    } else if (prescriptions && prescriptions.length > 0) {
      nomenclatureDouleur = prescriptions[0].nomenclatureDouleur
    }
    if (nomenclatureDouleur) {
      return {
        libelle: nomenclatureDouleur.libelle,
        infos: nomenclatureDouleur.infosGenerales,
        recommandations: nomenclatureDouleur.recommandations,
      }
    }
    return {}
  }
  douleur = douleur()

  let nbPreco = prescriptions && prescriptions.length > 0 ? prescriptions.length : 0


  let messageInfo = () => {
    if (prescriptionChoisie) {
      return (
        <Message info>Vous avez choisi l'ordonnance ci-dessous</Message>
      )
    }
    return (
      nbPreco === 0 ?
        <Message warning>Aucune ordonnance n'est encore proposée pour cette douleur</Message> :
        <Message info>
          {` ${nbPreco} ordonnance${nbPreco > 1 ? 's vous sont proposées' : ' vous est proposée'} `}
          <br />Cliquez sur l'ordonnance de votre choix
        </Message>
    )
  }
  messageInfo = messageInfo()


  let messageRecommandation = (
    !prescriptionChoisie && douleur.recommandations && douleur.recommandations.length > 0 ?
      <Message warning className='infosBase'>
        <Divider horizontal fitted><Header as='h4'>Remarques</Header></Divider>
        {douleur.recommandations}
      </Message> : ''
  )

  const renderListePrescriptions = () => {

    if (prescriptionChoisie) {
      return (
        <Fragment>
          {renderPrescription(prescriptionChoisie)}
          <Divider />
        </Fragment>
      )
    }
    else if (nbPreco > 0) {
      return prescriptions.map(
        (prescription, index) => (
          <Fragment>
            <Label as='a' onClick={() => clickOrdonnance(index)}>
              Ordonnance {index + 1}
            </Label>
            {renderPrescription(prescription)}
            <Divider />
          </Fragment>
        )
      )
    }
  }



  const renderPrescription = (prescription) => {
    const formatTexte = description => {
      let lignes = description.split(' ; ')
      return lignes.map(
        ligne => (ligne + '\r\n')
      )
    }
    if (prescription.medicamentsPreconises.length > 0) {
      return (
        <div className='infosBase'> {
          prescription.medicamentsPreconises.map(
            preconisation => <p>{formatTexte(preconisation.description)}</p>
          )
        }</div>)
    }
  }

  return (
    <div>
      <h3>{douleur.libelle}</h3>
      {messageInfo}         
      {renderListePrescriptions()}
      {messageRecommandation}   
    </div>
  )
}

