/**
 * @jest-environment jsdom
 */

 require('../mocks/fetchSimulator');
 const { fetchAnimal } = require('../mocks/allAnimals');
 const { types } = require('../mocks/typesOfAnimals');
const { createTypeButtons } = require('../script2');

describe('Test the function createTypeButtons', () => {
  it('tests if animalTypes is an array of types', () => {
    const expected = ['Dog', 'Cat', 'Rabbit', 'Small & Furry', 'Horse', 'Bird', 'Scales, Fins & Other', 'Barnyard'];
    
  });
  it('tests if the buttons are created', () => {
    const expected = ['Dog', 'Cat', 'Rabbit', 'Small & Furry', 'Horse', 'Bird', 'Scales, Fins & Other', 'Barnyard'];
    
  })
})