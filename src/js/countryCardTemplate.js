function countryCardTemplate(countries) {
  return countries
    .map(({ flags, name, capital, languages, population }) => {
      const lang = Object.values(languages).join(',  ');
      return `<div class="country-card">
  <img src="${flags.svg}" alt="${name.official}" width= 50>
<h2 class="country-name">${name.official}</h2>
<p class="country-capital">Capital:  <span>${capital}</span></p>
<p class="country-population">Population:  <span>${population.toLocaleString()}</span></p>
<p class="country-languages">Languages:  <span>${lang}</span></p>
</div>`;
    })
    .join('');
}
export default countryCardTemplate;
