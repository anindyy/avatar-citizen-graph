function cleanInitial(data) {
    // removes duplicates
    var friends = data.friends.filter((v, i, a) => a.indexOf(v) === i);
    // excludes self from friends list
    const index = friends.map(function(e) { return e.id }).indexOf(data.id);
    if (index > -1) {
        friends.splice(index, 1);
    }
    
    // create links
    const links = friends.map(
        function(x) { return mapEdge(data, x) }
    );

    // adds self to nodes list
    friends.push({
        id: data.id,
        label: data.name,
        element: data.element
    });
    const nodes = friends.map(mapNode);

    return { nodes, links };
}

function cleanAdditional(newData, existing) {
    // remove duplicates
    var newFriends = newData.friends.filter((v, i, a) => a.indexOf(v) === i);
    // remove self from friends list
    var index = newFriends.map(function(e) { return e.id }).indexOf(newData.id);
    if (index > -1) {
        newFriends.splice(index, 1);
    }

    // create links
    var newLinks = newFriends.map(
        function(x) { return mapEdge(newData, x) }
    );

    // check existing nodes
    var existingID = existing.nodes.map(function(e) { return e.id });    
    newFriends.forEach(function(v, i) {
        var id = newFriends[i].id;
        if (existingID.indexOf(id) > -1) {
            newFriends.splice(i, 1);
        }
    });

    // add self to node list if they're not there
    index = existingID.indexOf(newData.id);
    if (index === -1) {
        newFriends.push({
            id: newData.id,
            label: newData.name,
            element: newData.element
        });
    }
    var newNodes = newFriends.map(mapNode);

    // merge with existing
    var nodes = newNodes.concat(existing.nodes);
    var links = newLinks.concat(existing.links);

    return { nodes, links };
}

function mapNode(person) {
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
        default:
            color = '#3b3b3b'
            break;
    }
    
    return ({
        color: color,
        id: person.id,
        name: person.name,
        title: `ID: ${person.id}, elmt: ${person.element}`
    })
}

function mapEdge(person, friend) {
    return ({
        source: person.id,
        target: friend.id
    });
}

export { cleanInitial, cleanAdditional }