import React from 'react'
import { BrowserRouter as Router, Route, } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react';

import { store } from "./globals/redux/store";
import { routesConfig } from "./globals/services/routeService";
import "./App.css";
// import "./assets/bootstrap-slate.css";
import Menu from "./globals/components/MenuBar";
import Accueil from "./globals/components/Accueil";
import ReduxHistory from './globals/components/ReduxHistory';

export default function App() {

	const contentHeight = Math.floor(0.75 * window.screen.availHeight) + 'px'

	return (
		// le Provider permet la connexion des composants enfants au store
		<Provider store={store}>

			{/** le Router transmets la prop history à tous les composants enfants */}
			<Router>

				<ReduxHistory />

				<Menu />

				<Header as="h2" color="grey" textAlign="center" inverted dividing style={{
					margin: 0, paddingTop: '1.5rem', paddingBottom: '1.5rem', position: 'fixed', top: 0, left: 0,
					zIndex: 900, background: 'rgb(0, 0, 0)', minWidth: '100%'
				}}>
					<span> Med Pain Pro </span>
				</Header>

				<Segment className='center' style={{ top: '6rem', height: contentHeight, overflow: 'auto', paddingBottom: '1rem' }}>
					<Route exact path='/' render={props => <Accueil {...props} />} />
					{Object.keys(routesConfig).map(
						routeKey => (<Route exact {...routesConfig[routeKey]} />)
					)}
				</Segment>

			</Router>

		</Provider>
	)

}