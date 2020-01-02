import { generatePath } from "react-router";

import ArborescenceService from "../ordonnance/ArborescenceControler"
import FicheDouleurService from "../ordonnance/FicheDouleurControler"
import PrescriptionService from "../ordonnance/PrescriptionControler"
import OrdonnanceService from "../ordonnance/OrdonnanceControler";
import OrdonnanceConfirm from "../ordonnance/OrdonnanceConfirm";

const basePath = '/clientApp'

export const routes = {
    ARBORESCENCE: 'arborescence',
    FICHE_DOULEUR: 'ficheDouleur',
    FORMULAIRE_PRESCRIPTION: 'formulairePrescription',
    FORMULAIRE_ORDONNANCE: 'formulaireOrdonnance',
		CONFIRMATION_ORDONNANCE: 'confirmationOrdonnance',
    HISTORIQUE: 'historique',
    LIENS: 'liens',
}

export const routesConfig = [
    { key: routes.ARBORESCENCE, path: `${basePath}/douleurs`, component: ArborescenceService },
    { key: routes.FICHE_DOULEUR, path: `${basePath}/douleurs/:idDouleur`, component: FicheDouleurService },
    { key: routes.FORMULAIRE_PRESCRIPTION, path: `${basePath}/prescriptionForm`, component: PrescriptionService },
    { key: routes.FORMULAIRE_ORDONNANCE, path: `${basePath}/ordonnanceForm`, component: OrdonnanceService },
		{ key: routes.CONFIRMATION_ORDONNANCE, path: `${basePath}/ordonnanceConfirm`, component: OrdonnanceConfirm },
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