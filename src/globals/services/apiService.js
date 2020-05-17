import axios from "axios";

export const apiURLs = {
	arborescenceDouleurs: '/douleurs/arborescence',
	ficheDouleur: idDouleur => '/douleurs/' + idDouleur,
	nouvelleOrdonnance: '/ordonnances/nouvelle',
	ordonnanceEmise: idOrdonnance => '/ordonnances/emises/' + idOrdonnance,
}

export const backendURL = process.env.REACT_APP_BACKEND_URL

const textMimeTypes = [
	"application/javascript", "application/json", "application/xml",
	'application/xhtml+xml', 'application/typescript', 'application/x-sh',
]

export const returnTypes = {
	OBJECT: 'object',
	TEXT: 'text',
	BLOB: 'blob',
}

export const getResultFromUrl = async (url, config) => {
	let result = {}
	try {
		await axios.get(url, config).then(response => {
			result = getResultFromResponse(response)
		})
	} catch (error) {
		result = getResultFromError(error)
	}
	return result
}

export const postObjectToUrl = async (object, url, config) => {
	let result = {}
	try {
		await axios.post(url, object, config).then(response => {
			result = getResultFromResponse(response)
		})
	} catch (error) {
		result = getResultFromError(error)
	}
	return result
}

const getResultFromError = error => {
	console.log("error: " + JSON.stringify(error))
	const result = {
		data: { error: error.message },
		type: returnTypes.OBJECT,
		contentType: 'application/json'
	}
	return result;
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