# Turf.js によるバッファ付与

## 環境構築
```
npm install @turf/turf
```

## 要件
* 複数の GeoJSON ファイルを読み込む
* LineString または MultiLineString にバッファを適用（属性維持）
* バッファ距離は任意に指定可能
* その他の地物は変換せずそのまま含める

## 異なる処理方法
* `buffering.js` は、すべての地物の処理が終わった後に出力
* `buffering-stream.js` は、
  * 非同期で地物単位に処理（重い処理を避ける）
  * 出力形式：GeoJSONまたはNDJSON（拡張子により切替）

## 参考文献
* Turf.js
* ChatGPT を使用

