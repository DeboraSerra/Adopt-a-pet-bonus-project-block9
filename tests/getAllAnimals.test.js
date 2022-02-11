/**
 * @jest-environment jsdom
 */

 require('../mocks/fetchSimulator');
 const { fetchAnimal } = require('../mocks/allAnimals');
 const { types } = require('../mocks/typesOfAnimals');
 const createAnimalsCards = require('../script2');
const { getAllAnimals } = require('../script2');

describe('Test the function getAllAnimals', () => {
  it('tests if the returned objects have the right keys', async () => {
    const expected = ['id', 'type', 'breeds', 'age', 'gender', 'size', 'tags', 'name', 'description', 'photos', 'status', 'email'];
    const response = await getAllAnimals();
    expect(Object.keys(response)).toEqual(expected);
  })
})