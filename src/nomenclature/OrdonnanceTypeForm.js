import React, { useState } from 'react'
import { Grid, Label, Divider, Message } from 'semantic-ui-react'
import Medicament from './MedicamentForm'
import { BoutonAjouter, BoutonSupprimer, BoutonAnnuler, BoutonValider } from '../globals/util-components/Boutons'
import { verifierOrdonnanceType } from './services/GestionNomenclatureService'
import { validerOrdonnanceType, ajouterOrdonnanceType } from './services/GestionNomenclatureActions'


export default function OrdonnanceType({ description, medicaments, mode, ...otherProps }) {

	medicaments = Array.isArray(medicaments) ? medicaments : []

	const [ordonnanceType, setOrdonnanceType] = useState({ description, medicaments })

	function supprimerMedicament(index) {
		setOrdonnanceType(
			ordonnanceType => {
				medicaments = [...ordonnanceType.medicaments]
				medicaments.splice(index, 1)
				const wOrdonnance = {...ordonnanceType, medicaments}
				wOrdonnance.isOrdonnanceValide = verifierOrdonnanceType(wOrdonnance)
				return wOrdonnance
			}
		)
	}

	function ajouterMedicament() {
		setOrdonnanceType(
			ordonnanceType => {
				medicaments = [...ordonnanceType.medicaments, {}]
				const wOrdonnance = {...ordonnanceType, medicaments}
				wOrdonnance.isOrdonnanceValide = verifierOrdonnanceType(wOrdonnance)
				return wOrdonnance
			}
		)
	}

	function majMedicament(index) {
		return function (medicament) {
			setOrdonnanceType(
				ordonnanceType => {
					medicaments = [...ordonnanceType.medicaments]
					medicaments.splice(index, 1, medicament)
					const wOrdonnance = {...ordonnanceType, medicaments}
					wOrdonnance.isOrdonnanceValide = verifierOrdonnanceType(wOrdonnance)
					return wOrdonnance
				}
			)
		}
	}

	function valider() {		
		validerOrdonnanceType(ordonnanceType, otherProps)
		ajouterOrdonnanceType(ordonnanceType)
	}

	// fonctions de rendu
	const Entete = () => 
		<Grid.Row verticalAlign='middle'>
			<Grid.Column width={10} textAlign='center'>
				<h4>{mode} Ordonnance type</h4>
				{description &&
					<Label color='blue' size='large' basic>{description}</Label>
				}
				<Message info>
				<strong>	{
					ordonnanceType.description ? 
						<span>{ordonnanceType.description}</span>
						:
						"Veuillez ajouter ci-dessous au moins un médicament pour valider l'ordonnance"
				}						
				</strong>
				</Message>
			</Grid.Column>
		</Grid.Row>

	const LignesMedicaments = () => {
		if (Array.isArray(ordonnanceType.medicaments) && ordonnanceType.medicaments.length >= 1) {
			return ordonnanceType.medicaments.map(
				(medicament, index) =>
					<Grid.Row key={index}>
						<Grid.Column textAlign='center' width='1' style={{ padding: 0 }}>
							<BoutonSupprimer
								title='Supprimer ce médicament'
								handleClick={() => supprimerMedicament(index)} />
						</Grid.Column>
						<Grid.Column width='15'>
							<Medicament {...medicament}
								numMedicament={index}
								majMedicament={majMedicament(index)}
							/>
							<Divider />
						</Grid.Column>
					</Grid.Row>
			)
		} else {
			ajouterMedicament()
			return ''
		}
	}

	const BoutonsActions = () => 
		<Grid.Row verticalAlign='middle'>
			<Grid.Column width={5} textAlign='left'>
				{ordonnanceType.isOrdonnanceValide &&
					<BoutonAjouter size='tiny' long title='Ajouter un médicament'
						handleClick={() => ajouterMedicament()} />
				}
			</Grid.Column>
			<Grid.Column width={11} textAlign='right'>
				{ordonnanceType.isOrdonnanceValide &&
					<BoutonValider size='tiny' primary long handleClick={valider} />
				}
				<BoutonAnnuler size='tiny' long handleClick={(e) => { e.preventDefault() }} />
			</Grid.Column>
		</Grid.Row>


	// rendu final
	return (
		<Grid >
			<Entete />
			<LignesMedicaments />
			<BoutonsActions />
		</Grid>
	)
}