import React, { Fragment } from 'react'
import { Message, Divider, Header, Button} from 'semantic-ui-react'
import { Grid } from "@material-ui/core";

/**
 * Si une prescription a été choisie on n'affiche que celle ci avec un message approprié
 * Sinon on affiche la liste des prescriptions proposées avec possibilité d'en choisir une par clic
 */
export default function FicheDouleurComponent(props) {

  const { prescriptions, prescriptionChoisie, clickOrdonnance } = props

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
        <Message info>Vous avez choisi l'ordonnance suivante</Message>
      )
    }
    return (
      nbPreco === 0 ?
        <Message warning>Aucune ordonnance n'est encore proposée pour cette douleur</Message> :
        <Message info>
          {` ${nbPreco} ordonnance${nbPreco > 1 ? 's vous sont proposées' : ' vous est proposée'} `}
          <br />Cliquez sur le bouton correspondant à l'ordonnance de votre choix
        </Message>
    )
  }
  messageInfo = messageInfo()

  let messageRecommandation = (
	 !prescriptionChoisie && douleur.recommandations && douleur.recommandations.length > 0 ?

      <Message warning className='infosBase'>
        <Header as='h4'>Remarques</Header>
        {douleur.recommandations}
		</Message> 

		: ''
  )

  const renderListePrescriptions = () => {
    if (prescriptionChoisie) {
      return (
        <Fragment>
          {renderPrescription(prescriptionChoisie)}
          <Divider />
        </Fragment>
      )
    } else if (nbPreco > 0) {
      return prescriptions.map(
        (prescription, index) => (
          <Fragment key={index}>
            {renderPrescription(prescription, index)}
            <Divider />
          </Fragment>
        )
      )
    }
  }

  const renderPrescription = (prescription, index) => {
    const formatTexte = description => {
      let lignes = description.split(' ; ')
      return lignes.map(
        ligne => (ligne + '\r\n')
      )
    }
    if (prescription.medicamentsPreconises.length > 0) {
      if (index !== undefined) {
        // const gridStyle = {width: 'auto', padding: '0.2rem 0.5rem'}
        return (
          <div className='infosBase'>
            <Grid container justify='flex-start' direction='row' alignItems='center' spacing={2} >
              <Grid item>
                <Button size='tiny' primary onClick={() => clickOrdonnance(index)}>
                  Ordonnance {index + 1}
                </Button>
              </Grid>
              <Grid item>   {
                prescription.medicamentsPreconises.map(
                  (preconisation, index) => <p key={index}>{formatTexte(preconisation.description)}</p>)}
              </Grid>
            </Grid>
          </div>
        )
      } else {
        return (
          <div className='infosBase'>   {
            prescription.medicamentsPreconises.map(
              (preconisation, index) => <p key={index}>{formatTexte(preconisation.description)}</p>)}
          </div>
        )
      }
    }
  }

  return (
    <div>
      <h3>{douleur.libelle}</h3>
      {messageInfo}
      {renderListePrescriptions()}
      {messageRecommandation}
    </div>  )

}