import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

axios.defaults.headers.common['x-api-key'] =
  live_97xII2qZqQff8ME2anlv4JVHUVR8D0EpoBLgZP3t8bYMvJqeN0BvS2sqI7nRVhSK;

const element = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
