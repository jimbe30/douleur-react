import React from "react";
import { slide as Menu } from 'react-burger-menu'

import './MenuBar.css'

export default function MenuBar() {
    return (
        <Menu>
            <a className="menu-item" href="/">
                Accueil
            </a>
            <a className="menu-item" href="/douleurs">
                Ordonnance
            </a>
            <a className="menu-item" href="/historique">
                Historique
            </a>
            <a className="menu-item" href="/liens">
                Liens
            </a>
        </Menu>
    )
}