import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from "./redux/store";
import "./App.css";
import "./bootstrap.css";
import Menu from "./components/MenuBar";
import Accueil from "./components/Accueil";
import Test from './Test';
import { Header } from 'semantic-ui-react';
import Arborescence from './ordonnance/ArborescenceService';


export default function App() {

        const msgBienvenue = (
                <div>
                        <h6>
                                <p>Bienvenue dans l'application incontournable pour gérer la douleur de vos patients</p>
                                <p>Cliquez sur le menu en haut à gauche pour faire votre choix</p>
                        </h6>
                </div>
        )

        return (
                // le Provider permet la connexion des composants enfants au store
                <Provider store={store}>

                {/** le Router transmets la prop history à tous les composants enfants */}
                <Router>
                        <Menu />
                        <Header as="h2" color="grey" textAlign="center" inverted dividing>
                                <span> Pain Control Pro </span>
                        </Header>

                        <Route exact path='/' render={props => <Accueil {...props} message={msgBienvenue} />} />
                        <Route path='/douleurs' component={Arborescence} />

                        {/* <Test /> */}

                </Router>


               </Provider>
        )

}