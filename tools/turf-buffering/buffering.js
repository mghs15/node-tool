const fs = require('fs');
const path = require('path');
const turf = require('@turf/turf');

// 入力GeoJSONファイルのパス一覧
const inputFiles = [
  'input.geojson',
  // 追加可能
];

// バッファの距離（例: 500 メートル）
const bufferDistance = 30;
const bufferUnits = 'meters'; // 'kilometers' なども可

let outputFeatures = [];

for (const file of inputFiles) {
  const geojson = JSON.parse(fs.readFileSync(file));

  const features = geojson.type === 'FeatureCollection'
    ? geojson.features
    : [geojson];

  for (const feature of features) {
    const geomType = feature.geometry.type;

    if (geomType === 'LineString' || geomType === 'MultiLineString') {
      // ライン系はバッファを付けて、属性をコピー
      const buffered = turf.buffer(feature, bufferDistance, { units: bufferUnits });
      buffered.properties = feature.properties || {};
      outputFeatures.push(buffered);
    } else {
      // その他はそのまま
      outputFeatures.push(feature);
    }
  }
}

// 出力用 GeoJSON（FeatureCollection）
const outputGeojson = {
  type: 'FeatureCollection',
  features: outputFeatures
};

// 書き出し
fs.writeFileSync('buffered_output.geojson', JSON.stringify(outputGeojson, null, 2));
console.log('出力完了: buffered_output.geojson');
