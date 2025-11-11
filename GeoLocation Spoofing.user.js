// ==UserScript==
// @name        GeoLocation Spoofing
// @description Spoof Geolocation
// @match       *://*/*
// @run-at      document-start
// ==/UserScript==

// NOTE: can't get this to work (yet)

const location = 'nyc';

const cities = {
  nyc: {
    name: 'New York',
    latitude: 40.7128,
    longitude: -74.0060,
    timezone: 'America/New_York'
  },
  london: {
    name: 'London',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London'
  },
  tokyo: {
    name: 'Tokyo',
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: 'Asia/Tokyo'
  },
  sydney: {
    name: 'Sydney',
    latitude: -33.8688,
    longitude: 151.2093,
    timezone: 'Australia/Sydney'
  },
  dubai: {
    name: 'Dubai',
    latitude: 25.2048,
    longitude: 55.2708,
    timezone: 'Asia/Dubai'
  },
  paris: {
    name: 'Paris',
    latitude: 48.8566,
    longitude: 2.3522,
    timezone: 'Europe/Paris'
  },
  losAngeles: {
    name: 'Los Angeles',
    latitude: 34.0522,
    longitude: -118.2437,
    timezone: 'America/Los_Angeles'
  },
  singapore: {
    name: 'Singapore',
    latitude: 1.3521,
    longitude: 103.8198,
    timezone: 'Asia/Singapore'
  },
  moscow: {
    name: 'Moscow',
    latitude: 55.7558,
    longitude: 37.6173,
    timezone: 'Europe/Moscow'
  },
  sao_paulo: {
    name: 'São Paulo',
    latitude: -23.5505,
    longitude: -46.6333,
    timezone: 'America/Sao_Paulo'
  },
  mumbai: {
    name: 'Mumbai',
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: 'Asia/Kolkata'
  },
  cairo: {
    name: 'Cairo',
    latitude: 30.0444,
    longitude: 31.2357,
    timezone: 'Africa/Cairo'
  }
};

const selectedCity = cities[location];

navigator.geolocation.getCurrentPosition = function(success) {
  success({
    coords: {
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude
    },
    timestamp: Date.now()
  });
};

Intl.DateTimeFormat.prototype.resolvedOptions = function() {
  return { timeZone: selectedCity.timezone };
};