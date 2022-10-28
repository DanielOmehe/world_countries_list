import countries from "./data/countries.mjs";

const totalCountries = document.querySelector('.total-countries'),
searchCriteria = document.querySelector('.search-criteria'),
containCriteria = document.querySelector('.contain-criteria'),
total = document.querySelector('.total'),
totalResult = document.querySelector('.total-result'),
searchText = document.querySelector('.text'),
countriesList = document.getElementById('countries-list'),
startsWith = document.getElementById('start-with'),
contains = document.getElementById('contain'),
sortCountries = document.getElementById('sort'),
startsWithResult = document.querySelector('.startwith-result'),
containResult = document.querySelector('.contain-result');

totalCountries.textContent = countries.length;

countries.forEach(country => {
      countriesList.innerHTML += `<li class="country">${country.toUpperCase()}</li>`
});

startsWith.addEventListener('click', e => {
      startsWith.classList.toggle('change');
      contains.classList.remove('change');
      sortCountries.classList.remove('change');

      searchText.addEventListener('input', e => {
            let string;

            if(searchText.value === ''){
                  e.stopPropagation();
                  startsWithResult.classList.remove('show');
                  countriesList.innerHTML = '';
            }
            else{
                  if(searchText.value.length === 1){
                        string = searchText.value.toUpperCase();
                  }else{
                        string = upperFirst(searchText.value)
                  }
                  let filter = [];
      
                  countries.forEach(country => {
                        if(country.startsWith(string)) filter.push(country)
                  });

                  startsWithResult.classList.add('show');
                  containResult.classList.remove('show')
                  searchCriteria.textContent = string;
                  totalResult.textContent = filter.length;

                  countriesList.innerHTML = '';
                  filter.map(country => {
                        countriesList.innerHTML += `<li class="country">${country.toUpperCase()}</li>`;
                  })
            }
      })
});

contains.addEventListener('click', e => {
      startsWith.classList.remove('change');
      contains.classList.toggle('change');
      sortCountries.classList.remove('change');

      searchText.addEventListener('input', e => {
            let string;

            if(searchText.value === '') {
                  e.stopPropagation();
                  containResult.classList.remove('show')
            }
            else{
                  string = searchText.value;

                  let filter = [];

                  countries.forEach(country => {
                        if(country.includes(string)) filter.push(country);
                  })

                  containResult.classList.add('show');
                  startsWithResult.classList.remove('show');
                  containCriteria.textContent = string;
                  total.textContent = filter.length;

                  countriesList.innerHTML = '';

                  filter.map(country => {
                        countriesList.innerHTML += `<li class="country">${country.toUpperCase()}</li>`;
                  })
            }
      })
});

let sort = false;

sortCountries.onclick = (e) => {
      contains.classList.remove('change');
      sortCountries.classList.toggle('change');
      startsWith.classList.remove('change');

      countriesList.innerHTML = '';

      if(!sort){
            countries.sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0)).map(country => {
                  countriesList.innerHTML += `<li class="country">${country.toUpperCase()}</li>`
            });
            sortCountries.innerHTML = `<i class="fas fa-arrow-up"></i><sup>A</sup><sub>B</sub>`
            sort = true
      }else{
            countries.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).map(country => {
                  countriesList.innerHTML += `<li class="country">${country.toUpperCase()}</li>`
            })
            sortCountries.innerHTML = `<i class="fas fa-arrow-down"></i><sup>A</sup><sub>B</sub>`
            sort = false
      }
}


function upperFirst(string){
      return string.slice(0, 1).toUpperCase().concat(string.slice(1))
}