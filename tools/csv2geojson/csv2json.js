const fs = require('fs');

const filename = process.argv[2];
const key = +process.argv[3] ? +process.argv[3] : 0;
const separator = ",";
//console.log(filename + " の読み込み開始...");
const csv = fs.readFileSync(filename).toString();
//console.log(csv);
//console.log(separator + " で分割...");

const json = {};
let header = [];
let count = 0;


const lines = csv.split("\n");

lines.forEach( line => {
  const c = line.split(separator);
  
  if(count < 1){
    header = c;
    count += 1;
    return;
  }
  
  let keyName = c[key];
  if(!json[keyName]){
    json[keyName] = {};
  }else{
    keyName = keyName + "-" + count;
    json[keyName] = {};
  }
  
  const n = c.length;
  for(let i=0; i < n; i++){
    if(i === key){
      continue;
    }else{
      json[keyName][header[i]] = c[i];
    }
  }
  count += 1;
});

const res = JSON.stringify(json, null, 2);
console.log(res);



