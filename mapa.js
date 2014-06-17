// JavaScript Document
$(document).ready(function(){
var map;
var geocoder;
var bounds = new google.maps.LatLngBounds();
var markersArray = [];

var llegada = new google.maps.LatLng(-34.6709787, -58.40962139999999);
var origen= new google.maps.LatLng(-34.668864,-58.404436);

var origenIcon = 'img/iconomapa.png';
var alsinaIcon = 'img/iconomapa.png';

function inicializar() {
var opts = {center: new google.maps.LatLng(-34.6709787, -58.40962139999999),zoom: 14};
map = new google.maps.Map(document.getElementById('map-canvas'), opts);
geocoder = new google.maps.Geocoder();
calculateDistances();
}

function calculateDistances() {
var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix({
origins: [origen],
destinations: [llegada],
travelMode: google.maps.TravelMode.DRIVING,
unitSystem: google.maps.UnitSystem.METRIC,
avoidHighways: false,
avoidTolls: false}, callback);}

function callback(response, status) {
if (status != google.maps.DistanceMatrixStatus.OK) {
alert('Error: ' + status);
} else {
var origins = response.originAddresses;
var destinations = response.destinationAddresses;
var salida = '';//defino variable para mostrar la respuesta
var results = response.rows[0].elements;
salida +=results[0].distance.text;
addMarker(origins[0]);
addMarker(destinations[0],salida);
}
}

function addMarker(location, salida) {	
var icon=origenIcon;
var marker = new google.maps.Marker({ map: map,position: llegada,icon: icon});
var markerUno = new google.maps.Marker({map: map,position: origen,icon: icon});
if(salida){
salida='Distancia entre los dos puntos: <b>'+salida+'</b>';
infowindow = new google.maps.InfoWindow({map: map,position: origen,content: salida});
infowindow.open(map,markerUno);
}
}

google.maps.event.addDomListener(window, 'load', inicializar);
});//cierra el document
