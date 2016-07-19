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
    return results[Math.floor(Math.random() * results.length)];
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

console.log(returnHaiku());
console.log(returnHaiku(source));
