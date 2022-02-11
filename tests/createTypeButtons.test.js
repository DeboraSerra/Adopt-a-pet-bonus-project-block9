/**
 * @jest-environment jsdom
 */
require('../mocks/windowSimulator');
require('../mocks/fetchSimulator');
const { fetchAnimal } = require('../mocks/allAnimals');
const { types } = require('../mocks/typesOfAnimals');
const { createTypeButtons } = require('../script2');

beforeEach(() => {
  document.body.innerHTML =
    '<header>' +
    '  <h1>Adopt A Pet!</h1>' +
    '  <nav>' +
    '    <section class="type-buttons-container"></section>' +
    '  </nav>' +
    '</header>' +
    '<main class="animals-parent"></main>';
})

describe('Test the function createTypeButtons', () => {
  it('tests if animalTypes is an array of types', async () => {
    const expected = ['Dog', 'Cat', 'Rabbit', 'Small & Furry', 'Horse', 'Bird', 'Scales, Fins & Other', 'Barnyard'];
    const response = await createTypeButtons();
    expect(response.animalTypes).toEqual(expected);
  });
  it('tests if the buttons are created', async () => {
    const expected = ['Dog', 'Cat', 'Rabbit', 'Small & Furry', 'Horse', 'Bird', 'Scales, Fins & Other', 'Barnyard'];
    const response = await createTypeButtons();
    expect(response.buttons).toEqual(expected);
  })
})