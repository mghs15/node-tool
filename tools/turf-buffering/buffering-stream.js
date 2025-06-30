const fs = require('fs');
const path = require('path');
const turf = require('@turf/turf');

// 入力と出力設定
const inputFiles = ['input.geojson']; // 必要に応じて変更
const outputFile = 'output.ndjson'; // .geojson でも OK
const bufferDistance = 30/1000; // キロメートル単位（例: 100m = 0.1km）

const isNdjson = path.extname(outputFile) === '.ndjson';
const outputStream = fs.createWriteStream(outputFile, { flags: 'w' });

// GeoJSON Featureか確認
function isFeature(obj) {
  return obj && obj.type === 'Feature' && obj.geometry;
}

// バッファ処理（非同期1地物ずつ）
async function processFeature(feature) {
  const geomType = feature.geometry.type;
  let resultFeature;

  if (geomType === 'LineString' || geomType === 'MultiLineString') {
    try {
      const buffered = turf.buffer(feature, bufferDistance, { units: 'kilometers' });
      // 元の属性を維持
      resultFeature = turf.feature(buffered.geometry, feature.properties);
    } catch (err) {
      console.error('Buffer failed:', err);
      resultFeature = feature;
    }
  } else {
    resultFeature = feature;
  }

  // 書き出し
  if (isNdjson) {
    outputStream.write(JSON.stringify(resultFeature) + '\n');
  } else {
    return resultFeature;
  }
}

// メイン処理
(async () => {
  let allFeatures = [];

  for (const file of inputFiles) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));

    const features = data.type === 'FeatureCollection'
      ? data.features
      : [data];

    for (const feature of features) {
      if (!isFeature(feature)) continue;

      const processed = await processFeature(feature);
      if (!isNdjson && processed) {
        allFeatures.push(processed);
      }
    }
  }

  if (!isNdjson) {
    const outGeoJSON = {
      type: 'FeatureCollection',
      features: allFeatures
    };
    outputStream.write(JSON.stringify(outGeoJSON, null, 2));
  }

  outputStream.end();
  console.log('✅ 出力完了:', outputFile);
})();
