var options = {
    height: '100%',
    width: '100%',
    edges: {
        color: '#000000',
        arrows: {
            to: {
                enabled: false
            }
        }
    },
    interaction: { hoverEdges: true }
};
 
var events = {
    select: function(event) {
        var { nodes, edges } = event;
    }
};

export { options, events }