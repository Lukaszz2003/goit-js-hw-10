const API_KEY =
  live_97xII2qZqQff8ME2anlv4JVHUVR8D0EpoBLgZP3t8bYMvJqeN0BvS2sqI7nRVhSK;

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, { 'x-api-key': `${API_KEY}` }).then(
    result =>
      result.json().then(data => {
        return data;
      })
  );
}

function fetchCatByBreed(id) {
  return fetch(
    `${BASE_URL}/images/search?&api_key=${API_KEY}&breed_ids=${id}`
  ).then(result =>
    result.json().then(data => {
      // GET PIC
      const dataName = data[0].breeds[0];

      const catInfo = {
        pic: data[0].url,
        name: dataName.name,
        desc: dataName.description,
        temper: dataName.temperament,
        id: dataName.id,
      };

      return catInfo;
    })
  );
}

export { fetchBreeds, fetchCatByBreed };
