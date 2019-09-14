$(document).ready(function() {
  //Create map variable
  var map = L.map('mapid');

  //Set user location
  map.locate({
    setView: true,
    maxZoom: 16,
    timeout: 1000000000,
    enableHighAccuracy: true
  });

  //Get OSM data
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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