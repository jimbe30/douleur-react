import React from 'react'
import { Accordion, AccordionTitle } from 'semantic-ui-react'


export default function MainApp() {

    const nomenclature = [{
        type: "Douleur aigüe",
        sousTypes: [{
            type: "Post opératoire",
            sousTypes: [{
                type: "Cardio",
                sousTypes : ["Coronnaire", "Valvulaire", "Périphérique"] 
            },{
                type: "Gynéco"
            },{
                type: "Ortho"
            },{
                type: "Viscéral"
            }
            ]},{
            type: "Traumatique"
        }]},{
            type: "Douleur chronique"
        },{
            type: "Douleur neuropathique"
    }]

    function Entree({titre, lien}) {
        const contenu = lien ? <a href={lien}>{titre}</a> : <div>{titre}</div>        
        return (
            <Accordion><AccordionTitle>{contenu}</AccordionTitle></Accordion>
        )
    }

    function Branche({titre, entrees}) {
        const retour = [{
            title: titre,
            content: {}
        }]
        if (Array.isArray(entrees)) {
            var entreesAffichables = entrees.map(entree => {
                var sTitre = entree
                if (entree.type) {
                    sTitre = entree.type
                }
                if (entree.sousTypes) {
                    return <Branche titre={sTitre} entrees={entree.sousTypes}/>
                } else {
                    return <Entree titre={sTitre}/>
                }   
            });
            var content = <div>{entreesAffichables}</div>
            retour[0].content = {content};
        } 
        return <Accordion styled panels={retour} />
    }

    function Arborescence() {
        return nomenclature.map(douleur => {
            return <Branche titre={douleur.type} entrees={douleur.sousTypes} />  
        })
    }

    return (
        <div>
            <Arborescence/>
        </div>
    )
}