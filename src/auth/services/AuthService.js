import { apiURLs, backendURL, getResultFromUrl } from "../../globals/services/apiService"
import { getRoutePath, routesConfig, goToRoute } from "../../globals/services/routeService"
import dispatchData from "../../globals/redux/store";

export const namespace = 'auth'
export const dataTypes = {
	USER_INFOS: 'userInfos',
	ID_TOKEN: 'idToken',
	ERROR_MESSAGE: 'errorMessage',
	IDP_LIST: 'idProvidersList'
}

export const loadIdProvidersList = async (history) => {
	const idpList = await getResultFromUrl(backendURL + apiURLs.idProvidersList)
	if (idpList && idpList.data) {
		dispatchData(dataTypes.IDP_LIST, idpList.data)
	}
}

export const backendLogin = (idp) => {
	let redirectUrl = window.location.origin + getRoutePath(routesConfig.VALIDATE_TOKEN)
	let loginUrl = backendURL + apiURLs.login(idp) + "?redirect_to=" + redirectUrl
	window.location = loginUrl
}

export const validateToken = async (idToken, history) => {
	const userResult = await getResultFromUrl(backendURL + apiURLs.validateToken, { params: { id_token: idToken } })
	if (userResult && userResult.data) {
		if (userResult.data.user) {
			dispatchData(dataTypes.USER_INFOS, userResult.data.user)
			dispatchData(dataTypes.ID_TOKEN, userResult.data.id_token)
		} else {
			dispatchData(dataTypes.USER_INFOS, {error: userResult.data.error})
			dispatchData(dataTypes.ID_TOKEN, null)
		}
	}
	goToRoute(history)(routesConfig.VALIDATE_TOKEN)
}