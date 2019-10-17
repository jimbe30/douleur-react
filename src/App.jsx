import React from 'react'
import { NomenclatureRestClient } from './restclients/NomenclatureRestClient'
import "./App.css";
import Test from './Test';


export default function MainApp() {

    return (
        <div>
            <NomenclatureRestClient/>

            <Test/>
        </div>
    )
}