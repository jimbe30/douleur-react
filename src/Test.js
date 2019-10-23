import React, { Component } from 'react'


class Test extends Component {

    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
        this.state = {
            actif: false,
        }
    }   

    onClick(e) {
        if (this.state.actif) {
            e.target.className = 'noborder'
            this.setState({ actif: false })
        } else {
            e.target.className = 'ui accordion styled'
            this.setState({ actif: true })
        }
    }

    render() {

        const style = {top: '50px', position: 'relative', marginLeft: 'auto', marginRight: 'auto', width:'400px', maxWidth: '100%'}
        return (
            <div className='noborder' onClick={this.onClick} style={style}>
                C'est le contenu de la balise div à l'intérieur du composant Test 
                pour permuter d'un style à l'autre en fonction des clicks
            </div>
        )
    }
}


export default Test