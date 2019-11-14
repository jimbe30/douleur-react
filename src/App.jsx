import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from "./redux/store";
import "./App.css";
// import "./assets/bootstrap-slate.css";
import Menu from "./components/MenuBar";
import Accueil from "./components/Accueil";
import Test from './Test';
import { Header, Segment } from 'semantic-ui-react';
import Arborescence from './ordonnance/ArborescenceService';
import FicheDouleur from './ordonnance/FicheDouleurService';
import { Divider } from '@material-ui/core';

export default function App() {

  const msgBienvenue = (
    <div>
      <h5>
        <p>Bienvenue dans Pain Control Pro</p>
        <p>L'application qu'il vous faut pour gérer la douleur de vos patients</p>
        <p>Cliquez sur le menu en haut à gauche pour sélectionner votre choix</p>
      </h5>
    </div>
  )

  return (
    // le Provider permet la connexion des composants enfants au store
    <Provider store={store}>

      {/** le Router transmets la prop history à tous les composants enfants */}
      <Router>

        <Menu />

        <Header as="h2" color="grey" textAlign="center" inverted dividing style={{
          margin: 0, paddingTop: '20px', paddingBottom: '10px', position: 'fixed', top: 0, left: 0, 
          zIndex: 900, background: 'rgb(35, 55, 60)', minWidth: '100%'
        }}>
          <span> Pain Control Pro </span>
        </Header>

        <Segment className='center' style={{ top: '60px' }}>

          <Route exact path='/' render={props => <Accueil {...props} message={msgBienvenue} />} />
          <Route exact path='/douleurs' component={Arborescence} />
          <Route exact path='/douleurs/:idDouleur' component={FicheDouleur} />

          <Divider></Divider>
          {/* 
           <Test className='infosBase'>

          </Test>  */}

        </Segment>

      </Router>


    </Provider>
  )

}