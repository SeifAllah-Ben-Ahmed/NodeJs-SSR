/* eslint-disable */
import '@babel/polyfill';
import { login } from './login';
import { displayMap } from './mapbox';

//DOM Elements
const mapBox = document.getElementById('map');
const loginFor = document.querySelector('.form');

//DELEGATION

if (mapBox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );
  displayMap(locations);
}
if (loginFor) {
  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
