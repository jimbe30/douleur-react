import { apiURLs, getResultFromUrl } from "../../globals/services/apiService"
import { goToRoute } from "../../globals/services/routeService"
import dispatchData, { resetState } from "../../globals/redux/store"
import { authNs, authData } from "../../_conf/redux";

export const loadIdProvidersList = async (history) => {
	const idpList = await getResultFromUrl(apiURLs.idProvidersList)
	if (idpList && idpList.data) {
		dispatchData(authData.IDP_LIST, idpList.data)
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
			dispatchData(authData.USER_INFOS, userResult.data.user)
			dispatchData(authData.ID_TOKEN, userResult.data.id_token)
			dispatchData(authData.ID_PROVIDER, userResult.data.user.idpRegistration.registrationId)
		} else {
			dispatchData(authData.USER_INFOS, {error: userResult.data.error})
			dispatchData(authData.ID_TOKEN, null)
		}
	}
	goToRoute(history)('/')
}

export const logout = () => resetState(authNs)
