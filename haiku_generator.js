var cmuDict = require('./cmu_dict');
var haikuFinder = require('./haiku_finder');

var source = process.argv[2];

function returnHaiku(source) {
  if (source === undefined) {
    return cmuDict.createHaiku(haikuStructure());
  } else {
    let structure = haikuStructure();
    let results = haikuFinder.findHaiku(structure);
    while (results.length == 0) {
      structure = haikuStructure();
      results = haikuFinder.findHaiku(structure);
    };
    return formatResults(structure, results[Math.floor(Math.random() * results.length)]);
  }
}

function haikuStructure() {
  return [5,7,5].map(function(n) {
    let total = 0;
    let arr = [];
    while (total < n) {
      let rand = Math.floor(Math.random() * (n - total)) + 1;
      total += rand;
      arr.push(rand);
    }
    return arr;
  })
}

function formatResults(struct, haiku) {
  let part1 = haiku.splice(0, struct[0].length).join(' ');
  let part2 = haiku.splice(0, struct[1].length).join(' ');
  return [part1, part2, haiku.join(' ')].join('\n');
}

console.log(returnHaiku());
console.log(returnHaiku(source));
