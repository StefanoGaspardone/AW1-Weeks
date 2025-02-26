const scores = [12, -5, 7, -20, 3, -8, 15, -2, 9, -11];
const scoresCopy = [];
let NN = 0;

for(const score of scores)
    if(score >= 0) scoresCopy.push(score);
    else NN++;
    
scoresCopy.splice(scoresCopy.indexOf(Math.min(...scoresCopy)), 1);
scoresCopy.splice(scoresCopy.indexOf(Math.min(...scoresCopy)), 1);

// scoresCopy.sort((a, b) => a - b);
// scoresCopy.shift();
// scoresCopy.shift();

let avg = 0;
for(const score of scoresCopy)
    avg += score;
avg /= scoresCopy.length;

for(let i = 0; i < NN + 2; i++)
    scoresCopy.push(Math.round(avg));

console.log(scores);
console.log(scoresCopy);