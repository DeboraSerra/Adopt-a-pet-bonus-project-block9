/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const text = fs.readFileSync("./index.html");
document.body.innerHTML = text;

 require('../mocks/fetchSimulator');
 const { fetchAnimal } = require('../mocks/allAnimals');
 const { types } = require('../mocks/typesOfAnimals');
const { createTypeButtons } = require('../script2');

describe('Testa a função createTypeButtons', () => {
  it('Testa se animalTypes é uma array de tipos', async () => {
    const expected = ['Dog', 'Cat', 'Rabbit', 'Small & Furry', 'Horse', 'Bird', 'Scales, Fins & Other', 'Barnyard'];
    const { animalTypes } = await createTypeButtons();
    expect(animalTypes).toEqual(expected);
  });
  it('Testa se ao chamar a função createTypeButtons os botões são criados', () => {
    const expected = ['Todos os tipos', 'Todos os tipos', 'Dog', 'Cat', 'Rabbit', 'Small & Furry', 'Horse', 'Bird', 'Scales, Fins & Other', 'Barnyard'];
    const buttons = document.getElementsByClassName('btn-dark');
    const buttonsText = Array.from(buttons)
      .filter((button) => button.innerText? true:false)
      .map((button) => button.innerText);
    expect(buttonsText).toEqual(expected);
  });
});
