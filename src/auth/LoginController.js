import React from 'react'
import { getRouteParams } from '../globals/services/routeService'
import { backendLogin, loadIdProvidersList, dataTypes } from './services/AuthService'
import { connect } from 'react-redux'
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
		message: state.auth[dataTypes.ERROR_MESSAGE],
		listeIdProviders: state.auth[dataTypes.IDP_LIST],
	}
	return props
}

export default connect(mapStateToProps)(LoginController)

