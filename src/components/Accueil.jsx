import React from 'react'
import { Message } from 'semantic-ui-react'


const Accueil = function (props) {

    return (
        <Message info>
            {props.message}<br />
        </Message>
    )

}


export default Accueil



