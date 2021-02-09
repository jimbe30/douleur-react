import { generatePath } from "react-router";
import { History } from "history";

import Arborescence from "../../ordonnance/ArborescenceController"
import FicheDouleur from "../../ordonnance/FicheDouleurController"
import Prescription from "../../ordonnance/PrescriptionController"
import Ordonnance from "../../ordonnance/OrdonnanceController"
import OrdonnanceConfirm from "../../ordonnance/OrdonnanceConfirm"
import GestionNomenclature from "../../nomenclature/GestionNomenclatureController"
import OrdonnancesTypes from "../../ordonnanceType/OrdonnancesTypesController"
import LoginController from "../../auth/LoginController"
import UserInfos from "../../auth/UserInfos"
import Test from "../../Test"
import SaisieOrdonnanceType from "../../ordonnanceType/SaisieOrdonnanceTypeController";
import { ReactElement } from "react";

///////////////      TYPES       ///////////////////
interface RoutesConfig {
	[routeKey: string]: {
		key: string,
		path: string,
		component: ReactElement
	}
}

type Route = string | {
	path: string
}

interface PathParams {
	[param: string]: string | number | boolean
}
///////////////////////////////////////////////////////

export const basePath: string = '/clientApp'

export const routesConfig: RoutesConfig = {
	TEST: {
		key: 'test', path: getPath('/test'), component: Test },
	ARBORESCENCE: {
		key: 'arborescence', path: getPath('/douleurs'), component: Arborescence },
	FICHE_DOULEUR: {
		key: 'ficheDouleur', path: getPath('/douleurs/:idDouleur'), component: FicheDouleur	},
	FORMULAIRE_PRESCRIPTION: {
		key: 'formulairePrescription', path: getPath('/prescriptionForm'), component: Prescription },
	FORMULAIRE_ORDONNANCE: {
		key: 'formulaireOrdonnance', path: getPath('/ordonnanceForm'), component: Ordonnance },
	CONFIRMATION_ORDONNANCE: {
		key: 'confirmationOrdonnance', path: getPath('/ordonnanceConfirm'), component: OrdonnanceConfirm },
	GESTION_NOMENCLATURE: {
		key: 'gestionNomenclature', path: getPath('/gestionNomenclature'), component: GestionNomenclature },
	ORDONNANCES_TYPES: {
		key: 'ordonnancesTypes', path: getPath('/ordonnancesTypes'), component: OrdonnancesTypes },	
	SAISIE_ORDONNANCE_TYPE: {
		key: 'saisieOrdonnanceType', path: getPath('/saisieOrdonnanceType'), component: SaisieOrdonnanceType },	
	LOGIN_FORM: {
		key: 'loginForm', path: getPath('/login'), component: LoginController },
	LOGIN_IDP: {
		key: 'loginIdp', path: getPath('/login/:idProvider'), component: LoginController },
	VALIDATE_TOKEN: {
		key: 'validateToken', path: getPath('/token/validate'), component: UserInfos },
}


export function getPath(path: string): string {
	return basePath + path
}

export function getRoutePath(route?: Route, pathParams?: PathParams): string {
	let path: string;
	if (route) {
		path = typeof route == 'string' ? route : route.path;
		return generatePath(path, pathParams);
	}
	return '';
}

export function goToRoute(props?: any) {
	let history: History;

	if (props) {
		history = props.history;
		if (!history) {
			history = props
		}
		if (history) {
			return (route: Route, pathParams?: PathParams) => history.push(getRoutePath(route, pathParams))
		}
	}
	return () => {};	
}

export function getRouteParams(props?: {[attr: string]: any}) {
	let result: object = {};
	if (props && props.match && props.match.params) {
		 result = props.match.params;
	}
	return result;
}