/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: http://koopjs.github.io/docs/usage/provider
*/
const request = require('request').defaults({
    gzip: true,
    json: true
})
const config = require('config')

function Model(koop) {
    this.idField = 'id';
}

// Public function to return data from the
// Return: GeoJSON FeatureCollection
//
// Config parameters (config/default.json)
// req.
//
// URL path parameters:
// req.params.host (if index.js:hosts true)
// req.params.id  (if index.js:disableIdParam false)
// req.params.layer
// req.params.method
Model.prototype.getData = function(req, callback) {
    const key = config.trimet.key

    // Call the remote API with our developer key
    request('http://localhost:8000/search/resources?tiles=true&mobiledownload=true&resourcecount=100&paging-filter=1', (err, res, body) => {
        if (err) return callback(err)

        // translate the response into geojson
        const geojson = translate(body)

        // Optional: cache data for 10 seconds at a time by setting the ttl or "Time to Live"
        // geojson.ttl = 10

        // Optional: Service metadata and geometry type
        geojson.metadata = {
            title: 'Koop Arches Provider',
            geometryType: 'MultiPolygon'
        }

        // hand off the data to Koop
        callback(null, geojson)
    })
}

function translate(input) {
    var features = []
    input.results.hits.hits.forEach(function(hit) {
        // if (hit._source.points.length > 0) features.push(formatFeature(hit));
        
        hit._source.geometries.forEach(function(geometry) {
            geometry.geom.features.forEach(function(feature) {
                feature.properties.displayname = hit._source.displayname;
                feature.properties.displaydescription = hit._source.displaydescription;
                features.push(feature);
            });
        })
    })
    return {
        type: 'FeatureCollection',
        features: features
    }
}

function formatFeature(inputFeature) {
    let point = inputFeature._source.points[0].point;
    const feature = {
        type: 'Feature',
        properties: {
            displayname: inputFeature._source.displayname,
            displaydescription: inputFeature._source.displaydescription
        },
        geometry: {
            type: 'Point',
            coordinates: [point.lon, point.lat]
        }
    }
    
    return feature
}

module.exports = Model

/* Example provider API:
   - needs to be converted to GeoJSON Feature Collection
{
  "resultSet": {
  "queryTime": 1488465776220,
  "vehicle": [
    {
      "tripID": "7144393",
      "signMessage": "Red Line to Beaverton",
      "expires": 1488466246000,
      "serviceDate": 1488441600000,
      "time": 1488465767051,
      "latitude": 45.5873117,
      "longitude": -122.5927705,
    }
  ]
}

Converted to GeoJSON:

{
  "type": "FeatureCollection",
  "features": [
    "type": "Feature",
    "properties": {
      "tripID": "7144393",
      "signMessage": "Red Line to Beaverton",
      "expires": "2017-03-02T14:50:46.000Z",
      "serviceDate": "2017-03-02T08:00:00.000Z",
      "time": "2017-03-02T14:42:47.051Z",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-122.5927705, 45.5873117]
    }
  ]
}
*/