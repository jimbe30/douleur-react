import React from "react";
import { slide as Menu } from 'react-burger-menu'

import { getRoutePath, routes } from "../services/routeService";
import './MenuBar.css'


export default function MenuBar() {
    return (
        <Menu>
            <a className="menu-item accueil" href="/">Accueil</a>
            <a className="menu-item ordonnance" href={getRoutePath(routes.ARBORESCENCE)}>Ordonnance</a>
            <a className="menu-item histo" href={getRoutePath(routes.HISTORIQUE)}>Historique</a>
            <a className="menu-item lien" href={getRoutePath(routes.LIENS)}>Liens</a>
				<a className="menu-item" href={getRoutePath(routes.GESTION_NOMENCLATURE)}>Configurer nomenclature</a>
        </Menu>
    )
}