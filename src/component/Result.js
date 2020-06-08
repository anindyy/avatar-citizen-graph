import React from 'react';
import Graph from 'vis-react';
import { options, events } from './GraphOptions';

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.mapNode = this.mapNode.bind(this);
        this.mapEdge = this.mapEdge.bind(this);
    }

    mapNode(person) {
        let color = '';
        switch (person.element) {
            case 'fire':
                color = '#ff6512';
                break;
            case 'water':
                color = '#41a5f2';
                break;
            case 'air':
                color = '#b4cecf';
                break;
            case 'earth':
                color = '#29c434';
                break;
        }
        
        return ({
            color: color,
            id: person.id,
            label: person.name,
            title: `ID: ${person.id}, elmt: ${person.element}`
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
            nodes.push(this.mapNode(this.props.data));

            var graph = {
                nodes: nodes,
                edges: edges
            };

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