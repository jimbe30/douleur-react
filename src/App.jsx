import React from 'react'


export default function MainApp() {

    const nomenclature =
    [
        {
            type: "Douleur aigüe",
            sousTypes:
            [
                {
                    type: "Post opératoire",
                    sousTypes:
                    [
                        {
                            type: "Cardio",
                            sousTypes : ["Coronnaire", "Valvulaire", "Périphérique"] 
                        },
                        {
                            type: "Gynéco"
                        },
                        {
                            type: "Ortho"
                        },
                        {
                            type: "Viscéral"
                        }
                    ]
                },
                {
                    type: "Traumatique"
                }
            ]
        },
        {
            type: "Douleur chronique"
        },
        {
            type: "Douleur neuropathique"
        }
    ]

    function listerNomenclature(tableau, niveau = 0, parent = null) {
        var prefix = "\t".repeat(niveau)
        var retour = []
        tableau.forEach((element) => {
            var entree = element
            if (element.type) {
                entree = element.type
            }
            retour.push({entree, niveau, parent})
            console.log(prefix.concat(entree))
            if (element.sousTypes) {
                retour = retour.concat(listerNomenclature(element.sousTypes, niveau+1, entree))
            }
        })
        return retour;
    }

    function parcourir() {
        var retour = listerNomenclature(nomenclature).map(({entree, niveau, parent}, index) => {
            var style = {marginLeft: niveau*10 + 'px'}
            return (
                <div key={index} style={style} parent={parent}>{entree}</div>
            )
        })
        return retour;
    }



    return (
        <div>
            {parcourir()}
        </div>
    )
}