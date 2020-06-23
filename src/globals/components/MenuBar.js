import React, { useState } from "react";
import { slide as Menu } from 'react-burger-menu'

import { getRoutePath, routesConfig } from "../services/routeService";
import './MenuBar.css'
import { Link } from "react-router-dom";


export default function MenuBar() {

	const [open, setOpen] = useState(false)

	return (
		<Menu isOpen={open} onStateChange={(state) => setOpen(state.isOpen)}>

			<Link className="menu-item accueil" onClick={() => setOpen(false)}
				to="/">
				Accueil
			</Link>
			<Link className="menu-item ordonnance" onClick={() => setOpen(false)}
				to={getRoutePath(routesConfig.ARBORESCENCE)}>
				Ordonnance
			</Link>
			<Link className="menu-item histo" onClick={() => setOpen(false)}
				to={getRoutePath(routesConfig.HISTORIQUE)}>
				Historique
			</Link>
			<Link className="menu-item lien" onClick={() => setOpen(false)}
				to={getRoutePath(routesConfig.LIENS)}>
				Liens
			</Link>
			<Link className="menu-item" onClick={() => setOpen(false)}
				to={getRoutePath(routesConfig.GESTION_NOMENCLATURE)}>
				Configurer nomenclature
			</Link>

		</Menu>
	)
}