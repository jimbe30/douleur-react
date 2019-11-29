export default function Prescription(ordonnancePreconisee) {

  // L'ordonnance préconisée est reçue du backend et est un objet de la forme suivante :
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

  this.medicamentsPreconises = ordonnancePreconisee ? ordonnancePreconisee.medicamentsPreconises : []

  this.nbMedicaments = this.medicamentsPreconises.length

  this.getProduits = function(numMedicament) {
    if (this.medicamentsPreconises[numMedicament] && this.medicamentsPreconises[numMedicament].compatibilites) {
      return this.medicamentsPreconises[numMedicament].compatibilites.map(compatibilite => compatibilite.produit)
    }
    return null
  }

  this.getDesignationsProduits = function(numMedicament) {
    const produits = this.getProduits(numMedicament)
    if (produits) {
      return produits.map(produit => produit.designation)
    }
    return null
  }


}