import React from 'react'
import { validateToken, dataTypes } from './services/AuthService'
import { connect } from 'react-redux'

const UserInfos = (props) => {

	let { userInfos, history } = { ...props }
	if (!userInfos) {
		userInfos = <div>Attendez...</div>

		const urlParams = new URLSearchParams(window.location.search)
		const idToken = urlParams.get('id_token')
		if (idToken) {
			validateToken(idToken, history)
		}
	} else {
		userInfos = JSON.stringify(userInfos)
	}


	return <> {userInfos} </>

}

const mapStateToProps = (state) => {
	const props = {
		userInfos: state.auth[dataTypes.USER_INFOS]
	}
	return props
}

export default connect(mapStateToProps)(UserInfos)