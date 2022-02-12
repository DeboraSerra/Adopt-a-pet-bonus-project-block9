const fetchAnimals = require('./allAnimals');
const types = require('./typesOfAnimals');

const ENDPOINTS = {
  baseUrl: 'https://api.petfinder.com/v2/animals',
  urlToFindTypes: 'https://api.petfinder.com/v2/types',
};

const TIME_IN_MILLISECONDS = 200;

const fetchSimulator = (url) => {
  if (typeof url === 'undefined') {
    return Promise.reject(new Error('Invalid url'));
  }
  const validUrl = Object.values(ENDPOINTS).includes(url);
  return Promise.resolve({
    status: validUrl ? 200 : 401,
    ok: validUrl,
    json: () => new Promise((resolve) => {
      setTimeout(() => {
        if (url === ENDPOINTS.baseUrl) {
          return resolve(fetchAnimals);
        }

        if (url.includes(`${ENDPOINTS.baseUrl}/?&type=`)) {
          let fetchAnimalOfType = fetchAnimals;
          let type = url.split('/?&type=');
          type = type[1];
          fetchAnimalOfType.animals = fetchAnimals.animals.filter((animal) => animal.type === type);
          return resolve(fetchAnimalOfType);
        }

        if (url === ENDPOINTS.urlToFindTypes) {
          return resolve(types);
        }

        return resolve({ results: [] });
      }, TIME_IN_MILLISECONDS);
    }),
  });
};

window.fetch = jest.fn(fetchSimulator);
afterEach(jest.clearAllMocks);

module.exports = fetchSimulator;
