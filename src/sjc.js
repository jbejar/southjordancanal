

import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import { LocateControl } from "leaflet.locatecontrol";
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import $ from "jquery/dist/jquery.slim.js"
import sjc from "./canal.json"
import useChat from "./chat.js";


var map = L.map('map').setView([40.568032, -111.929995], 11);
var token = "pk.eyJ1IjoiamJlamFyIiwiYSI6ImNtODE3YWk5cDEzMncybnE0NmUyM3UzZ2cifQ.pgRNleoNLjuKVTzIc_P3Tg" // Mapbox
var apiKey = "AIzaSyCzTpF4k7rKOyavMStBYjqBxanEhTQXGLI"; //Google
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + token, {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);
var myStyle = {
    "color": "#307BFF",
    "weight": 12,
    "opacity": 0.65
};
L.geoJSON(sjc, {
    style: myStyle
}).addTo(map);
var lc = new LocateControl({
    flyTo: true,
    keepCurrentZoomLevel: true
}).addTo(map);
// Create a geocoding control
const geocoder = L.Control.geocoder({ geocoder: new L.Control.Geocoder.Google({ apiKey }) });

//     // Add it to the map
geocoder.addTo(map);

// Handle the result when a location is selected
geocoder.on('markgeocode', function (e) {
    const latlng = e.geocode.center;
    map.flyTo(latlng, 15);

    // Optionally add a marker
    L.marker(latlng).addTo(map);
});

$("#locate").click(function (e) {
    e.preventDefault();
    lc.start();
});

document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    const handleUserMessage = useChat(addMessage);

    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            handleUserMessage(message);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            handleUserMessage(chatInput.value.trim());
            chatInput.value = '';
        }
    });

    // Initial greeting
    addMessage("Hello! How can I help you with questions about the South Jordan Canal Company?");
    const chatWidget = document.querySelector('.chat-widget');
    const closeButton = document.querySelector('.chat-close-btn');
    const openButton = document.querySelector('.chat-open-btn');
    
    closeButton.addEventListener('click', () => {
        chatWidget.classList.add('hidden');
        openButton.classList.remove('hidden');
    });
    
    openButton.addEventListener('click', () => {
        chatWidget.classList.remove('hidden');
        openButton.classList.add('hidden');
    });


});