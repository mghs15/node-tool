//関数-------------------------------------

const mesh2bbox = (mesh) => {

  if(mesh.match(/^\d\d\d\d\d\d$/)){ //2次メッシュ
    const X = +mesh.substr(0, 2);
    const Y = +mesh.substr(2, 2);
    const x = +mesh.substr(4, 1);
    const y = +mesh.substr(5, 1);
    
    //console.log(X, Y, x, y);
    
    const minlon = (+Y + 100) + (  +y      * (7.5/60) );
    const maxlon = (+Y + 100) + ( (+y + 1) * (7.5/60) );
    const maxlat = (+X / 1.5) + ( (+x + 1) * (5/60) );
    const minlat = (+X / 1.5) + (  +x      * (5/60) );
    
    const bbox = [maxlon, maxlat, minlon, minlat];
    
    return bbox;    
    
  }else if(mesh.match(/^\d\d\d\d\d\d\d\d$/)){
    const X  = +mesh.substr(0, 2);
    const Y  = +mesh.substr(2, 2);
    const x  = +mesh.substr(4, 1);
    const y  = +mesh.substr(5, 1);
    const xx = +mesh.substr(6, 1);
    const yy = +mesh.substr(7, 1);
      
    //console.log(X, Y, x, y);
    
    const minlon = (+Y + 100) + (  +y * (7.5/60) ) + (  +yy      * (0.75/60));
    const maxlon = (+Y + 100) + (  +y * (7.5/60) ) + ( (+yy + 1) * (0.75/60));
    const maxlat = (+X / 1.5) + (  +x * (5/60) )   + ( (+xx + 1) * (0.5/60));
    const minlat = (+X / 1.5) + (  +x * (5/60) )   + (  +xx      * (0.5/60));
    
    const bbox = [maxlon, maxlat, minlon, minlat];
    
    return bbox;
    
  }else{
    console.log("Warning: Argument is expexted 6 or 8 digits integer.");
    return;
  }

}

const bbox2poly = (bbox, prop = {}) => {
  
  return {
      "type": "Feature",
      "properties": prop,
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [bbox[2], bbox[1]],
          [bbox[0], bbox[1]],
          [bbox[0], bbox[3]],
          [bbox[2], bbox[3]],
          [bbox[2], bbox[1]]
        ]
      }
  };
  
}



//実行---------------------------------

const mesh = process.argv[2];

const bbox = mesh2bbox(mesh);

const poly = bbox2poly(bbox, {"mesh": mesh});

console.log(poly);
