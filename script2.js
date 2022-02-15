const baseUrl = 'https://api.petfinder.com/v2/animals';
const urlToFindTypes = 'https://api.petfinder.com/v2/types';
const animalsParent = document.querySelector('.animals-parent');
const typeButtonsContainer = document.querySelector('.type-buttons-container');
const form = document.querySelector('.form-section');
const namePet = document.querySelector('#name-pet');
const idPet = document.querySelector('#id-pet');
const speciePet = document.querySelector('#especie-pet');
const breedPet = document.querySelector('#raça-pet');
const agePet = document.querySelector('#idade-pet');
const genderPet = document.querySelector('#genero-pet');
const sizePet = document.getElementById('porte-pet');
const closeForm = document.querySelector('.close-btn');

const token = {
  token_type: 'Bearer',
  expires_in: 3600,
  access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ5SUdNUERRNUJmendQWXp2N3dEUWo3Z2N4Y0ZFNWU2VnVYVzZtMHZISHh4cjV2anJBTSIsImp0aSI6ImJjYjJjNmY5MDdkNjQyODE1MzIxNTQwNmMwYjQ3YjU1NTQ4YmFkMDBjZTk5YjkwYTc4NzI3ZTFiYTZjODFlODE3OTBiNjQ4MDVkNGY1YmNmIiwiaWF0IjoxNjQ0OTU0Nzk4LCJuYmYiOjE2NDQ5NTQ3OTgsImV4cCI6MTY0NDk1ODM5OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.o6eakZv6XIqVkZH7q7RqcHv2kQLIfEdoKUT8G4LVHiFlAV0cbFQifFR3m01SxUIbn77S8E0ktU3PQ-wAEdrCb4Qtm8NeKCtmy0qodgGFmdHCVZdKqDEjlTd_wXkubM4plSwsU6bc0UoovLf12krxn3qp-1j2AgDUhif4TftttMYuOSOrmLGFOgxSCVRFblootFcNCj0fWjx1V6Ow6uRkiQ35Fk4A0RKNvXkqalA0lUUxq5cLlvvSihpJKaX0c9QnrJcp_SBc-KPQpg3RR7vJSpqoC2C-6MUCK8HkpPnnr8TLyDFGixdc3ZU3FyJWWWq1IUx5bk749NFBwlzOnzi8GQ',
};

// REQUESTS

const fetchApi = async (url) => {
  const requestInfo = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  };
  try {
    const response = await fetch(url, requestInfo);
    const data = await response.json();
    return data;
  } catch (error) {
    animalsParent.innerHTML = 'Base de dados fora do ar...';
    return error;
  }
};

const getAnimalTypes = async () => {
  const requestInfo = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  };
  try {
    const response = await fetch(urlToFindTypes, requestInfo);
    const data = await response.json();
    return data;
  } catch (error) {
    animalsParent.innerHTML = 'Base de dados fora do ar...';
    return error;
  }
};

// HELPERS

const createCustomElement = (tagName, elemClass, text) => {
  const newTag = document.createElement(tagName);
  newTag.className = elemClass;
  newTag.innerText = text;
  return newTag;
};

const createImageElement = (source, elemClass, alternativeText) => {
  const newImage = document.createElement('img');
  newImage.src = source;
  newImage.className = elemClass;
  newImage.alt = alternativeText;
  return newImage;
};

const createAnimalTags = (animal) => {
  const {
    type,
    breeds,
    age,
    gender,
    size,
    tags,
    name,
    description,
    photos,
    status,
    email,
  } = animal;
  const animalTags = [];
  animalTags.push(createCustomElement('h2', 'card-title', name));
  if (photos.length >= 2) animalTags.push(createImageElement(photos[0].medium, 'card-img', animal.name));
  if (description) animalTags.push(createCustomElement('p', 'card-text description fs-5', description));
  const dataText = `Tipo: ${type}, Raça: ${breeds.primary}${breeds.secondary ? ` e ${breeds.secondary}` : ''}, Idade: ${age}, Sexo: ${gender}, Porte: ${size}`;
  animalTags.push(createCustomElement('p', 'card-text data fs-5', dataText));
  animalTags.push(createCustomElement('p', 'card-text tags fs-5', tags.join(', ')));
  animalTags.push(createCustomElement('p', 'card-text status fs-5', status));
  animalTags.push(createCustomElement('p', 'card-text fs-5', `Me adote! ${email}`));
  return animalTags;
};

const clearAnimalsCards = () => {
  animalsParent.innerHTML = '';
};

const getElementOrClosest = (sectionClass, target) => {
  if (target.classList.contains(sectionClass)) {
    return target;
  }
  return target.closest(sectionClass);
};

const fillForm = (obj) => {
  const {
    name, id, specie, breed, age, gender, size,
  } = obj;
  namePet.value = name;
  idPet.value = id;
  speciePet.value = specie;
  breedPet.value = breed;
  agePet.value = age;
  genderPet.value = gender;
  sizePet.value = size;
};

const selectAnimal = ({ target }) => {
  const clicked = getElementOrClosest('.card-body', target);
  form.classList.add('apear');
  const name = clicked.querySelector('.card-title').innerText;
  const { id } = clicked;
  const text = clicked.querySelector('.data').innerText;
  const data = text.split(', ');
  const specie = data[0].split('Tipo: ')[1];
  const breed = data[1].split('Raça: ')[1];
  const age = data[2].split('Idade: ')[1];
  const gender = data[3].split('Sexo: ')[1];
  const size = data[4].split('Porte: ')[1];
  const obj = {
    name, id, specie, breed, age, gender, size,
  };
  fillForm(obj);
};

closeForm.addEventListener('click', () => form.classList.remove('apear'));

const createAnimalsCards = (array) => {
  array.forEach((animal) => {
    const newSect = createCustomElement('section', 'card col-sm-6 col-md-5 col-lg-4 border rounded-4 bg-primary bg-gradient shadow-lg bg-opacity-75', '');
    const cardBody = createCustomElement('section', 'card-body row rounded', '');
    cardBody.id = animal.id;
    newSect.appendChild(cardBody);
    const anchor = createCustomElement('a', 'go-to-form text-reset', 'Preencha o formulário!');
    anchor.href = '#our-form';
    cardBody.addEventListener('click', selectAnimal);
    const animalTags = createAnimalTags(animal);
    animalTags.forEach((eachAnimal) => cardBody.appendChild(eachAnimal));
    cardBody.appendChild(anchor);
    animalsParent.appendChild(newSect);
  });
};

const desconstructObject = (animal) => {
  const {
    id,
    type,
    breeds,
    age,
    gender,
    size,
    tags,
    name,
    description,
    photos,
    status,
    contact: { email },
  } = animal;
  const animalInfo = {
    id,
    type,
    breeds,
    age,
    gender,
    size,
    tags,
    name,
    description,
    photos,
    status,
    email,
  };
  return animalInfo;
};

// HANDLERS

const getAllAnimals = async () => {
  const fetchedAnimals = await fetchApi(baseUrl);
  const returnedAnimals = fetchedAnimals.animals.map((animal) => desconstructObject(animal));
  clearAnimalsCards();
  createAnimalsCards(returnedAnimals);
  return returnedAnimals;
};

const getAnimalsByType = async (animalType) => {
  let query = '';
  if (animalType) {
    query = `/?&type=${animalType.split(' ').join('')}`;
  }
  const fetchedAnimals = await fetchApi(`${baseUrl}${query}`);
  try {
    const returnedAnimals = fetchedAnimals.animals.map((animal) => desconstructObject(animal));
    clearAnimalsCards();
    createAnimalsCards(returnedAnimals);
    return returnedAnimals;
  } catch (error) {
    animalsParent.innerHTML = 'Sinto muito! Nenhum animal do tipo disponível hoje...';
    return false;
  }
};

const selectType = (event) => {
  const type = event.target.innerText;
  getAnimalsByType(type);
};

const createTypeButtons = async () => {
  const allButton = createCustomElement('button', 'btn btn-outline-primary shadow-lg col-4 col-sm-3 col-md-2 col-lg-1', 'Todos os tipos');
  allButton.addEventListener('click', getAllAnimals);
  typeButtonsContainer.appendChild(allButton);
  const data = await getAnimalTypes();
  const animalTypes = data.types.map((type) => type.name);
  const buttons = [];
  animalTypes.forEach((type) => {
    const button = createCustomElement('button', 'btn btn-outline-primary col-4 col-sm-3 col-md-2 col-lg-1', type);
    button.addEventListener('click', selectType);
    typeButtonsContainer.appendChild(button);
    buttons.push(button.innerText);
  });
  return { animalTypes, buttons };
};

// createTypeButtons();

window.onload = async () => {
  animalsParent.innerHTML = '';
  createTypeButtons();
  getAllAnimals();
};

module.exports = {
  createAnimalsCards,
  createTypeButtons,
  getAllAnimals,
  getAnimalsByType,
  token,
};
