/**
 * @jest-environment jsdom
 */
const fs = require('fs');

const text = fs.readFileSync('./index.html');
document.body.innerHTML = text;

require('../mocks/fetchSimulator');
const { createTypeButtons } = require('../script2');

describe('Test the function createTypeButtons', () => {
  it('tests if animalTypes is an array of the types', async () => {
    const expected = ['Dog', 'Cat', 'Rabbit', 'Small & Furry', 'Horse', 'Bird', 'Scales, Fins & Other', 'Barnyard'];
    const { animalTypes } = await createTypeButtons();
    expect(animalTypes).toEqual(expected);
  });
  it('tests if when the function createTypeButtons is called the buttons are created', () => {
    const expected = ['Todos os tipos', 'Todos os tipos', 'Dog', 'Cat', 'Rabbit', 'Small & Furry', 'Horse', 'Bird', 'Scales, Fins & Other', 'Barnyard'];
    const buttons = document.getElementsByClassName('btn-dark');
    const buttonsText = Array.from(buttons)
      .filter((button) => button.innerText)
      .map((button) => button.innerText);
    expect(buttonsText).toEqual(expected);
  });
});
