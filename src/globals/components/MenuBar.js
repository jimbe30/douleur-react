import React, { useState } from "react";
import { slide as Menu } from 'react-burger-menu'

import { getRoutePath, routesConfig } from "../services/routeService";
import './MenuBar.css'
import { Link } from "react-router-dom";


export default function MenuBar() {

	const [open, setOpen] = useState(false)
	const rest = {onClick : () => setOpen(false)}

	return (
		<Menu isOpen={open} onStateChange={(state) => setOpen(state.isOpen)}>

			<Link className="menu-item accueil" {...rest} to="/">
				Accueil
			</Link>
			<Link className="menu-item ordonnance" {...rest} to={getRoutePath(routesConfig.ARBORESCENCE)}>
				Ordonnance
			</Link>
			<Link className="menu-item histo" {...rest} to={getRoutePath(routesConfig.HISTORIQUE)}>
				Historique
			</Link>
			<Link className="menu-item lien" {...rest} to={getRoutePath(routesConfig.LIENS)}>
				Liens
			</Link>
			<Link className="menu-item" {...rest} to={getRoutePath(routesConfig.GESTION_NOMENCLATURE)}>
				Configurer nomenclature
			</Link>
			<Link className="menu-item" {...rest} to={getRoutePath(routesConfig.ORDONNANCES_TYPES)}>
				Gérer ordonnances types
			</Link>

		</Menu>
	)
}