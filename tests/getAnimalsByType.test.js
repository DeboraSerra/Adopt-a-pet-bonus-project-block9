/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const text = fs.readFileSync("./index.html");
document.body.innerHTML = text;


 require('../mocks/fetchSimulator');
 const { fetchAnimal } = require('../mocks/allAnimals');
 const { types } = require('../mocks/typesOfAnimals');
 const { createAnimalsCards } = require('../script2');
const { getAnimalsByType } = require('../script2');
const { token } =require('../script2');


describe('Testa a função getAnimalsByType', () => {
  it('Testa se ao chamar função getAnimalsByType com o parâmetro \'Dog\' a função fetch é chamada com os parâmetros corretos', async () => {
    const url = 'https://api.petfinder.com/v2/animals/?&type=Dog';
    const requestInfo = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    };
    await getAnimalsByType('Dog');
    expect(fetch).toHaveBeenCalledWith(url,requestInfo);
  });
  it('Testa se os objetos do array retornado possuem as chaves corretas', async () => {
    const expected = ['id', 'type', 'breeds', 'age', 'gender', 'size', 'tags', 'name', 'description', 'photos', 'status', 'email'];
    const response = await getAnimalsByType('Dog');
    response.forEach((animal) => expect(Object.keys(animal)).toEqual(expected));
  });
  it('Testa se a função getAnimalsByType ao ser chamada com o parâmetro \'Cat\' retorna apenas os animais do tipo \'Cat\'', async ()=> {
    const response = await getAnimalsByType('Cat');
    expect(response.every((animal) => animal.type === 'Cat')).toBe(true);
  });
})
