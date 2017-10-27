var Person = require('./person.js');

var person = new Person({
    name: { first: 'Walter', last: 'White'}
});

console.log("%s is insane", person.name.full);

person.name.full = "Breaking Bad";

console.log("%s is insane", person.name.full);