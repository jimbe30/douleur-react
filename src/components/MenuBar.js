import React from "react";
import { slide as Menu } from 'react-burger-menu'

import './MenuBar.css'


export default function MenuBar() {
    return (
        <Menu>
            <a className="menu-item accueil" href="/">Accueil</a>
            <a className="menu-item ordonnance" href="/douleurs">Ordonnance</a>
            <a className="menu-item histo" href="/historique">Historique</a>
            <a className="menu-item lien" href="/liens">Liens</a>
        </Menu>
    )
}