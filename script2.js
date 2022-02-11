const baseUrl = 'https://api.petfinder.com/v2/animals';
const urlToFindTypes = 'https://api.petfinder.com/v2/types';
const animalsParent = document.querySelector('.animals-parent');
const typeButtonsContainer = document.querySelector('.type-buttons-container');

const token = {
  "token_type":"Bearer",
  "expires_in":36000,
  "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ5SUdNUERRNUJmendQWXp2N3dEUWo3Z2N4Y0ZFNWU2VnVYVzZtMHZISHh4cjV2anJBTSIsImp0aSI6ImU0MDIxNzJkODY3OWU0MTE1ZmMzNzBmYzAxN2U2YmQ5OTYyMzExZjU3MmU3ZmJjNDk4MTA3OTkzMTg5YzI5ZjVjYTJiMzdjY2VjYTkwOWI4IiwiaWF0IjoxNjQ0NjEzOTk5LCJuYmYiOjE2NDQ2MTM5OTksImV4cCI6MTY0NDYxNzU5OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.RzR9Qq5f5hYmC_P8m6faarJRf2EFNydK2JEf6ko5w5hljqQ7-aD7zJ7lp-tunvXU846Lu6XU-xM6g_zB7b8yG26xAyF98Lh219gREOlA95Dz9KM7ig1soElCyaJIDdlKdKuPnuhHUEV1UiDVW6gfTX5YrXSohPdr3vuyyeeRbQRGISmbbiF0J9L4_gx5qNgoP0tXgxk7o0dayZmduabQPPgBDiefhJEvmxn2dp2ymk9xZBe4rVMnGEvyymhcdmTwpnuLXQPszDf3XNDRqie4gve1T0-b3LwVLZ-bKv8o4dtInG9EDS1dFN5VOnYZ94YwzNmQfafbxkGR_2eudDuSCA",
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
  if (description) animalTags.push(createCustomElement('p', 'card-text', description));
  const dataText = `Tipo: ${type}, Raça: ${breeds.primary}${breeds.secondary ? ', ' + breeds.secondary : ''}, Idade: ${age}, Sexo: ${gender}, Porte: ${size}`;
  animalTags.push(createCustomElement('p', 'card-text', dataText));
  animalTags.push(createCustomElement('p', 'card-text', tags.join(', ')));
  animalTags.push(createCustomElement('p', 'card-text', status));
  animalTags.push(createCustomElement('p','btn btn-link', `Me adote! ${email}`));
  return animalTags;
};

const clearAnimalsCards = () => {
  const animalsCards = animalsParent.children;
  for (let i = animalsCards.length; i > 0; i -= 1) {
    animalsCards[i - 1].remove();
  }
};

const createAnimalsCards = (array) => {
  array.forEach((animal) => {
    const newSect = createCustomElement('section', 'card-body', '');
    newSect.id = animal.id;
    const animalTags = createAnimalTags(animal);
    animalTags.forEach((eachAnimal) => newSect.appendChild(eachAnimal));
    animalsParent.appendChild(newSect);
  })
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
  return returnedAnimals[0];
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
  getAllAnimals
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
