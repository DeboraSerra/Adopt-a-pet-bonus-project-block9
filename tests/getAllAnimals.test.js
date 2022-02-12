/**
 * @jest-environment jsdom
 */

const fs = require('fs');

const text = fs.readFileSync('./index.html');
document.body.innerHTML = text;

require('../mocks/fetchSimulator');
const { getAllAnimals } = require('../script2');
const { token } = require('../script2');

describe('Test the function getAllAnimals', () => {
  it('tests if the function getAllAnimals calls the function fetch with the correct parameters', async () => {
    const url = 'https://api.petfinder.com/v2/animals';
    const requestInfo = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    };
    await getAllAnimals();
    expect(fetch).toHaveBeenCalledWith(url, requestInfo);
  });
  it('tests if the objects of the returned array have the correct keys', async () => {
    const expected = ['id', 'type', 'breeds', 'age', 'gender', 'size', 'tags', 'name', 'description', 'photos', 'status', 'email'];
    const response = await getAllAnimals();
    response.forEach((animal) => expect(Object.keys(animal)).toEqual(expected));
  });
});
