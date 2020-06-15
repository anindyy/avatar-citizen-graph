function clean(data) {
    var friends = data.friends.filter((v, i, a) => a.indexOf(v) === i);
    const index = friends.map(function(e) { return e.id }).indexOf(data.id);
    if (index > -1) {
        friends.splice(index, 1);
    }
    
    const edges = friends.map(
        function(x) { return mapEdge(data, x) }
    );

    friends.push({
        id: data.id,
        name: data.name,
        element: data.element
    });

    const nodes = friends.map(mapNode);

    return { nodes, edges };
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
        label: person.name,
        title: `ID: ${person.id}, elmt: ${person.element}`
    })
}

function mapEdge(person, friend) {
    return ({
        from: person.id,
        to: friend.id
    });
}

export { clean }