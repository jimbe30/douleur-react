import React, { Fragment } from 'react'
import { Message, Label, Divider, Header } from 'semantic-ui-react'

export default function FicheDouleurComponent(props) {

  const { prescriptions, clickOrdonnance } = props

  
  const nomenclatureDouleur = prescriptions && prescriptions.length > 0 ? prescriptions[0].nomenclatureDouleur : null  
  const douleur = nomenclatureDouleur ? {
    libelle: nomenclatureDouleur.libelle,
    infos: nomenclatureDouleur.infosGenerales,
    recommandations: nomenclatureDouleur.recommandations,
  } : {}  
  let nbPreco = prescriptions && prescriptions.length > 0 ? prescriptions.length : 0


  let messageInfo = nbPreco === 0 ?
    <Message warning>Aucune ordonnance n'est encore proposée pour cette douleur</Message> :
    <Message info>
      {`   ${nbPreco} ordonnance${nbPreco > 1 ? 's vous sont proposées' : ' vous est proposée'}      `}
      <br />Cliquez sur l'ordonnance de votre choix
    </Message>


  let messageRecommandation = douleur.recommandations && douleur.recommandations.length > 0 ?
    <Message warning className='infosBase'>
      <Divider horizontal fitted><Header as='h4'>Recommandations</Header></Divider>
      {douleur.recommandations}
    </Message> : ''


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
      {
        nbPreco > 0 && prescriptions.map(
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
      {messageRecommandation}
    </div>
  )
}

