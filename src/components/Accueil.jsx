import React, { Component } from 'react'


class Accueil extends Component {

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

        return (
            <div className='noborder' onClick={this.onClick} >                
                {this.props.message}<br/>                
            </div>
        )
    }
}


export default Accueil



