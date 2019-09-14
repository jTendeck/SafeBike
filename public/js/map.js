$(document).ready(function() {
  //Create map variable
  var map = L.map('mapid');

  L.mapbox.accessToken = 'pk.eyJ1IjoiZXNpbmFydGEiLCJhIjoiY2swanRkdGdqMGVneDNjb2N6MGJtc2loNCJ9.J6DmYxFleE5Secq-aRveRg';

  //Get OSM data
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
        tileSize: 512,
        zoomOffset: -1,
        attribution: '&copy; <a href="https://apps.mapbox.com/feedback/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

  //Set user location
  map.locate({
    setView: true,
    maxZoom: 16,
    timeout: 1000000000,
    enableHighAccuracy: true
  });

  L.Routing.control({
    waypoints: [
        L.latLng(49.284708, -123.112976),
        L.latLng(49.287414, -123.120618),
        L.latLng(49.282511, -123.128049),
        L.latLng(49.278638, -123.121950),
        L.latLng(49.284708, -123.112976)
    ],
    createMarker: function() { return null; }
  }).addTo(map);

  //Find user location and display marker
  function onLocationFound(e) {
    var radius = e.accuracy;
  
    L.marker(e.latlng).addTo(map)
      .bindPopup("You are here").openPopup();
  
    L.circle(e.latlng, radius).addTo(map);
  }

  map.on('locationfound', onLocationFound);

  function onLocationError(e) {
      alert(e.message);
  }
  
  map.on('locationerror', onLocationError);
});


