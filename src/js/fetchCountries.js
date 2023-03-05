import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getRefs from './getRefs';

// const BASE_URL = 'https:/restcountries.com/v3.1';

function fetchCountries(name) {
  getRefs().list.innerHTML = '';
  getRefs().info.innerHTML = '';
  return fetch(
    `https:/restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(error => {
      Notify.failure(`${'Oops, there is no country with that name...'}`);
    });
}
export default fetchCountries;
