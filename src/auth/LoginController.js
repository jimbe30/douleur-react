import React from 'react'
import { connect } from 'react-redux'

import { getRouteParams } from '../globals/services/routeService'
import { backendLogin, loadIdProvidersList } from './services/AuthService'
import { authData } from "../_redux/conf";

import LoginComponent from './LoginComponent'

const LoginController = (props) => {

	const idp = getRouteParams(props).idProvider
	const { message, listeIdProviders } = { ...props }

	if (idp) {
		backendLogin(idp)
		return null
	} else {
		if (!listeIdProviders){
			loadIdProvidersList()
		}
		return <LoginComponent message={message} listeIdProviders={listeIdProviders} />
	}

}

const mapStateToProps = (state) => {
	const props = {
		message: state.auth[authData.ERROR_MESSAGE],
		listeIdProviders: state.auth[authData.IDP_LIST],
	}
	return props
}

export default connect(mapStateToProps)(LoginController)

