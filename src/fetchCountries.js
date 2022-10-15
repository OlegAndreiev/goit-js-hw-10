import { inputSearch } from './index';

const DEFAULT_URL = 'https://restcountries.com/v3.1/name';
const countryInfo = document.querySelector('.country-info');
export let outputData;
export function fetchCountries(name) {
  const input = inputSearch.value;
  //   const resp = fetch(`${DEFAULT_URL}/${input}`);
  const resp = fetch(
    `https://restcountries.com/v3.1/name/${input}?fields=name,capital,population,flags,languages`
  );

  resp
    .then(responce => {
      if (!responce.ok) {
        throw new Error();
      }
      return responce.json();
    })
    .then(data => {
      const markup = createMarkup(data);
      countryInfo.innerHTML = markup;
    })
    .catch(err => console.log(err));
}

function createMarkup(arr) {
  return arr
    .map(
      item =>
        `<li class='item'>
        <h2>Country: <img src="${item.flags.svg}" alt="flag" width=30> ${
          item.name.official
        }</h2>
        <p>Capital: ${item.capital}</p>
        <p>Population: ${item.population}</p>
        <p>languages: ${Object.values(item.languages)}</p></li>`
    )
    .join('');
}
