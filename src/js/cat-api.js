import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_97xII2qZqQff8ME2anlv4JVHUVR8D0EpoBLgZP3t8bYMvJqeN0BvS2sqI7nRVhSK';

const element = document.querySelector('.breed-select');
const catInfo = document.querySelector('cat-info');

function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(respons => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data;
  });
}

function renderBreedsList(breeds) {
  const markup = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  element.innerHTML = markup;
}

function fetchCatByBreed(breedId) {
  return axios
    .get('https://api.thecatapi.com/v1/images/search?breed_ids={breedId}')
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data;
    });
}

function catInfoRender(cat) {
  const image = cat[0].url;
  const name = cat[0].breeds[0].name;
  const description = cat[0].breeds[0].description;
  const temperament = cat[0].breeds[0].temperament;

  const catMarkup = `<img src="${image}" alt="${name} image">
  <h2>${name}</h2>
  <p>${description}</p>
  <p>${temperament}</p>`;

  catInfo.innerHTML = catMarkup;
}

fetchBreeds()
  .then(breeds => renderBreedsList(breeds))
  .catch(error => console.log(error));

element.addEventListener('change', () => {
  const select = element.value;
  console.log(select);
  fetchCatByBreed(select)
    .then(cat => catInfoRender(cat))
    .catch(error => console.log(error));
});
