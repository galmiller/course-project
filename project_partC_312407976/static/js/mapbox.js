const points = document.getElementById("points");
mapboxgl.accessToken = document.getElementById("maptoken").value;

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [35, 31.8516],
  zoom: 7
});

const courts=JSON.parse(points.value);


map.on('style.load', function (e) {
  const features = [];
  courts.map((elm, i) => {
    features.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": elm.coordinates
      },
      "properties": {
        "modelId": i + 1,
      }
    })
  })

  map.addSource('markers', {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": features
    }
  });
  
  map.addLayer({
    "id": "circles1",
    "source": "markers",
    "type": "circle",
    "paint": {
      "circle-radius": 5,
      "circle-color": "#e56d04",
      "circle-opacity": 0.7,
      "circle-stroke-width": 0,
    }
  });
});