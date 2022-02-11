import axios, {AxiosResponse, AxiosRequestConfig} from "axios";
import dispatchData, { store, getState } from "../redux/store";
import { authData } from "../../_conf/redux";
import { routesConfig, goToRoute } from "./routeService";
import { TypedMapObject } from "../../types/global-types";

//////////////////      TYPES      /////////////////////
interface ApiURLs {
	[apiKey: string]: string | ((...params: (string | number)[]) => string)
}

interface ApiResponse extends AxiosResponse {
	contentType?: string,
	type?: returnTypes
}

interface ApiError {
	message?: string,
	data?: ErrorData,
	response?: {
		data?: ErrorData
	} 
}

interface ErrorData {
	message?: string,
	error?: string,
	status?: number | string,
	[property: string]: any 
}

interface ErrorResult {
	data: ErrorData,
	type: string,
	contentType: string
}

enum returnTypes {
	OBJECT = 'object',
	TEXT = 'text',
	BLOB = 'blob'
}

//////////////////      CONFIG      /////////////////////

export const backendURL: string = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : ''

export const apiURLs: ApiURLs = {
	arborescenceDouleurs: backendURL + '/douleurs/arborescence',
	ficheDouleur: (idDouleur) => backendURL + '/douleurs/' + idDouleur,
	protocoleDouleur: (idDouleur) => backendURL + '/protocolesDouleurs/' + idDouleur,
	majProtocoleDouleur: backendURL + '/protocolesDouleurs',
	referentielMedicaments: backendURL + '/ordonnancesTypes/referentielMedicaments',
	listeOrdonnancesTypes: backendURL + '/ordonnancesTypes',
	majOrdonnanceType: backendURL + '/ordonnancesTypes',
	nouvelleOrdonnance: backendURL + '/ordonnances/nouvelle',
	ordonnanceEmise: (idOrdonnance) => backendURL + '/ordonnances/emises/' + idOrdonnance,
	idProvidersList: backendURL + '/users/login/infos',
	login: (idProvider) => backendURL + '/users/login/' + idProvider,	
	validateToken: backendURL + '/users/login/registerToken',
}

const textMimeTypes = [
	"application/javascript", "application/json", "application/xml",
	'application/xhtml+xml', 'application/typescript', 'application/x-sh',
]

const messagesFromStatus: TypedMapObject<string> = {
	401: "Votre session a expiré ou l'authentification a échoué, veuillez vous reconnecter",
	403: "Vous n'êtes pas autorisé à accéder à cette ressource, veuillez vous identifier"
}

///////////////////////////////////////////////////////


export const getResultFromUrl = async (url: string, config?: AxiosRequestConfig) => {
	let result = {}
	config = secureUrlConfig(config)
	try {
		await axios.get(url, config).then(response => {
			result = getResultFromResponse(response)
		})
	} catch (error) {
		result = getResultFromError(error as ApiError)
		handleError(result as ErrorResult)
	}
	return result
}

export const postObjectToUrl = async (object: any, url: string, config?: AxiosRequestConfig) => {
	let result = {}
	config = secureUrlConfig(config)
	try {
		await axios.post(url, object, config).then(response => {
			result = getResultFromResponse(response)
		})
	} catch (error) {
		result = getResultFromError(error as ApiError)
		handleError(result as ErrorResult)
	}
	return result
}

const secureUrlConfig = (config?: AxiosRequestConfig) => {
	const idToken = getIdToken()
	if (idToken) {
		if (!config) {
			config = {}
		}
		config.headers = { ...config.headers, ...{ Authorization: 'Bearer ' + idToken } }
	}
	return config
}

const getIdToken = () => {
	if (getState('auth')) {
		const state = getState('auth')
		const idToken = state[authData.ID_TOKEN]
		return idToken
	}
	return null
}

const getResultFromError = (error: ApiError) => {
	console.log("error: " + JSON.stringify(error))
	let data: ErrorData = { error: error.message }
	if (error.response && error.response.data) {
		data = error.response.data
		if (data.status) {
			let message = messagesFromStatus[data.status]
			if (message) {
				data.message = message
			}
		}
	}
	const result: ErrorResult = {
		data,
		type: returnTypes['OBJECT'],
		contentType: 'application/json'
	}
	return result;
}

const handleError = (error: ErrorResult) => {
	let errs: (string | number)[] = [401, 403, '401', '403']
	if (error.data.status && errs.indexOf(error.data.status) > -1) {
		if (store.getState().router) {
			const history = store.getState().router.history
			if (history) {
				if (store.getState().auth && store.getState().auth.idProvider) {
					const idProvider = store.getState().auth.idProvider
					goToRoute(history)(routesConfig.LOGIN_IDP, {idProvider})
				}
				goToRoute(history)(routesConfig.LOGIN_FORM)
			}
		}
		dispatchData(authData.ERROR_MESSAGE, error.data.message)
	}
}

const getResultFromResponse = async (response: ApiResponse) => {
	let result = response
	if (result.data) {
		const contentType = result.data.type ? result.data.type : result.headers["content-type"]
		result.contentType = (contentType as string)
		result.type = returnTypes.OBJECT
		if (contentType && (contentType.toLowerCase().startsWith('text')
			|| textMimeTypes.find(type => contentType.toLowerCase().startsWith(type)))) {
			if (result.data.text) {
				let textResult: string = ''
				await result.data.text().then((text: string) => textResult = text)
				try {
					const obj = JSON.parse(textResult)
					result.data = obj
				} catch (error) {
					console.log("error: " + error)
					result.data = textResult
					result.type = returnTypes.TEXT
				}
			}
		} else {
			result.type = returnTypes.BLOB
		}
	}
	return result
}