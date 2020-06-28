var config = {
    height: 2000,
    width: 2000,
    nodeHighlightBehavior: true,
    highlightOpacity: 0.5,
    d3: { // commented values are defaults
        alphaTarget: 0.05, // 0.05
        gravity: -100, // -100
        linkLength: 100, // 100
        linkStrength: 1 // 1
    },
    node: {
        labelProperty: 'name'
    },
    link: {
        highlightColor: "#828282"
    }
};

export { config }