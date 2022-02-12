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
  expires_in: 36000,
  access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ5SUdNUERRNUJmendQWXp2N3dEUWo3Z2N4Y0ZFNWU2VnVYVzZtMHZISHh4cjV2anJBTSIsImp0aSI6IjFkOTIwM2Y1OWU2ZmZjZWMyNDE1NzljYTNhMmViMjUzNjJjOGU5ZWU3YjI4ZmVhZTVjNzM3MDY1Y2NkZTlhM2NhNTVmNDhmNzFmOWIxNDdmIiwiaWF0IjoxNjQ0NjY5NzE3LCJuYmYiOjE2NDQ2Njk3MTcsImV4cCI6MTY0NDY3MzMxNywic3ViIjoiIiwic2NvcGVzIjpbXX0.f4FjZj-k-qmlK5VdPBeGI3gjY68N9poxpGn93E9GR6byPQttbrg4fS4CKTOjxRvTmG7Ffl5xbsEyT92-aKMA3pjVWgSBTWOVJFSqkKZbN3t9gIfzbwCGcH1zczUXbP9LINcsqIAS-i53MinjfYmW2dKFNgd273rabAwn6VWvcMa7pbqJOJlGQxybElSYTrUWB4IH0QnCAtSRK27ZANqF_UGYZ3SYXdjORJeaLFVwAo10UP8DXDWL1m9a0yIzryXLkjSPQ3PImXV8_mlPrcTkVfSGgRf23ZFaoqsK4VjD-R4UUIm5thcr5tL_JCkQdTFkPsTwVTrv3nof3pkbNEYKAw',
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
  const response = await fetch(urlToFindTypes, requestInfo);
  const data = await response.json();
  return data;
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
  if (photos.length >= 2) animalTags.push(createImageElement(photos[0].medium, 'rounded mx-auto d-block', animal.name));
  if (description) animalTags.push(createCustomElement('p', 'card-text description', description));
  const dataText = `Tipo: ${type}, Raça: ${breeds.primary}${breeds.secondary ? ` e ${breeds.secondary}` : ''}, Idade: ${age}, Sexo: ${gender}, Porte: ${size}`;
  animalTags.push(createCustomElement('p', 'card-text data', dataText));
  animalTags.push(createCustomElement('p', 'card-text tags', tags.join(', ')));
  animalTags.push(createCustomElement('p', 'card-text status', status));
  animalTags.push(createCustomElement('p', 'btn btn-link', `Me adote! ${email}`));
  return animalTags;
};

const clearAnimalsCards = () => {
  const animalsCards = animalsParent.children;
  for (let i = animalsCards.length; i > 0; i -= 1) {
    animalsCards[i - 1].remove();
  }
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
    const newSect = createCustomElement('section', 'card-body', '');
    newSect.id = animal.id;
    const anchor = createCustomElement('a', 'go-to-form', 'Preencha o formulário!');
    anchor.href = '#our-form';
    newSect.addEventListener('click', selectAnimal);
    const animalTags = createAnimalTags(animal);
    animalTags.forEach((eachAnimal) => newSect.appendChild(eachAnimal));
    newSect.appendChild(anchor);
    animalsParent.appendChild(newSect);
  });
};

// HANDLERS

const getAllAnimals = async () => {
  const fetchedAnimals = await fetchApi(baseUrl);
  const returnedAnimals = fetchedAnimals.animals.map((animal) => {
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
  });
  clearAnimalsCards();
  createAnimalsCards(returnedAnimals);
  return returnedAnimals;
};

const getAnimalsByType = async (animalType) => {
  let query = '';
  if (animalType) {
    query = `/?&type=${animalType}`;
  }
  const fetchedAnimals = await fetchApi(`${baseUrl}${query}`);
  const returnedAnimals = fetchedAnimals.animals.map((animal) => {
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
    return {
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
  });
  clearAnimalsCards();
  createAnimalsCards(returnedAnimals);
  return returnedAnimals;
};

const selectType = (event) => {
  const type = event.target.innerText;
  getAnimalsByType(type);
};

const createTypeButtons = async () => {
  const allButton = createCustomElement('button', 'btn btn-dark', 'Todos os tipos');
  allButton.addEventListener('click', getAllAnimals);
  typeButtonsContainer.appendChild(allButton);
  const data = await getAnimalTypes();
  const animalTypes = data.types.map((type) => type.name);
  const buttons = [];
  animalTypes.forEach((type) => {
    const button = createCustomElement('button', 'btn btn-dark', type);
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

/* 'animals': [
        {
            'id': 120,
            'organization_id': 'NJ333',
            'url': 'https://www.petfinder.com/dog/spot-120/nj/jersey-city/nj333-petfinder-test-account/?referrer_id=d7e3700b-2e07-11e9-b3f3-0800275f82b1',
            'type': 'Dog',
            'species': 'Dog',
            'breeds': {
                'primary': 'Akita',
                'secondary': null,
                'mixed': false,
                'unknown': false
            },
            'colors': {
                'primary': null,
                'secondary': null,
                'tertiary': null
            },
            'age': 'Young',
            'gender': 'Male',
            'size': 'Medium',
            'coat': null,
            'attributes': {
                'spayed_neutered': false,
                'house_trained': true,
                'declawed': null,
                'special_needs': true,
                'shots_current': false
            },
            'environment': {
                'children': false,
                'dogs': false,
                'cats': false
            },
            'tags': [
                'Cute',
                'Intelligent',
                'Large',
                'Playful',
                'Happy',
                'Affectionate'
            ],
            'name': 'Spot',
            'description': 'Spot is an amazing dog',
            'photos': [
                {
                    'small': 'https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081&width=100',
                    'medium': 'https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081&width=300',
                    'large': 'https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081&width=600',
                    'full': 'https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081'
                }
            ],
            'videos': [
                {
                    'embed': '<iframe src=\'https://www.youtube.com/embed/xaXbs1fRFRM\' frameborder=\'0\' allowfullscreen></iframe>'
                }
            ],
            'status': 'adoptable',
            'published_at': '2018-12-22T20:31:32+0000',
            'contact': {
                'email': 'petfindertechsupport@gmail.com', */
