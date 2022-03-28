import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Test from './Test';
import ReduxHistory from './_commons/components/ReduxHistory';
import { store } from "./_redux/store";


export default function App() {


	return (
		// le Provider permet la connexion des composants enfants au store
		<>
			<Provider store={store}>
				{/** le Router transmets la prop history à tous les composants enfants */}
				<Router>
					{/** stocke l'objet history dans le store pour le rendre accessible partout */}
					<ReduxHistory identifiant='JMB - Douleur App'>
						<Test>
							<p>Normalemnt j'arrive en fin de page une fois que tout le reste est écrit</p>
						</Test>
					</ReduxHistory>
				</Router>
			</Provider>
		</>
	)

}