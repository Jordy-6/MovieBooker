const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com'
    },
    {
        id: 3,
        name: 'Alice Jane Johnson',
        email: 'alice.johnson@example.com'
    }
];

function filter(tab, filter) {
    const newTab = tab.filter(tab => tab.name.includes(filter))
    return newTab;
}

const test = filter(users, "Jane");
console.log(test)