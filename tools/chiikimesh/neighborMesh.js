//関数-------------------------------------

var neighborList = (mesh) => {

  if(!mesh.match(/^\d\d\d\d\d\d$/)){
    console.log("Args is expexted 6 digits integer.");
    return;
  }
  
  var X = mesh.substr(0, 2);
  var Y = mesh.substr(2, 2);
  var x = mesh.substr(4, 1);
  var y = mesh.substr(5, 1);
  
  //console.log(X, Y, x, y);
  
  var list = [];
  
  for(var sx = -1; sx < 2; sx++){
    for(var sy = -1; sy < 2; sy++){
      var nbmesh = shiftMesh(X, Y, x, y, sx, sy)
      list.push(nbmesh);
    }
  }
  
  return list;

}

var shiftMesh = (X, Y, x, y, sx, sy) => {

  //console.log(X, Y, x, y, sx, sy);
  
  var rx = +x + +sx;
  var ry = +y + +sy;
  var rX = +X;
  var rY = +Y;
  
  if(rx > 7){
    rx = +rx - 8;
    rX = +rX + 1;
  }
  
  if(rx < 0){
    rx = +rx + 8;
    rX = +rX - 1;
  }
  
  if(ry > 7){
    ry = +ry - 8;
    rY = +rY + 1;
  }
  
  if(ry < 0){
    ry = +ry + 8;
    rY = +rY - 1;
  }
  
  //console.log(rX, rY, rx, ry);
  
  var res = "" + rX + rY + rx + ry;
  return res;

}

//実行---------------------------------

var mesh = process.argv[2];

var list = neighborList(mesh);

console.log(list);

