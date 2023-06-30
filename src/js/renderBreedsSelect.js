import { breedSelect } from './index';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const renderBreedsSelect = breeds => {
  const markup = breeds
    .map(breed => {
      return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);

  new SlimSelect({
    select: '#single',
  });
};

export { renderBreedsSelect };
