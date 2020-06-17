import React from "react";
import { slide as Menu } from 'react-burger-menu'

import { getRoutePath, routesConfig } from "../services/routeService";
import './MenuBar.css'
import { Link } from "react-router-dom";


export default function MenuBar() {
    return (
        <Menu>
            <Link className="menu-item accueil" to="/">Accueil</Link>
            <Link className="menu-item ordonnance" to={getRoutePath(routesConfig.ARBORESCENCE)}>Ordonnance</Link>
            <Link className="menu-item histo" to={getRoutePath(routesConfig.HISTORIQUE)}>Historique</Link>
            <Link className="menu-item lien" to={getRoutePath(routesConfig.LIENS)}>Liens</Link>
				<Link className="menu-item" to={getRoutePath(routesConfig.GESTION_NOMENCLATURE)}>Configurer nomenclature</Link>

        </Menu>
    )
}