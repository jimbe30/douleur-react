import { generatePath } from "react-router";

import Arborescence from "../../ordonnance/ArborescenceController"
import FicheDouleur from "../../ordonnance/FicheDouleurController"
import Prescription from "../../ordonnance/PrescriptionController"
import Ordonnance from "../../ordonnance/OrdonnanceController"
import OrdonnanceConfirm from "../../ordonnance/OrdonnanceConfirm"
import GestionNomenclature from "../../nomenclature/GestionNomenclatureController"
import OrdonnancesTypes from "../../nomenclature/OrdonnancesTypesController"
import LoginController from "../../auth/LoginController"
import UserInfos from "../../auth/UserInfos"
import Test from "../../Test"

export const basePath = '/clientApp'

export const routesConfig = {
	TEST: {
		key: 'test', path: getPath('/test'), component: Test	},
	ARBORESCENCE: {
		key: 'arborescence', path: getPath('/douleurs'), component: Arborescence	},
	FICHE_DOULEUR: {
		key: 'ficheDouleur', path: getPath('/douleurs/:idDouleur'), component: FicheDouleur	},
	FORMULAIRE_PRESCRIPTION: {
		key: 'formulairePrescription', path: getPath('/prescriptionForm'), component: Prescription	},
	FORMULAIRE_ORDONNANCE: {
		key: 'formulaireOrdonnance', path: getPath('/ordonnanceForm'), component: Ordonnance	},
	CONFIRMATION_ORDONNANCE: {
		key: 'confirmationOrdonnance', path: getPath('/ordonnanceConfirm'), component: OrdonnanceConfirm },
	GESTION_NOMENCLATURE: {
		key: 'gestionNomenclature', path: getPath('/gestionNomenclature'), component: GestionNomenclature },
	ORDONNANCES_TYPES: {
		key: 'ordonnancesTypes', path: getPath('/ordonnancesTypes'), component: OrdonnancesTypes },	
	LOGIN_FORM: {
		key: 'loginForm', path: getPath('/login'), component: LoginController },
	LOGIN_IDP: {
		key: 'loginIdp', path: getPath('/login/:idProvider'), component: LoginController },
	VALIDATE_TOKEN: {
		key: 'validateToken', path: getPath('/token/validate'), component: UserInfos },
}


export function getPath(path) {
	return basePath + path
}

export const getRoutePath = (route, pathParams) => {
	const path = route && route.path ? route.path : route
	return generatePath(path, pathParams)
}

export const goToRoute = props => {
	let { history } = props
	if (!history) {
		history = props
	}
	return (route, pathParams) => history.push(getRoutePath(route, pathParams))
}

export const getRouteParams = props => {
	if (props && props.match) {
		 return props.match.params
	}
	return {}
}