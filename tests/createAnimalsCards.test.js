/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const text = fs.readFileSync("./index.html");
document.body.innerHTML = text;

require('../mocks/fetchSimulator');
const { getAllAnimals } = require('../script2');
const { createAnimalsCards } = require('../script2');

describe('Testa a função createAnimalsCards', () => {
  it('Verifica se a função createAnimalsCards cria uma seção com o id do animal', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const section = document.getElementById(animals[0].id.toString());
    expect(section).toBeTruthy();
  });
  it('Verifica se a seção criada com createAnimalsCards possui a classe \'card-body\'', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const section = document.getElementById(animals[0].id.toString());
    expect(section.classList).toContain('card-body');
  });
  it('Verifica se createAnimalsCards adiciona um elemento h2 à seção criada para o animal', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const h2 = document.querySelector('.card-body h2');
    expect(h2).toBeTruthy();
  });
  it('Verifica se o elemento h2 criado tem o nome do animal', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const h2 = document.querySelector('.card-body h2');
    expect(animals[0].name).toEqual(h2.innerText);
  });
  it('Verifica createAnimalsCards adiciona um elemento img à seção criada para o animal', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const img = document.querySelector('.card-body img');
    expect(img).toBeTruthy();
  });
  it('Verifica se o elemento img criado tem um link para a imagem do animal', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const img = document.querySelector('.card-body img');
    expect(img.src.includes('http')).toBe(true);
  });
  it('Verifica createAnimalsCards adiciona um elemento \'p\' à seção criada para o animal', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const p = document.querySelector('.card-body p');
    expect(p).toBeTruthy();
  });
  it('Verifica se o elemento \'p\' criado tem a descrição do animal', async () => {
    const animals = await getAllAnimals();
    createAnimalsCards(animals);
    const p = document.querySelector('.card-body p');
    expect(animals[0].description).toEqual(p.innerText);
  });
});
