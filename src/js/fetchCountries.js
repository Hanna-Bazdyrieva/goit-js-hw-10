import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(country) {
  return fetch(
    `${BASE_URL}/name/${country}?fields=name,capital,population,flags,languages`
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
