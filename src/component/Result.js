import React from 'react';
import Graph from 'vis-react';
import { options, events } from './GraphOptions';

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.mapEdge = this.mapEdge.bind(this);
    }

    mapNode(person) {
        return ({
            id: person.id,
            label: person.name
        })
    }

    mapEdge(person) {
        return ({
            from: this.props.data.id,
            to: person.id
        })
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
            var friends = this.props.data.friends;
            var nodes = friends.map(this.mapNode);
            var edges = friends.map(this.mapEdge);
            nodes.push({
                id: this.props.data.id,
                label: this.props.data.name
            })

            var graph = {
                nodes: nodes,
                edges: edges
            };

            console.log(nodes);
            console.log(edges);

            return (
                <div>
                    <p>
                        <strong>ID: </strong>{this.props.data.id}{"\n"}
                        <strong>Name: </strong>{this.props.data.name} {"\n"}
                        <strong>Element: </strong>{this.props.data.element} {"\n"}
                    </p>

                    <Graph
                        graph={graph}
                        options={options}
                        events={events}
                        getNetwork={this.getNetwork}
                        getEdges={this.getEdges}
                        getNodes={this.getNodes}
                        vis={vis => (this.vis = vis)}
                    />
                </div>
            );
        }
    }
}

export default Result;