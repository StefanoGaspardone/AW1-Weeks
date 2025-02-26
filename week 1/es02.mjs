const users = 'Luigi De Russis, Luca Scibetta, Fulvio Corno, Francesca Russo';

const names = users.split(',').map(name => name.trim());
console.log(names);

const acronyms = [...names].map(name => {
    let str = '';

    name.split(' ').forEach(n => str += n[0].toUpperCase());
    return str;
});
console.log(acronyms);

const obj = names.map((name, index) => ({x: name, y: acronyms[index]}));
obj.sort((a, b) => a.y.localeCompare(b.y));
obj.forEach(a => console.log(`Name: ${a.x}, acronym: ${a.y}`));