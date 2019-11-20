import { generatePath } from "react-router";

import ArborescenceService from "../ordonnance/ArborescenceService"
import FicheDouleurService from "../ordonnance/FicheDouleurService"
import PrescriptionService from "../ordonnance/PrescriptionService"

export const apiURLs = {
    arborescenceDouleurs: '/douleurs/arborescence',
    ficheDouleur: idDouleur => '/douleurs/' + idDouleur,
}

const basePath = '/clientApp'

export const routes = {
    ARBORESCENCE: 'arborescence',
    FICHE_DOULEUR: 'ficheDouleur',
    FORMULAIRE_ORDONNANCE: 'formulaireOrdonnance',
    HISTORIQUE: 'historique',
    LIENS: 'liens',
}

export const routesConfig = [
    { key: routes.ARBORESCENCE, path: `${basePath}/douleurs`, component: ArborescenceService },
    { key: routes.FICHE_DOULEUR, path: `${basePath}/douleurs/:idDouleur`, component: FicheDouleurService },
    { key: routes.FORMULAIRE_ORDONNANCE, path: `${basePath}/ordonnanceForm`, component: PrescriptionService },
]

export const getRoutePath = (route, pathParams) => (
    generatePath(routesConfig.filter(element => element.key === route)
        .map(config => config.path).join(), pathParams)
)

export const goToRoute = props => {
    let { history } = props 
    if (!history) {
        history = props
    }
    return (route, pathParams) => history.push(getRoutePath(route, pathParams))
}