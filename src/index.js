import './css/styles.css';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { fetchCountries, data } from './fetchCountries';
import { outputData } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

// const DEFAULT_URL = 'https://restcountries.com/v3.1/name/';

// fetch(`${DEFAULT_URL}/Ukraine`);
export const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
// console.log(countryInfo);

inputSearch.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));
