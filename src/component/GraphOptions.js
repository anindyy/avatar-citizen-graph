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
    }
};
 
var events = {
    click: function(event) {
        var node = event.nodes[0];
        var resp;
        console.log(node);

        const axios = require('axios').default;
        let url = 'http://avatar.labpro.dev/friends/';
        axios.get(`${url}${node}`)
            .then(response => {
                console.log(response);
                resp = response;
            });
    }
};

export { options, events }