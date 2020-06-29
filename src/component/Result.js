import React from 'react';
import Button from '@material-ui/core/Button';
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
            graph: {},
            clicked: {}
        }

        this.handleNodeClick = this.handleNodeClick.bind(this);
        this.rearrangeNode = this.rearrangeNode.bind(this);
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
                },
                clicked: {
                    id: props.data.id,
                    name: props.data.name,
                    element: props.data.element
                }
            };
        }
        
        return state;
    }

    handleNodeClick(clickedNodeId) {
        var newNodes, newLinks;

        if (this.state.expanded.indexOf(clickedNodeId) === -1) {
            const axios = require('axios').default;
            let url = 'https://avatar.labpro.dev/friends/';
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
                        },
                        clicked: {
                            id: response.data.payload.id,
                            name: response.data.payload.name,
                            element: response.data.payload.element
                        }
                    });
                })
                .catch(err => {
                    this.setState({
                        error: true
                    });
                });
        }
        else {
            var indexes = this.state.graph.nodes.map(e => e.id);
            var clickedIndex = indexes.indexOf(clickedNodeId);
            var data = this.state.graph.nodes[clickedIndex];
            var element = '';
            
            switch (data.color) {
                case '#ff6512':
                    element = 'fire';
                    break;
                case '#41a5f2':
                    element = 'water';
                    break;
                case '#b4cecf':
                    element = 'air';
                    break;
                case '#29c434':
                    element = 'earth';
                    break;
                default:
                    element = ''
                    break;
            }

            this.setState({
                error: false,
                id: this.state.id,
                expanded: this.state.expanded,
                graph: this.state.graph,
                clicked: {
                    id: data.id,
                    name: data.name,
                    element: element
                }
            });
        }
    }

    rearrangeNode() {
        this.forceUpdate();
    }

    render() {
        if (!this.props.data) {
            return null;
        }
        else if (this.state.error) {
            return (
                <div className="errMessage">
                    <b>um, something went wrong.</b>
                </div>
            );
        }
        else {
           return (
               <div className="result-wrapper">
                    <div className="result-text">
                        <div><strong>ID: </strong>{this.state.clicked.id}</div>
                        <div><strong>Name: </strong>{this.state.clicked.name}</div>
                        <div><strong>Element: </strong>{this.state.clicked.element}</div>
                        <Button
                        size = "small"
                        color = "primary"
                        onClick = {this.rearrangeNode}>
                            Rearrange Nodes
                        </Button>
                    </div>
                    <div className="result-graph">
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