import React from 'react'
import { validateToken, getTokenFromUrl, logout } from './services/AuthService'
import { authData } from "../_conf/redux";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { routesConfig, getRoutePath } from '../globals/services/routeService'
import { Button, Icon, Dropdown } from 'semantic-ui-react'

const UserInfos = (props) => {

	let { userInfos, history } = { ...props }

	const SigninButton = () => (
		<div style={{ position: 'absolute', top: '0.8rem', right: '0.8rem', zIndex: '20' }}>
			<Link to={getRoutePath(routesConfig.LOGIN_FORM)}>
				<Button primary size='small'>
					<Icon name='power'></Icon>
					Connexion
				</Button>
			</Link>
		</div>
	)

	const UserResume = (userInfos) => {
		let name = userInfos.fullName ? userInfos.fullName : 
			userInfos.preferredUsername ? userInfos.preferredUsername : userInfos.email		
		return (
		<div style={{ position: 'absolute', top: '0.8rem', right: '0.8rem', zIndex: '20', fontSize: '1rem' }}>
			<Dropdown text={name} >
				<Dropdown.Menu direction='left'>
					{ userInfos.preferredUsername && 
						<Dropdown.Item>{userInfos.preferredUsername}</Dropdown.Item>
					}{ userInfos.email && 
						<Dropdown.Item>{userInfos.email}</Dropdown.Item>
					}{ userInfos.roles && 
						<Dropdown.Item>Rôles : {userInfos.roles.join(', ')}</Dropdown.Item>
					}
					<Dropdown.Divider></Dropdown.Divider>
					<Dropdown.Item onClick={logout}>
						<Icon name='power' color='red'/>Déconnexion
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	)}


	if (!userInfos) {
		const idToken = getTokenFromUrl()
		if (idToken && history) {
			validateToken(idToken, history)
		}
		return <SigninButton></SigninButton>

	} else {
		return <UserResume {...userInfos} />
	}

}

const mapStateToProps = (state) => {
	const props = {
		userInfos: state.auth[authData.USER_INFOS],
		history: state.router.history,
	}
	return props
}

export default connect(mapStateToProps)(UserInfos)