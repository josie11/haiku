var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');
var library = formatData(cmudictFile);

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){
   var lines = data.toString().split("\n"), library = {};
   for(let line of lines) {
    let lineSplit = line.split(/(?:\(\d\))*  /);
    let PhenomeCount = lineSplit[1].match(/\w+/g).length;
    if (library.hasOwnProperty(PhenomeCount)) {
      library[PhenomeCount].push(lineSplit[0]);
    } else {
      library[PhenomeCount] = [lineSplit[0]];
    }
  };
  return library;
}

function getWord(n) {
  wordArr = library[n];
  return wordArr[Math.floor(Math.random() * wordArr.length)];
}

function createHaiku(structure) {
  let haiku = [];
  for(let arr of structure) {
    let segment = [];
    for(let n of arr) segment.push(getWord(n));
    haiku.push(segment.join(' '));
  }
  return haiku.join('\n');
}

exports.createHaiku = createHaiku;
