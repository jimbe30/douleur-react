
export function verifierOrdonnanceType(ordonnanceType) {
	let valide = true
	let errors = {}
	if (!Array.isArray(ordonnanceType.medicaments) || ordonnanceType.medicaments.length === 0) {
		errors = { medicaments: "L'ordonnance doit comporter au moins 1 médicament" }
		valide = false
	} else {
		ordonnanceType.medicaments.forEach(
			medicament => {
				const isOK = verifierMedicament(medicament)
				valide = valide === true ? isOK : false
			}
		)
	}
	ordonnanceType.errors = errors
	return valide
}

export function verifierMedicament(medicament) {
	let valide = true
	let errors = {}
	if (!Array.isArray(medicament.formes) || medicament.formes.length === 0) {
		errors = { formes: "Le médicament doit être associé au moins à 1 forme médicamenteuse" }
		valide = false
	}
	if (!Array.isArray(medicament.produits) || medicament.produits.length === 0) {
		errors = { produits: "Le médicament doit comporter au moins 1 produit" }
		valide = false
	} else {
		medicament.produits.forEach(
			produit => {
				const isOK = verifierProduit(produit)
				valide = valide === true ? isOK : false
			}
		)
	}
	medicament.errors = errors
	return valide
}

export function verifierProduit(produit) {
	let valide = true
	let errors = {}
	if (!produit.idProduit) {
		errors = { ...errors, idProduit: 'La désignation du produit est obligatoire' }
		valide = false
	}
	if (!Array.isArray(produit.listeDosages) || produit.listeDosages.length === 0) {
		errors = { ...errors, listeDosages: 'Au moins un dosage est obligatoire (format numérique)' }
		valide = false
	} else {
		produit.listeDosages.forEach(
			(dosage, index) => {
				if (isNaN(dosage)) {
					const errorKey = 'listeDosages[' + index + ']'
					errors = { ...errors, [errorKey]: 'Le dosage doit être numérique' }
					valide = false
				}
			}
		)
	}
	produit.errors = errors
	return valide
}

export function descriptionOrdonnanceType(ordonnanceType) {
	if (Array.isArray(ordonnanceType.medicaments)) {
		ordonnanceType.description = ordonnanceType.medicaments.map(
			medicament => descriptionMedicament(medicament)
		).join(" ; ")
	}
	return ordonnanceType.description
}

export function descriptionMedicament(medicament) {
	if (Array.isArray(medicament.produits)) {
		medicament.description = medicament.produits.map(
			produit => descriptionProduit(produit)
		).join(" + ")
	}
	return medicament.description
}

export function descriptionProduit(produit) {
	let description = produit.designation
	if (Array.isArray(produit.listeDosages)) {
		description += " " + produit.listeDosages.join(" ou ") + " " + produit.uniteDosage
	}
	produit.description = description
	return produit.description
}

