import React from 'react';
import Graph from 'react-graph-vis';
import { options } from './GraphOptions';
import { cleanInitial, cleanAdditional } from './DataCleaner';
import { v4 as uuidv4 } from "uuid";
import cloneDeep from "lodash/cloneDeep";

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            graph: {}
        }

        this.handleNodeClick = this.handleNodeClick.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        // I'm not sure if this is an anti-pattern or not
        // but I can't think of any other ways
        if (
            props.data &&
            props.data.id !== state.id && 
            props.data !== 'error'
        ) {
            var { nodes, edges } = cleanInitial(props.data);
            return {
                id: props.data.id,
                graph: {
                    nodes: nodes,
                    edges: edges
                }
            };
        }
        return {
            id: state.id,
            graph: state.graph
        };
    }

    handleNodeClick(event) {
        var node = event.nodes[0];
        if (node) {
            var newNodes, newEdges;
            console.log(node);

            const axios = require('axios').default;
            let url = 'http://avatar.labpro.dev/friends/';
            axios.get(`${url}${node}`)
                .then(response => {
                    // TODO: make an additional function here
                    // bedain sama clean initial data
                    // ini clean added data gitu
                    // jadi dia bakal consider si initial datanya
                    // abis itu dia return set baru nodes sama edges
                    // bistu setState({ graph: newGraph })
                    // BIS TU JALAN DONG PLIS
                    console.log(response);
                    console.log(this.state.graph);
                    var cleaned = cleanAdditional(response.data.payload, this.state.graph);
                    newNodes = cleaned.newNodes;
                    newEdges = cleaned.newEdges;
                    console.log("New nodes/edges");
                    console.log(newNodes);
                    console.log(newEdges);
                    var newGraph = cloneDeep(this.state.graph);
                    newGraph.nodes.concat(newNodes);
                    newGraph.edges.concat(newEdges);
                    console.log("New graph");
                    console.log(newGraph);

                    this.setState({
                        graph: newGraph
                    });
                });
        }     
    }

    render() {
        console.log("Graph renders!");
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
            console.log("Graph state:");
            console.log(this.state.graph);
           return (
                <div>
                    <p>
                        <strong>ID: </strong>{this.props.data.id}{"\n"}
                        <strong>Name: </strong>{this.props.data.name} {"\n"}
                        <strong>Element: </strong>{this.props.data.element} {"\n"}
                    </p>

                    <Graph
                        key = { uuidv4 }
                        graph = { this.state.graph }
                        options = { options }
                        events = {{ click: this.handleNodeClick }}
                        style = {{ height: '650px' }}
                    />
                </div>
            );
        }
    }
}

export default Result;