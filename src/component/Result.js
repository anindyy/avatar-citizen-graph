import React from 'react';
import Graph from 'react-graph-vis';
import { options, events } from './GraphOptions';
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

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.data.id !== this.state.id);
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
                        vis={vis => (this.vis = vis)}
                    />
                </div>
            );
        }
    }
}

export default Result;