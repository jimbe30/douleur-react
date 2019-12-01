import React from 'react'
import { Accordion, Button } from 'semantic-ui-react'
import "./Arborescence.css";
import TruncBox from '../components/TruncBox';

export default function Arborescence(props) {

    const { handleClickDouleur } = props

    const buttonStyle = { float: 'right', maxWidth: '100%', marginTop: '-40px', marginBottom: '5px', marginRight: '2%' }

    const Entree = function ({ libelle, infosGenerales, idDouleur }) {
        const buildContent = function (data) {
            if (data) {
                return (
                    <React.Fragment>
                        <Button primary size='tiny' style={buttonStyle} onClick={() => handleClickDouleur(idDouleur)}>
                            Faire l'ordonnance
                        </Button>
                        <TruncBox height='6rem' moreText='▼ ( voir plus ... )' lessText='▲ ( réduire ... )'>
                            <pre className='infosBase'>{data}</pre>
                        </TruncBox>
                    </React.Fragment>
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

    const Branche = function ({ libelle, nomenclaturesEnfants, ...rest }) {
        const retour = [{
            title: libelle,
            content: {}
        }];
        if (nomenclaturesEnfants && Array.isArray(nomenclaturesEnfants)) {
            let entreesAffichables = nomenclaturesEnfants.map(nomenclature => {
                let titre = nomenclature.libelle
                let infosGenerales = nomenclature.infosGenerales;
                let idDouleur = nomenclature.id;
                if (nomenclature.nomenclaturesEnfants && nomenclature.nomenclaturesEnfants.length > 0) {
                    return <Branche libelle={titre} nomenclaturesEnfants={nomenclature.nomenclaturesEnfants} {...rest} />;
                }
                else {
                    return <Entree libelle={titre} infosGenerales={infosGenerales} idDouleur={idDouleur} {...rest} />;
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

    const Arbre = function ({ nomenclatures, ...rest }) {
        return (
            <div>{
                Array.isArray(nomenclatures) && nomenclatures.map(
                    nomenclature => {
                        return <Branche libelle={nomenclature.libelle} nomenclaturesEnfants={nomenclature.nomenclaturesEnfants} {...rest} />;
                    }
                )
            }
            </div>
        );
    }

    return (
        <Arbre {...props} />
    );
}
