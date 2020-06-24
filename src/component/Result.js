import React from 'react';
import { Graph } from 'react-d3-graph';
import { config } from './GraphOptions';
import { cleanInitial, cleanAdditional } from './DataCleaner';

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            graph: {}
        }

        this.handleNodeClick = this.handleNodeClick.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        // I'm not sure if this is an anti-pattern or not
        // but I can't think of any other ways
        if (
            props.data &&
            props.data !== 'error'
        ) {
            var { nodes, links } = cleanInitial(props.data);
            return {
                graph: {
                    nodes: nodes,
                    links: links
                }
            };
        }
        return {
            graph: {}
        };
    }

    handleNodeClick(event) {
        var node = event.nodes[0];
        if (node) {
            var newNodes, newLinks;
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
                    newNodes = cleaned.nodes;
                    newLinks = cleaned.links;
                    console.log(newNodes);
                    console.log(newLinks);
                    var newGraph = {
                        nodes: newNodes,
                        links: newLinks
                    };
                    console.log(newGraph);

                    this.setState({
                        graph: newGraph
                    });
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
           return (
                <div>
                    <p>
                        <strong>ID: </strong>{this.props.data.id}{"\n"}
                        <strong>Name: </strong>{this.props.data.name} {"\n"}
                        <strong>Element: </strong>{this.props.data.element} {"\n"}
                    </p>

                    <Graph
                        id = 'graph-id'
                        data = { this.state.graph }
                        config = { config }
                        onClickNode = { this.handleNodeClick }
                    />
                </div>
            );
        }
    }
}

export default Result;