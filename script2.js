const baseUrl = 'https://api.petfinder.com/v2/animals';
const urlToFindTypes = 'https://api.petfinder.com/v2/types';
const animalsParent = document.querySelector('.animals-parent');
const typeButtonsContainer = document.querySelector('.type-buttons-container');

const token = {
  "token_type":"Bearer",
  "expires_in":36000,
  "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ5SUdNUERRNUJmendQWXp2N3dEUWo3Z2N4Y0ZFNWU2VnVYVzZtMHZISHh4cjV2anJBTSIsImp0aSI6ImY0OWZhM2Q2NDUxZTgyMTg2ZTk5ODkzZmM3MTM2MDZhNjc0MjZlZjQ2MjdjZTMwNmRlODRmY2FkYmMzNTRlNTg0MjA0Y2ZhYjc1YWExZjVjIiwiaWF0IjoxNjQ0NjI4NzUyLCJuYmYiOjE2NDQ2Mjg3NTIsImV4cCI6MTY0NDYzMjM1Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.B0fXFxFgIHtjENJO1pFDLpL3rODVLtKtfWFuV_Kj1zMDsiu7oePYxNC1xrkumxOB6fsVIfNft-fiAUkZsBWRa8-pVRPD_GQKbf53WZWda0ucbcVdHYETIZEAM2Tv-WTf8tIw5hLgKo1jLMG9fUw_uEv7P9bzcWfaY-VHfAh-kAd29ODr3Or5vl0aQ9WTkjDbItgwOTweGSM1vtFGh9e4szqS0ODtBu72bgJNT3gcdjvClLVAnvUqNhqiAUTMW-qiimmRuXo20AfTC97ZPh7PpXh4P150Iyynf_odgp9zw8Bn4K9kBuXijWbbVBIweI6nTornQ3FF7B5_JTe2QBL81g",
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
