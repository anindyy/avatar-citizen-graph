var options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    edges: {
        color: '#3b3b3b',
        arrows: {
            to: {
                enabled: false
            }
        }
    },
    nodes: {
        borderWidth: 0,
        font: {
            size: 10
        },
        shape: 'dot',
        size: 7
    },
    interaction: { hoverEdges: true }
};
 
var events = {
    select: function(event) {
        var { nodes, edges } = event;
    }
};

export { options, events }