import { generatePath } from "react-router";

import ArborescenceService from "../ordonnance/ArborescenceService"
import FicheDouleurService from "../ordonnance/FicheDouleurService"
import OrdonnanceService from "../ordonnance/OrdonnanceService"

export const apiURLs = {
    arborescenceDouleurs: '/douleurs/arborescence',
    ficheDouleur: idDouleur => '/douleurs/' + idDouleur,
}

const path = '/clientApp'

export const routes = {
    ARBORESCENCE: 'arborescence',
    FICHE_DOULEUR: 'ficheDouleur',
    FORMULAIRE_ORDONNANCE: 'formulaireOrdonnance',
    HISTORIQUE: 'historique',
    LIENS: 'liens',
}

export const routesConfig = [
    { key: routes.ARBORESCENCE, path: `${path}/douleurs`, component: ArborescenceService },
    { key: routes.FICHE_DOULEUR, path: `${path}/douleurs/:idDouleur`, component: FicheDouleurService },
    { key: routes.FORMULAIRE_ORDONNANCE, path: `${path}/ordonnanceForm`, component: OrdonnanceService },
]

export const getRoutePath = (route, params) => (
    generatePath(
        routesConfig.filter(element => element.key === route).map(config => config.path).join(),
        params
    )
)

export const goToRoute = history => (
    (route, params) => history.push(getRoutePath(route, params))
)