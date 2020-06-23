import axios from "axios";
import dispatchData, { store, getState } from "../redux/store";
import { dataTypes as authDataTypes } from "../../auth/services/AuthService";
import { routesConfig, goToRoute } from "./routeService";


export const backendURL = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : ''

export const apiURLs = {
	arborescenceDouleurs: backendURL + '/douleurs/arborescence',
	ficheDouleur: idDouleur => backendURL + '/douleurs/' + idDouleur,
	nouvelleOrdonnance: backendURL + '/ordonnances/nouvelle',
	ordonnanceEmise: idOrdonnance => backendURL + '/ordonnances/emises/' + idOrdonnance,
	idProvidersList: backendURL + '/users/login/infos',
	login: idProvider => backendURL + '/users/login/' + idProvider,	
	validateToken: backendURL + '/users/login/registerToken',
}

const textMimeTypes = [
	"application/javascript", "application/json", "application/xml",
	'application/xhtml+xml', 'application/typescript', 'application/x-sh',
]

export const returnTypes = {
	OBJECT: 'object',
	TEXT: 'text',
	BLOB: 'blob',
}

const messagesFromStatus = {
	401: "Votre session a expiré ou l'authentification a échoué, veuillez vous reconnecter",
	403: "Vous n'êtes pas autorisé à accéder à cette ressource, veuillez vous identifier"
}

export const getResultFromUrl = async (url, config) => {
	let result = {}
	config = secureUrlConfig(config)
	try {
		await axios.get(url, config).then(response => {
			result = getResultFromResponse(response)
		})
	} catch (error) {
		result = getResultFromError(error)
		handleError(result)
	}
	return result
}

export const postObjectToUrl = async (object, url, config) => {
	let result = {}
	config = secureUrlConfig(config)
	try {
		await axios.post(url, object, config).then(response => {
			result = getResultFromResponse(response)
		})
	} catch (error) {
		result = getResultFromError(error)
		handleError(result)
	}
	return result
}

const secureUrlConfig = config => {
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
		const idToken = state[authDataTypes.ID_TOKEN]
		return idToken
	}
	return null
}

const getResultFromError = error => {
	console.log("error: " + JSON.stringify(error))
	let data = { error: error.message }
	if (error.response && error.response.data) {
		data = error.response.data
		let message = messagesFromStatus[data.status]
		if (message) {
			data.message = message
		}
	}
	const result = {
		data,
		type: returnTypes.OBJECT,
		contentType: 'application/json'
	}
	return result;
}

const handleError = error => {
	if ([401, 403].indexOf(error.data.status) > -1) {
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
		dispatchData(authDataTypes.ERROR_MESSAGE, error.data.message)
	}
}

const getResultFromResponse = async response => {
	let result = response
	if (result.data) {
		const contentType = result.data.type ? result.data.type : result.headers["content-type"]
		result.contentType = contentType
		result.type = returnTypes.OBJECT
		if (contentType && (contentType.toLowerCase().startsWith('text')
			|| textMimeTypes.find(type => contentType.toLowerCase().startsWith(type)))) {
			if (result.data.text) {
				let textResult
				await result.data.text().then(text => textResult = text)
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