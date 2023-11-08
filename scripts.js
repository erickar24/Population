var map = L.map('map').setView([37.8, -96], 4);

var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


fetch('Map.geojson')
    .then(response => response.json())
    .then(data => {
        var maxPopulation = Math.max(...data.features.map(feature => feature.properties.POPULATION));
        var proportionalOptions = {
            fillColor: 'blue', // Color of the circles
            fillOpacity: 0.6, // Opacity of the circles
        };

        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                var radius = Math.sqrt(feature.properties.POPULATION / maxPopulation) * 40;
                return L.circleMarker(latlng, {
                    radius: radius,
                    ...proportionalOptions
                }).bindPopup("Name: " + feature.properties.NAME + "<br>Population: " + feature.properties.POPULATION);
            }
        }).addTo(map);
    });

