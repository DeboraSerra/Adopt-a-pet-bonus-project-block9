/**
 * @jest-environment jsdom
 */

const fs = require('fs');

const text = fs.readFileSync('./index.html');
document.body.innerHTML = text;

require('../mocks/fetchSimulator');
const { getAnimalsByType } = require('../script2');
const { token } = require('../script2');

describe('Test the function getAnimalsByType', () => {
  it('tests if when the function getAnimalsByType is called with the parameter \'Dog\' the fetch function is called with the correct parameters', async () => {
    const url = 'https://api.petfinder.com/v2/animals/?&type=Dog';
    const requestInfo = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    };
    await getAnimalsByType('Dog');
    expect(fetch).toHaveBeenCalledWith(url, requestInfo);
  });
  it('tests if the object of the returned array have the correct keys', async () => {
    const expected = ['id', 'type', 'breeds', 'age', 'gender', 'size', 'tags', 'name', 'description', 'photos', 'status', 'email'];
    const response = await getAnimalsByType('Dog');
    response.forEach((animal) => expect(Object.keys(animal)).toEqual(expected));
  });
  it('tests if when the function getAnimalsByType is called with the parameter \'Cat\' it returns only the animals of the type \'Cat\'', async () => {
    const response = await getAnimalsByType('Cat');
    expect(response.every((animal) => animal.type === 'Cat')).toBe(true);
  });
});
