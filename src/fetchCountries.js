import { inputSearch } from './index';

const DEFAULT_URL = 'https://restcountries.com/v3.1/name';
const countryInfo = document.querySelector('.country-info');
export let outputData;
export function fetchCountries(name) {
  // console.dir(inputSearch);
  if (inputSearch.value !== '') {
    const input = inputSearch.value;
    const inputTrim = input.trim();
    //   const resp = fetch(`${DEFAULT_URL}/${input}`);
    const resp = fetch(
      `https://restcountries.com/v3.1/name/${inputTrim}?fields=name,capital,population,flags,languages`
    );

    resp
      .then(responce => {
        if (!responce.ok) {
          throw new Error();
        }
        return responce.json();
      })
      .then(data => {
        if (data.length >= 10) {
          // Notify.success(
          //   `❌ Too many matches found. Please enter a more specific name.`
          // );
          alert(
            `❌ Too many matches found. Please enter a more specific name.`
          );
        }
        if (data.length > 2 && data.length < 10) {
          const markupCountries = createMarkupFewCountries(data);
          countryInfo.innerHTML = markupCountries;
        }
        if (data.length === 1) {
          const markupCountry = createMarkupOneCountry(data);
          countryInfo.innerHTML = markupCountry;
        }

        console.log(data.length);
      })
      .catch(err => alert(`❌ Oops, there is no country with that name.`));
  }
  if (inputSearch.value === ' ') {
    inputSearch.value === '';
    return;
  }
  countryInfo.innerHTML = '';
  return;
}

function createMarkupOneCountry(arr) {
  return arr
    .map(
      item =>
        `<li class='item'>
        <h2>Country: <img src="${item.flags.svg}" alt="flag" width=30> ${
          item.name.official
        }</h2>
        <p>Capital: ${item.capital}</p>
        <p>Population: ${item.population}</p>
        <p>Languages: ${Object.values(item.languages)}</p></li>`
    )
    .join('');
}

function createMarkupFewCountries(arr) {
  return arr
    .map(
      item =>
        `<li class='item'>
        <h2><img src="${item.flags.svg}" alt="flag" width=40 height=30> ${item.name.official}</h2>
        </li>`
    )
    .join('');
}

// console.dir(inputSearch);
