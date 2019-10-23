/**
 * Ici on prends en compte l'état applicatif (le 'state' du 'store').
 * C'est la méthode connect() qui relie le store au composant et y injecte le 'state' 
 * en tant que props
 */
import { connect } from 'react-redux'
import { getArborescence, getPreconisations } from "./OrdonnanceActions";


const onClickLambda = (event, personne) => {
    event.preventDefault()
    rapprocher(personne)
}

const onClickProche = (event, personne) => {
    event.preventDefault()
    eloigner(personne)
}

const mapStateToProps = appState => ({
    lambdas: appState.personnes.lambdas,
    proches: appState.personnes.proches,
    onClickLambda,
    onClickProche
})

/**
 * La méthode connect() est alimentée avec la fonction "mapStateToProps" à laquelle
 * le state du store est passé en paramètre. Cette fonction mapStateToProps elle même 
 * renvoie un objet résultant du state et passé en props du composant
 */
export default connect(mapStateToProps)(Personnes)