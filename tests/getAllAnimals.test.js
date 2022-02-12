/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const text = fs.readFileSync("./index.html");
document.body.innerHTML = text;


 require('../mocks/fetchSimulator');
 const { fetchAnimal } = require('../mocks/allAnimals');
 const { types } = require('../mocks/typesOfAnimals');
 const createAnimalsCards = require('../script2');
const { getAllAnimals } = require('../script2');
const { token } =require('../script2');

describe('Testa a função getAllAnimals', () => {
  it('Testa se a função getAllAnimals chama a função fetch com os parâmetros corretos', async () => {
    const url = 'https://api.petfinder.com/v2/animals';
    const requestInfo = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    };
    await getAllAnimals();
    expect(fetch).toHaveBeenCalledWith(url,requestInfo);
  });
  it('Testa se os objetos do array retornado possuem as chaves corretas', async () => {
    const expected = ['id', 'type', 'breeds', 'age', 'gender', 'size', 'tags', 'name', 'description', 'photos', 'status', 'email'];
    const response = await getAllAnimals();
    response.forEach((animal) => expect(Object.keys(animal)).toEqual(expected));
  });
});
