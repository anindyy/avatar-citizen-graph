import React from 'react';
import { Graph } from 'react-d3-graph';
import { config } from './GraphOptions';
import { cleanInitial, cleanAdditional } from './DataCleaner';

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "0",
            graph: {}
        }

        this.handleNodeClick = this.handleNodeClick.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        // I'm not sure if this is an anti-pattern or not
        // but I can't think of any other ways
        if (
            props.data &&
            props.data !== 'error' &&
            props.data.id !== state.id
        ) {
            var { nodes, links } = cleanInitial(props.data);
            return {
                id: props.data.id,
                graph: {
                    nodes: nodes,
                    links: links
                }
            };
        }
        return {
            id: state.id,
            graph: state.graph
        };
    }

    handleNodeClick(clickedNodeId) {
        var newNodes, newLinks;
        console.log(clickedNodeId);

        const axios = require('axios').default;
        let url = 'http://avatar.labpro.dev/friends/';
        axios.get(`${url}${clickedNodeId}`)
            .then(response => {
                var cleaned = cleanAdditional(response.data.payload, this.state.graph);
                newNodes = cleaned.nodes;
                newLinks = cleaned.links;

                this.setState({
                    id: this.state.id,
                    graph: {
                        nodes: newNodes,
                        links: newLinks
                    }
                });
            });   
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
                        style = {{ height: '650px' }}
                    />
                </div>
            );
        }
    }
}

export default Result;