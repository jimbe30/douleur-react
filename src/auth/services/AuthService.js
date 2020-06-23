import { apiURLs, getResultFromUrl } from "../../globals/services/apiService"
import { goToRoute } from "../../globals/services/routeService"
import dispatchData, { resetState } from "../../globals/redux/store";

export const namespace = 'auth'
export const dataTypes = {
	USER_INFOS: 'userInfos',
	ID_TOKEN: 'idToken',
	ERROR_MESSAGE: 'errorMessage',
	IDP_LIST: 'idProvidersList',
	ID_PROVIDER: 'idProvider'
}

export const loadIdProvidersList = async (history) => {
	const idpList = await getResultFromUrl(apiURLs.idProvidersList)
	if (idpList && idpList.data) {
		dispatchData(dataTypes.IDP_LIST, idpList.data)
	}
}

export const backendLogin = (idp) => {	
	let redirectUrl = window.location.origin
	let loginUrl = apiURLs.login(idp) + "?redirect_to=" + redirectUrl
	window.location = loginUrl
}

export const getTokenFromUrl = () => {
	const urlParams = new URLSearchParams(window.location.search)
	const idToken = urlParams.get('id_token')
	return idToken
}

export const validateToken = async (idToken, history) => {
	const userResult = await getResultFromUrl(apiURLs.validateToken, { params: { id_token: idToken } })
	if (userResult && userResult.data) {
		if (userResult.data.user) {
			dispatchData(dataTypes.USER_INFOS, userResult.data.user)
			dispatchData(dataTypes.ID_TOKEN, userResult.data.id_token)
			dispatchData(dataTypes.ID_PROVIDER, userResult.data.user.idpRegistration.registrationId)
		} else {
			dispatchData(dataTypes.USER_INFOS, {error: userResult.data.error})
			dispatchData(dataTypes.ID_TOKEN, null)
		}
	}
	goToRoute(history)('/')
}

export const logout = () => resetState(namespace)
