const fs = require('fs');

var filename = process.argv[2];
var separator = ",";
console.log(filename + " の読み込み開始...");
var csv = fs.readFileSync(filename).toString();
//console.log(csv);
//console.log(separator + " で分割...");

var geojson = {
  "type": "FeatureCollection",
  "features": []
};


//Reference: Slippy map tilenames
//https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
tile2long = (x,z) => {
  return (x/Math.pow(2,z)*360-180);
}
tile2lat = (y,z) => {
  var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
  return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}
//until here

parsexyz = (tile) => {
  var xyz = tile.split("/");
  xyz[2] = xyz[2].split(".")[0];
  var x = xyz[1]*1 + 0.5;
  var y = xyz[2]*1 + 0.5;
  var z = xyz[0]*1;
  return {"x": x, "y": y, "z": z};
}

xyz2lonlat = (x, y , z) => {
  var lon = tile2long(x, z);
  var lat = tile2lat(y, z);
  return [lon, lat];
}

var lines = csv.split("\n");

var tmpjson = {};

for(i in lines){
  var columns = lines[i].split(separator);
  
  if(tmpjson[columns[0]]){
    tmpjson[columns[0]][1] = tmpjson[columns[0]][1] * 1 + columns[1] * 1;
    tmpjson[columns[0]][2] = tmpjson[columns[0]][2] * 1 + columns[2] * 1;
  }else{
    tmpjson[columns[0]] = columns;
  }
}

console.log(tmpjson);

for(name in tmpjson){
  var tile = parsexyz(name);
  
  var f = {
    "type": "Feature",
    "properties": {
      "tile": name,
      "prop1": tmpjson[name][1] * 1,
      "prop2": tmpjson[name][2] * 1
    },
    "geometry": {
      "type": "Point",
      "coordinates": xyz2lonlat(tile.x, tile.y, tile.z)
    }
  };
  
  geojson.features.push(f);
  
}

var resstring = JSON.stringify(geojson, null, 4);

var outdir = "res-" + filename.replace("/", "-") + ".geojson";
fs.writeFileSync(outdir, resstring);
console.log(outdir + "へ出力完了");

