const baseUrl = 'https://api.petfinder.com/v2/animals';
const urlByType = `https://api.petfinder.com/v2/types/`;
const urlToFindTypes = 'https://api.petfinder.com/v2/types';
const animalsParent = document.querySelector('.animals-parent');
const typeButtonsContainer = document.querySelector('.type-buttons-container');

const token = {
  "token_type":"Bearer",
  "expires_in":3600,
  "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ5SUdNUERRNUJmendQWXp2N3dEUWo3Z2N4Y0ZFNWU2VnVYVzZtMHZISHh4cjV2anJBTSIsImp0aSI6IjA2NDQ0NzE0Mzc3ZjBiOTMxYTkyMTRhM2NkNjA3YTI5ZTAwODRmNmVkMjZmYWM1YmIxMmNkNTA0MjE1NmZhNjcwZWUxZGFlYmQ1M2VlYmM0IiwiaWF0IjoxNjQ0NTg3NzA1LCJuYmYiOjE2NDQ1ODc3MDUsImV4cCI6MTY0NDU5MTMwNSwic3ViIjoiIiwic2NvcGVzIjpbXX0.jDExrf4Btn2kgb3rTZ7z3ZbALN1Sf8wB2gY9rzzjIVAlZq05OJJ2XKbLlVSkSFtzbw0YxiuRArRVkllHBcSonQW4HNkuTY6hDKFV_qimi0Rz5zG5NpQP7GXZQstqBCwLQXirPvvNAS4QZTQLWTTx81OUtJ4XWdewDsl_YHIG-VQvhKSTlLL4c54p9m-yTRaL5bedfvN8gytURNwD4Q2pQ2qtN5p-ZgBtBqM7YTeNAGAK2v6rrxLshteyZH_tA5HnJ8Q7LD_Etdhm3KSyRmxw3TX-hIl9QdSqaqg2V6fgXnQBtyUcxHRMwkODjmKx523gPMlkJsHJkewoORA453mYyg",
}

//REQUESTS

const fetchApi = async (url) => {
  const requestInfo = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    }
  }
  try {
    const response = await fetch(url, requestInfo);
    const data = await response.json();
    return data;
  } catch (error) {
    animalsParent.innerHTML = 'Banco de dados fora do ar...'
  }
}

const getAnimalTypes = async () => {
  const requestInfo = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    }
  }
  const response = await fetch(urlToFindTypes, requestInfo);
  const data = await response.json();
  return data;
}

//HELPERS

const createCustomElement = (tagName, elemClass, text) => {
  const newTag = document.createElement(tagName);
  newTag.className = elemClass;
  newTag.innerText = text;
  return newTag;
}

const createImageElement = (source, elemClass, alternativeText) => {
  const newImage = document.createElement('img');
  newImage.src = source;
  newImage.className = elemClass;
  newImage.alt = alternativeText;
  return newImage;
}

const createAnimalTags = (animal) => {
  const {id, type, breeds, age, gender, size, tags, name, description, photos, status, email} = animal;
  const animalTags = [];
  animalTags.push(createCustomElement('h2', 'animal-name', name));
  if (photos.length >= 2) animalTags.push(createImageElement(photos[0].medium, 'animal-photo', animal.name));
  if (description) animalTags.push(createCustomElement('p', 'animal-description', description));
  const dataText = `Tipo: ${type}, Raça: ${breeds.primary}${breeds.secondary ? ', ' + breeds.secondary : ''}, Idade: ${age}, Sexo: ${gender}, Porte: ${size}`;
  animalTags.push(createCustomElement('p', 'animal-description', dataText));
  animalTags.push(createCustomElement('p', 'animal-description', tags.join(',')));
  animalTags.push(createCustomElement('p', 'animal-description', status));
  animalTags.push(createCustomElement('p','animal-contact', `Me adote! ${email}`));
  return animalTags;
}

const clearAnimalsCards = () => {
  const animalsCards = animalsParent.children;
  for(let i = animalsCards.length; i > 0; i -= 1) {
    animalsCards[i-1].remove();
  }
}

const createAnimalsCards = (array) => {
  array.forEach((animal) => {
    const newSect = createCustomElement('section', 'animal-card', '');
    newSect.id = animal.id;
    const animalTags = createAnimalTags(animal);
    animalTags.forEach((animal) => newSect.appendChild(animal));
    animalsParent.appendChild(newSect);
  })
}

//HANDLERS

const getAllAnimals = async () => {
  const fetchedAnimals = await fetchApi(baseUrl);
  const returnedAnimals = fetchedAnimals.animals.map((animal) => {
    const { id, type, breeds, age, gender, size, tags, name, description, photos, status, contact: { email } } = animal;
    return {id, type, breeds, age, gender, size, tags, name, description, photos, status, email};
  });
  clearAnimalsCards();
  createAnimalsCards(returnedAnimals);
}

const getAnimalsByType = async (animalType) => {
  let query = '';
  if(animalType) {
    query = `/?&type=${animalType}`;
  }
  const fetchedAnimals = await fetchApi(`${baseUrl}${query}`);
  const returnedAnimals = fetchedAnimals.animals.map((animal) => {
    const { id, type, breeds, age, gender, size, tags, name, description, photos, status, contact: { email } } = animal;
    return {id, type, breeds, age, gender, size, tags, name, description, photos, status, email};
  });
  clearAnimalsCards();
  createAnimalsCards(returnedAnimals);
}

const selectType = (event) => {
  const type = event.target.innerText;
  getAnimalsByType(type);
};
  

const createTypeButtons = async () => {
  const allButton = createCustomElement('button', 'type-button', 'Todos os tipos');
  allButton.addEventListener('click', getAllAnimals);
  typeButtonsContainer.appendChild(allButton);
  const data = await getAnimalTypes();
  const animalTypes = data.types.map((type) => type.name)
  animalTypes.forEach((type) => {
    const button = createCustomElement('button', 'type-button', type);
    button.addEventListener('click', selectType);
    typeButtonsContainer.appendChild(button);
    });
}

//createTypeButtons();

window.onload = async () => {
  animalsParent.innerHTML = '';
  createTypeButtons();
  getAllAnimals();
}

/*
    "animals": [
        {
            "id": 120,
            "organization_id": "NJ333",
            "url": "https://www.petfinder.com/dog/spot-120/nj/jersey-city/nj333-petfinder-test-account/?referrer_id=d7e3700b-2e07-11e9-b3f3-0800275f82b1",
            "type": "Dog",
            "species": "Dog",
            "breeds": {
                "primary": "Akita",
                "secondary": null,
                "mixed": false,
                "unknown": false
            },
            "colors": {
                "primary": null,
                "secondary": null,
                "tertiary": null
            },
            "age": "Young",
            "gender": "Male",
            "size": "Medium",
            "coat": null,
            "attributes": {
                "spayed_neutered": false,
                "house_trained": true,
                "declawed": null,
                "special_needs": true,
                "shots_current": false
            },
            "environment": {
                "children": false,
                "dogs": false,
                "cats": false
            },
            "tags": [
                "Cute",
                "Intelligent",
                "Large",
                "Playful",
                "Happy",
                "Affectionate"
            ],
            "name": "Spot",
            "description": "Spot is an amazing dog",
            "photos": [
                {
                    "small": "https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081&width=100",
                    "medium": "https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081&width=300",
                    "large": "https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081&width=600",
                    "full": "https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081"
                }
            ],
            "videos": [
                {
                    "embed": "<iframe src=\"https://www.youtube.com/embed/xaXbs1fRFRM\" frameborder=\"0\" allowfullscreen></iframe>"
                }
            ],
            "status": "adoptable",
            "published_at": "2018-12-22T20:31:32+0000",
            "contact": {
                "email": "petfindertechsupport@gmail.com",*/
