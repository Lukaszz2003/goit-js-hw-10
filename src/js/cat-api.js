import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

axios.defaults.headers.common['x-api-key'] =
  live_97xII2qZqQff8ME2anlv4JVHUVR8D0EpoBLgZP3t8bYMvJqeN0BvS2sqI7nRVhSK;

const element = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

function fetchBreeds() {
  yesElement(loader);
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data;
    })

    .catch(error => {
      console.log(error);
      noElement(element);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      noElement(loader);
    });
}

function renderBreedsList(breeds) {
  const myOptions = breeds.map(breeds => {
    return {
      text: breed.name,
      value: breeds.id,
    };
  });

  opitons.unshift({
    text: 'Select breed',
    value: '',
    'data-placeholder': true,
  });

  new SlimSelect({
    select: 'Select breed',
    data: options,
    settings: {
      showSearch: false,
    },
  });

  addStyles();
}

fetchBreeds()
  .then(breeds => {
    renderBreedsList(breeds);
    yesElement(element);
  })
  .catch(error => {
    console.log(error);
    noElement(element);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data;
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      noElement(loader);
    });
}

function renderCatInfo(cat) {
  const image = cat[0].url;
  const name = cat[0].breeds[0].name;
  const description = cat[0].breeds.description;
  const temperament = cat[0].breeds.temperament;

  const catMarkup = `
    <img class ="card__image" src="${image}" alt="${name} image">
    <div class="card__content">
        <h2 class="card__heading">${name}</h2>
        <p class="card__description">${description}</p>
        <p class="card__text"><span class="bold">Temperament: </span>${temperament}</p>
    </div>
  `;

  catInfo.innerHTML = catMarkup;
}

element.addEventListener('change', () => {
  const selectBreed = element.value;
  if (selectBreed !== '') {
    yesElement(loader);
    noElement(catInfo);
    fetchCatByBreed(selectBreed)
      .then(cat => {
        renderCatInfo(cat);
        noElement(loader);
        yesElement(catInfo);
      })
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      });
  }
});

function noElement(element) {
  element.classList.add('hidden');
}

function yesElement(element) {
  element.classList.remove('hidden');
}

function addStyles() {
  element.classList.add('slim-select');
}
