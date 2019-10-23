import React, { Component } from 'react';
import { apiURLs } from "../config/URLs-conf";
import Arborescence from '../components/Arborescence';

export class NomenclatureRestClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            douleurs: [],
            urlDouleur: apiURLs.douleurs,
        }
    }

    fetchDouleurs() {
        fetch(this.state.urlDouleur)
            .then(response => response.json())
            .then(data => {
                this.setState({ douleurs: data });
            })
            .catch(console.log);
    }

    componentDidMount() {
        this.fetchDouleurs();
    }

    render() {
        return (
            <Arborescence nomenclatures={this.state.douleurs} />
        );
    }
}
