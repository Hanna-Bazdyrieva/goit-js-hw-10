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
  clearMarkup(refs.info);
  clearMarkup(refs.list);
  refs.list.insertAdjacentHTML('beforeend', setListMarkup(countries));
}

function onSearch(e) {
  removeBodyBackgroundImage();

  const country = e.target.value.trim();
  if (country !== '') {
    clearMarkup(refs.info);
    clearMarkup(refs.list);
    fetchCountries(country)
      .then(countries => {
        const countriesNumber = countries.length;
        if (countriesNumber > 10) {
          showNotifyInfo(
            'Too many matches found. Please enter a more specific name.'
          );
        } else {
          renderList(countries);
        }
        if (countriesNumber === 1) {
          clearMarkup(refs.list);
          renderCountryCard(countries);
          setBodyBackgroundImage(countries);
        }
      })
      .catch(error => console.log(error));
  } else {
    clearMarkup(refs.list);
    clearMarkup(refs.info);
  }
}

function renderCountryCard(countries) {
  refs.info.insertAdjacentHTML('beforeend', countryCardTemplate(countries));
}
function setListMarkup(countries) {
  return countries
    .map(
      ({ flags, name }) =>
        `<li><img src="${flags.svg}" alt="${name.official}" width= 20><h2 class="country-name country-name__list">${name.official}</h2></li>`
    )
    .join('');
}
function clearMarkup(el) {
  return (el.innerHTML = '');
}
function setBodyBackgroundImage(country) {
  refs.body.style.backgroundImage = `url(${country[0].flags.svg})`;
}
function removeBodyBackgroundImage() {
  refs.body.style.backgroundImage = '';
}
function showNotifyInfo(message) {
  Notify.info(message);
}
