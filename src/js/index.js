import '../css/styles.css';
import fetchCountries from './fetchCountries';
import countryCardTemplate from './countryCardTemplate';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import getRefs from './getRefs';
import countryCardTemplate from './countryCardTemplate';

const DEBOUNCE_DELAY = 500;
const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function renderList(countries) {
  getRefs().info.innerHTML = '';
  getRefs().list.innerHTML = '';
  const markup = countries
    .map(
      ({ flags, name }) =>
        `<div><img src="${flags.svg}" alt="${name.official}" width= 20><h2 class="country-name country-name__list">${name.official}</h2></div>`
    )
    .join('');
  getRefs().list.innerHTML = markup;
}

function onSearch(e) {
  refs.body.style.backgroundImage = '';

  const country = e.target.value.trim();
  if (country !== '') {
    fetchCountries(country)
      .then(countries => {
        const number = countries.length;
        if (number > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else {
          renderList(countries);
        }
        if (number === 1) {
          renderCountryCard(countries);
          refs.body.style.backgroundImage = `url(${countries[0].flags.svg})`;
        }
      })
      .catch(error => console.log(error));
  } else {
    getRefs().list.innerHTML = '';
    getRefs().info.innerHTML = '';
  }
}

function renderCountryCard(countries) {
  refs.list.innerHTML = '';

  const markup = countryCardTemplate(countries);
  console.log('fetchCountries -> markup:', markup);

  refs.info.innerHTML = markup;
}
