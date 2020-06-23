import React from 'react'
import { Message, Header, List, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getRoutePath, routesConfig } from '../globals/services/routeService'

const LoginComponent = (props) => {

	const { message, listeIdProviders } = { ...props }

	const identifiants = listeIdProviders ? Object.keys(listeIdProviders) : null
	const pathToIdp = (idp) => getRoutePath(routesConfig.LOGIN_IDP, {idProvider: idp})

	return (
		<>
			{message && <Message error>{message}</Message>}

			<Header as='h4' dividing>Pour vous connecter, sélectionnez le fournisseur d'identité correspondant à votre compte</Header>

			{
				Array.isArray(identifiants) &&
				<List divided relaxed>
					{
						identifiants.map(id => (
							<List.Item key={id}>
								<Link to={pathToIdp(id)}>
									<Image src={listeIdProviders[id]['iconUrl']} size='mini' spaced='right'></Image>
									<List.Content>
										<List.Header as='h5'>{id}</List.Header>
										<List.Description>{listeIdProviders[id]['description']}</List.Description>
									</List.Content>
								</Link>
							</List.Item>
						))
					}
				</List>
			}
		</>
	)
}

export default LoginComponent