function cleanInitial(data) {
    var friends = removeDuplicate(data.friends, data.id);
    
    // create links
    const links = friends.map(
        function(x) { return mapEdge(data, x) }
    );

    // adds self to nodes list
    friends.push({
        id: data.id,
        name: data.name,
        element: data.element
    });
    const nodes = friends.map(mapNode);
    
    return { nodes, links };
}

function cleanAdditional(newData, existing) {
    var newFriends = removeDuplicate(newData.friends);

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
    const index = existingID.indexOf(newData.id);
    if (index === -1) {
        newFriends.push({
            id: newData.id,
            name: newData.name,
            element: newData.element
        });
    }
    var newNodes = newFriends.map(mapNode);

    // merge with existing
    var nodes = newNodes.concat(existing.nodes);
    var links = newLinks.concat(existing.links);

    return { nodes, links };
}

function removeDuplicate(friends, selfId) {
    // removes duplicates
    var result = friends.filter((v, i, a) => 
        a.findIndex(f => f.id === v.id) === i);

    // excludes self from friends list
    const index = result.map(function(e) { return e.id }).indexOf(selfId);
    if (index > -1) {
        result.splice(index, 1);
    }

    return result;
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
        name: person.name
    })
}

function mapEdge(person, friend) {
    return ({
        source: person.id,
        target: friend.id
    });
}

export { cleanInitial, cleanAdditional }