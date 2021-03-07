const fs = require("fs");


/*************************************************/
/*実行                                           */
/*************************************************/

//入出力・処理
var infile = process.argv[2];
var outfile = process.argv[3];
if(!outfile) outfile = "test.json";
var outfile2 = "docs/data/" + outfile;

var content = fs.readFileSync(infile).toString();
var style = JSON.parse(content);

//var intermediateObj = {};
 
//各レイヤに対する処理
for(i in style.layers){
  console.log(i, style.layers[i]["source-layer"], style.layers[i].id, style.layers[i].minzoom, style.layers[i].maxzoom);
}

/*
var resstring = JSON.stringify(intermediateObj, null, 4);
fs.writeFileSync(outfile, resstring);
*/
