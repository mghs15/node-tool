# node-tool
Mini tools on Node.js.

## csv2geojson
Convert xyz tile path (i.e. {z}/{x}/{y}.ext) in a csv file to lnglat as a GeoJSON file. 

usage
```node csv2geojson.js ./your/filepath_to.csv```

merge same tiles as below (all properties excluding xyz tile path have to be number)
```node csv2geojson_merge.js ./your/filepath_to.csv```


