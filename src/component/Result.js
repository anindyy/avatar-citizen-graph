import React from 'react';
import Graph from 'react-graph-vis';
import { options } from './GraphOptions';
import { clean } from './DataCleaner';

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            nodes: [],
            edges: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        // I'm not sure if this is an anti-pattern or not
        // but I can't think of any other ways
        if (
            props.data &&
            props.data.id !== state.id && 
            props.data !== 'error'
        ) {
            var { nodes, edges } = clean(props.data);
            return {
                id: props.data.id,
                nodes: nodes,
                edges: edges
            };
        }
        return null;
    }

    handleNodeClick(event) {
        var node = event.nodes[0];
        if (node) {
            var nodes, edges;
            console.log(node);

            const axios = require('axios').default;
            let url = 'http://avatar.labpro.dev/friends/';
            axios.get(`${url}${node}`)
                .then(response => {
                    // TODO: make an additional function here
                    // bedain sama clean initial
                    // ini clean added data gitu
                    // jadi dia bakal consider si initial
                    console.log(response);
                    var cleaned = clean(response.data.payload);
                    nodes = cleaned.nodes;
                    edges = cleaned.edges;

                    console.log(nodes);
                    console.log(edges);
                });
        }     
    }

    render() {
        if (!this.props.data) {
            return (
                <div>
                    Search something ...                   
                </div>
            );
        }
        else if (this.props.data === 'error') {
            return (
                <div>
                    Oops, it doesn't exist.
                </div>
            );
        }
        else {
            var graph = {
                nodes: this.state.nodes,
                edges: this.state.edges
            };

            var events = { 
                click: this.handleNodeClick
            };

            return (
                <div>
                    <p>
                        <strong>ID: </strong>{this.props.data.id}{"\n"}
                        <strong>Name: </strong>{this.props.data.name} {"\n"}
                        <strong>Element: </strong>{this.props.data.element} {"\n"}
                    </p>

                    <Graph
                        graph = { graph }
                        options = { options }
                        events = { events }
                        style = {{ height: '650px' }}
                        vis = {vis => (this.vis = vis)}
                    />
                </div>
            );
        }
    }
}

export default Result;