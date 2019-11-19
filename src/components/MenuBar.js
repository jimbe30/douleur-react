import React from "react";
import { slide as Menu } from 'react-burger-menu'

import { frontPrefix } from "../config/URLs-conf";
import './MenuBar.css'


export default function MenuBar() {
    return (
        <Menu>
            <a className="menu-item accueil" href="/">Accueil</a>
            <a className="menu-item ordonnance" href={`${frontPrefix}/douleurs`}>Ordonnance</a>
            <a className="menu-item histo" href={`${frontPrefix}/historique`}>Historique</a>
            <a className="menu-item lien" href={`${frontPrefix}/liens`}>Liens</a>
        </Menu>
    )
}