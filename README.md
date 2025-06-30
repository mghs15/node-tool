# node-tool
Mini tools on Node.js.

## csv2geojson
Convert xyz tile path (i.e. {z}/{x}/{y}.ext) in a csv file to lnglat as a GeoJSON file. 

usage

```node csv2geojson.js ./your/filepath_to.csv```

merge same tiles as below (all properties excluding xyz tile path have to be number)

```node csv2geojson_merge.js ./your/filepath_to.csv```

### 参考文献

* https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames


## simple_mk_parser

くわしくはこちら

https://github.com/mghs15/node-tool/blob/master/tools/simple_mk_parser/index.md


## chiikimesh

地域メッシュ（第２次地域区画）に関するツール。

### 参考文献

* https://www.stat.go.jp/data/mesh/pdf/gaiyo1.pdf

## styleAnalysis

Mapbox Styleの構造をチェックするツール

## stream (メモ段階)

モジュール`readline`を用いた、ファイルの読み書きに関連するコードのメモ

## turf-buffering

Turf.js を用いて地物にバッファを付けるツール


