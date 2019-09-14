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


