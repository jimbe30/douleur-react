import React from 'react'
import { Form, Table, TableBody, TableRow, TableCell, FormGroup, FormInput, Icon }  from "semantic-ui-react"
import Helper from '../globals/util-components/Helper'

/**
	 * Formulaire de saisie de la posologie recommandée pour un médicament
	 * @param {Object} medicament
	 */
export default function MedicamentPrescriptionForm({ medicament, majMedicamentPreconise }) {

	const inputStyle = { style: { width: '50px' } }
	const formGroupStyle = { style: { margin: 0 } }
	const arrowIconStyle = { style: { marginLeft: '.5rem' } }
	const tableStyle = { style: { marginTop: '1rem' } }

	function handleChangeData(input) {
		if (majMedicamentPreconise) {
			const { attribut, value } = { attribut: input.name, value: input.value }
			medicament = { ...medicament, [attribut]: value }
			majMedicamentPreconise(medicament)
		}
	}

	if (medicament) {
		return (
			<Form size='tiny'>
				<Table {...tableStyle}>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell colSpan={2}>
								{medicament.description}
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<TableBody>
						<TableRow>
							<TableCell verticalAlign='middle'>
								<Helper text='Durée' helpText=
									'Renseigner les durées minimum et maximum du traitement en nombre de jours'
								/>
							</TableCell>
							<TableCell verticalAlign='middle'>
								<FormGroup inline {...formGroupStyle}>
									<FormInput
										required
										placeholder='min'
										onChange={e => handleChangeData(e.target)}
										name={'dureeMin'}
										defaultValue={medicament.dureeMin}
										{...inputStyle}
									/> à
										<FormInput
										placeholder='max'
										onChange={e => handleChangeData(e.target)}
										name={'dureeMax'}
										defaultValue={medicament.dureeMax}
										{...inputStyle}
									/> jours
									</FormGroup>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell verticalAlign='middle'>
								<Helper text='Fréquence' helpText={
									'Renseigner les fréquences minimum et maximum en nombre de prises par jour ' +
									'+ précisions éventuelles (ex: matin, midi, soir)'}
								/>
							</TableCell>
							<TableCell verticalAlign='middle'>
								<FormGroup inline {...formGroupStyle}>
									<FormInput
										required
										placeholder='min'
										onChange={e => handleChangeData(e.target)}
										name={'frequenceMin'}
										defaultValue={medicament.frequenceMin}
										{...inputStyle}
									/> à
										<FormInput
										placeholder='max'
										onChange={e => handleChangeData(e.target)}
										name={'frequenceMax'}
										defaultValue={medicament.frequenceMax}
										{...inputStyle}
									/> fois / jour
										<Icon size='tiny' name='angle right' color='grey' {...arrowIconStyle} />
									<FormInput
										placeholder='précision'
										onChange={e => handleChangeData(e.target)}
										name={'frequencePrecision'}
										defaultValue={medicament.frequencePrecision}
									/>
								</FormGroup>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell verticalAlign='middle'>
								<Helper text='Quantité' helpText={
									'Renseigner les quantités minimum et maximum de médicaments par prise'}
								/>
							</TableCell>
							<TableCell verticalAlign='middle'>
								<FormGroup inline {...formGroupStyle}>
									<FormInput
										required
										placeholder='min'
										onChange={e => handleChangeData(e.target)}
										name={'quantiteMin'}
										defaultValue={medicament.quantiteMin}
										{...inputStyle}
									/> à
										<FormInput
										placeholder='max'
										onChange={e => handleChangeData(e.target)}
										name={'quantiteMax'}
										defaultValue={medicament.quantiteMax}
										{...inputStyle}
									/> médicaments par prise
									</FormGroup>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Form>

		)
	}
	return null
}