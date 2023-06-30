import { loaderEl, breedSelect } from './index';
import { fetchBreeds } from './cat-api';
import { renderBreedsSelect } from './renderBreedsSelect';

const fetchAndRenderBreeds = () => {
  loaderEl.classList.remove('unvisible');
  fetchBreeds()
    .then(breeds => renderBreedsSelect(breeds))
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      loaderEl.classList.add('unvisible');
      breedSelect.classList.remove('unvisible');
    });
};

export { fetchAndRenderBreeds };
