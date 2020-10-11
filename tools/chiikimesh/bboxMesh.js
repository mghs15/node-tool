//関数-------------------------------------

var bboxMesh = (mesh) => {

  if(!mesh.match(/^\d\d\d\d\d\d$/)){
    console.log("Warning: Argument is expexted 6 digits integer.");
    return;
  }
  
  var X = +mesh.substr(0, 2);
  var Y = +mesh.substr(2, 2);
  var x = +mesh.substr(4, 1);
  var y = +mesh.substr(5, 1);
  
  //console.log(X, Y, x, y);
  
  var minlon = (+Y + 100) + (  +y      * (7.5/60) );
  var maxlon = (+Y + 100) + ( (+y + 1) * (7.5/60) );
  var maxlat = (+X / 1.5) + ( (+x + 1) * (5/60) );
  var minlat = (+X / 1.5) + (  +x      * (5/60) );
  
  var bbox = [maxlon, maxlat, minlon, minlat];
  
  return bbox;

}

//実行---------------------------------

var mesh = process.argv[2];

var bbox = bboxMesh(mesh);

console.log(bbox);

