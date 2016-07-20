//uses node syllable
var syllable = require('syllable');
var fs = require('fs');
var text = formatData(readFile('./' + process.argv[2]));

function readFile(file){
  return fs.readFileSync(file).toString();
}

//pulls out only words from the texts
function formatData(data){
   return data.toString().match(/\b\w+'?s?[^\\n\s*]?\b/gi);
}

function findHaiku(structure) {
  let pattern = structure.toString().split(',');
  let haikus = []
  for(let i = 0; i < text.length - pattern.length; i++) {
    if(syllable(text[i]) == pattern[0]) {
      let phrase = text.slice(i, i + pattern.length);
      let syllables = phrase.map(function(word) {return syllable(word); });
      if (syllables.join('') == pattern.join('')) haikus.push(phrase);
    }
  }
  return haikus;
}

exports.findHaiku = findHaiku;
