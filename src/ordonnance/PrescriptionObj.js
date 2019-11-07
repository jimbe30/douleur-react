export default function Prescription(ordonnance) {

  this.medicamentsPreconises = ordonnance ? ordonnance.medicamentsPreconises : []

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