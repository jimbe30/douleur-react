import React from 'react'
import { Container, Accordion } from 'semantic-ui-react'

export default function Arborescence({ nomenclatures }) {

    const styleInfosGene = {
        overflow: 'auto', margin: '5px', width: '98%', height: '200px', backgroundColor: '#F7F9FA',
        border: '0px', padding: '5px', fontSize: '95%'
    }

    const Entree = function ({ libelle, infosGenerales }) {
        
        const buildContent = function (data) {
            if (data) {
                return (
                    <div style={{ paddingLeft: '5px' }}>
                        <b>Infos douleur</b> <br />
                        <textarea style={styleInfosGene} value={data} readOnly />
                    </div>
                )
            }
            return "";
        }

        const content = buildContent(infosGenerales)

        const retour = [{
            title: libelle,
            content: { content }
        }];

        return (<Accordion styled panels={retour} />)
    }

    const Branche = function ({ libelle, nomenclaturesEnfants }) {
        const retour = [{
            title: libelle,
            content: {}
        }];
        if (nomenclaturesEnfants && Array.isArray(nomenclaturesEnfants)) {
            let entreesAffichables = nomenclaturesEnfants.map(nomenclature => {
                let titre = nomenclature.libelle
                let infosGenerales = nomenclature.infosGenerales;
                if (nomenclature.nomenclaturesEnfants && nomenclature.nomenclaturesEnfants.length > 0) {
                    return <Branche libelle={titre} nomenclaturesEnfants={nomenclature.nomenclaturesEnfants} />;
                }
                else {
                    return <Entree libelle={titre} infosGenerales={infosGenerales} />;
                }
            });
            let content = <div>{entreesAffichables}</div>;
            retour[0].content = { content };
        }
        /**
         * FIX : Extraire la function Branche dans une classe avec gestion d'état actif/inactif 
         * en fonction du click (handler méthode)
         * pour modifier l'attribut className (mettre une bordure si actif, pas de bordure si inactif)
         */
        return <Accordion styled panels={retour} />;
    }

    const Arbre = function ({ nomenclatures }) {
        return (
            <div>{
                nomenclatures.map(
                    nomenclature => {
                        return <Branche libelle={nomenclature.libelle} nomenclaturesEnfants={nomenclature.nomenclaturesEnfants} />;
                    }
                )
            }
            </div>
        );
    }

    return (
        <div className="center">
            <Arbre nomenclatures={nomenclatures} />
        </div>

    );
}
