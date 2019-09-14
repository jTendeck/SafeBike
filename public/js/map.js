$(document).ready(function() {
  //Create map variable
  var map = L.map('mapid');

  L.mapbox.accessToken = 'pk.eyJ1IjoiZXNpbmFydGEiLCJhIjoiY2swanRkdGdqMGVneDNjb2N6MGJtc2loNCJ9.J6DmYxFleE5Secq-aRveRg';

  //Get OSM data
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
        tileSize: 512,
        zoomOffset: -1,
        attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
    routeWhileDragging: true,
    createMarker: function() { return null; }
  }).addTo(map);


  drawRoute(map);


  //Find user location and display marker
  function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
      .bindPopUp("You are here").openPopUp();

    L.circle(e.latlng, radius).addTo(map);
  }





  map.on('locationfound', onLocationFound);

  function onLocationError(e) {
      alert(e.message);
  }
  
  map.on('locationerror', onLocationError);


  
});


function drawRoute(map) {
  var pointA = new L.LatLng(49.284117, -123.115272);
  var pointB = new L.LatLng(49.2907511,-123.1311936);
  var pointC = new L.LatLng(49.2847032,-123.1389782);
  var pointD = new L.LatLng(49.2761433,-123.1253955);
  var pointE = new L.LatLng(49.284117, -123.115272);
  var pointList = [pointA, pointB, pointC, pointD, pointE];

  var firstpolyline = new L.Polyline(pointList, {
  color: 'red',
  weight: 3,
  opacity: 0.5,
  smoothFactor: 1
});
firstpolyline.addTo(map);

}