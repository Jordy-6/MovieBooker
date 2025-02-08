
let userTest = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    password : 'test'
};

function generateToken(user) {
    const json = JSON.stringify(user);
    return btoa(json)
};

function verifyToken(token) {
    const json = atob(token);
    return JSON.parse(json)
}

const result = generateToken(userTest)
const resultDecoded = verifyToken(result)

console.log("token :", result);
console.log("user :", resultDecoded)

