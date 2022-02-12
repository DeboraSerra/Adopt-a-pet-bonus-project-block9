/**
 * @jest-environment jsdom
 */

const fs = require('fs');

const text = fs.readFileSync('./index.html');
document.body.innerHTML = text;

require('../mocks/fetchSimulator');
const { getAllAnimals } = require('../script2');
const { createAnimalsCards } = require('../script2');

describe('Test the function createAnimalsCards', () => {
  it('Verifies if the function createAnimalsCards create a section with the id of the animal', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const section = document.getElementById(animals[0].id.toString());
    expect(section).toBeTruthy();
  });
  it('Verifies if the section created by createAnimalsCards have the class \'card-body\'', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const section = document.getElementById(animals[0].id.toString());
    expect(section.classList).toContain('card-body');
  });
  it('Verifies if createAnimalsCards adds an h2 element to the section created to the animal', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const h2 = document.querySelector('.card-body h2');
    expect(h2).toBeTruthy();
  });
  it('Verifies if the h2 element created have the animal\'s name', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const h2 = document.querySelector('.card-body h2');
    expect(animals[0].name).toEqual(h2.innerText);
  });
  it('Verifies if createAnimalsCards add an img element to the section created to the animal', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const img = document.querySelector('.card-body img');
    expect(img).toBeTruthy();
  });
  it('Verifies if the img element have the link to the animal\'s image', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const img = document.querySelector('.card-body img');
    expect(img.src.includes('http')).toBe(true);
  });
  it('Verifies if createAnimalsCards adds a \'p\' element to the animal\'s section', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const p = document.querySelector('.card-body p');
    expect(p).toBeTruthy();
  });
  it('Verifies if the \'p\' element created have the animals description', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const p = document.querySelector('.card-body p');
    expect(animals[0].description).toEqual(p.innerText);
  });
});
