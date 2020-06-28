import React from 'react';
import { Graph } from 'react-d3-graph';
import { config } from './GraphOptions';
import { cleanInitial, cleanAdditional } from './DataCleaner';
import "./Result.css";

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            id: "0",
            expanded: [],
            graph: {}
        }

        this.handleNodeClick = this.handleNodeClick.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.data || props.data === 'error') {
            return {
                error: true
            };
        }

        if (props.data.id !== state.id) {
            var { nodes, links } = cleanInitial(props.data);
            return {
                error: false,
                id: props.data.id,
                expanded: [props.data.id],
                graph: {
                    nodes: nodes,
                    links: links
                }
            };
        }
        
        return {
            error: state.error,
            id: state.id,
            expanded: state.expanded,
            graph: state.graph
        };
    }

    handleNodeClick(clickedNodeId) {
        var newNodes, newLinks;

        if (this.state.expanded.indexOf(clickedNodeId) === -1) {
            const axios = require('axios').default;
            let url = 'http://avatar.labpro.dev/friends/';
            axios.get(`${url}${clickedNodeId}`)
                .then(response => {
                    var cleaned = cleanAdditional(response.data.payload, this.state.graph);
                    newNodes = cleaned.nodes;
                    newLinks = cleaned.links;

                    var expanded = this.state.expanded;
                    expanded.push(clickedNodeId);

                    this.setState({
                        error: false,
                        id: this.state.id,
                        expanded: expanded,
                        graph: {
                            nodes: newNodes,
                            links: newLinks
                        }
                    });
                })
                .catch(err => {
                    this.setState({
                        error: true
                    });
                });
        }
    }

    render() {
        if (!this.props.data) {
            return null;
        }
        else if (this.state.error) {
            return (
                <div className="errMessage">
                    <b>oops, something went wrong.</b>
                </div>
            );
        }
        else {
           return (
               <div className="result-wrapper">
                    <div className="text">
                        <div><strong>ID: </strong>{this.props.data.id}</div>
                        <div><strong>Name: </strong>{this.props.data.name}</div>
                        <div><strong>Element: </strong>{this.props.data.element}</div>
                    </div>
                    <div className="graph">
                        <Graph
                            id = {`G${this.state.id}`}
                            data = { this.state.graph }
                            config = { config }
                            onClickNode = { this.handleNodeClick }
                        />
                    </div>
                </div>
            );
        }
    }
}

export default Result;