const baseUrl = 'https://api.petfinder.com/v2/animals';
const urlToFindTypes = 'https://api.petfinder.com/v2/types';
const animalsParent = document.querySelector('.animals-parent');
const typeButtonsContainer = document.querySelector('.type-buttons-container');

const token = {
  "token_type":"Bearer",
  "expires_in":3600,
  "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ5SUdNUERRNUJmendQWXp2N3dEUWo3Z2N4Y0ZFNWU2VnVYVzZtMHZISHh4cjV2anJBTSIsImp0aSI6IjVhNDg5MWU0N2M3MDdlYmE5OTg1YWRjMjc4YjNmZWEwZjNjYjFjZTg3ZTY3MTY3NzRmZjc4NGI0ZjZmZDAwOTQ2NmE0NDFmMjNhOTdjM2FiIiwiaWF0IjoxNjQ0NTkyNTU1LCJuYmYiOjE2NDQ1OTI1NTUsImV4cCI6MTY0NDU5NjE1NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.JqYHI--5xuJPJ9ZpKHQLn2rm8m6-ABR64L-3-pp55kSVeNwPBpT3l1WNpU6WG8ku3w75SYRU_TZ6NJnO_TYixfEpWHJp6CKQnQsSGg7-qOQZz1H_5LY2OQ0t2quXQROZ9ve3eFkXF-Ff-gvowp2-uKiNGBRrxSRESxM2w_XM0MrEsE8M0Fhafl4RrCjmj3Eu0WtaU5UEiGOp90TtYrGeG70Zzq0cskEl4ZVxaMw7NbEyDvplC6LJmZ_ZaDBtBo6B0UxDyl9mlqmw64CE2q7eCY5wxa-A4uD2YusU1xhvxYJlR1b0qYPsASGnibVys5vcg4V-8EhFLWD78odt1oBLIA",
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
    animalsParent.innerHTML = 'Base de dados fora do ar...';
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
    const animalInfo = {id, type, breeds, age, gender, size, tags, name, description, photos, status, email};
    return animalInfo;
  });
  clearAnimalsCards();
  createAnimalsCards(returnedAnimals);
  return returnedAnimals[0];
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
  const buttons = [];
  animalTypes.forEach((type) => {
    const button = createCustomElement('button', 'type-button', type);
    button.addEventListener('click', selectType);
    typeButtonsContainer.appendChild(button);
    buttons.push(button.innerText)
  });
  return { animalTypes, buttons };
}

//createTypeButtons();

window.onload = async () => {
  animalsParent.innerHTML = '';
  createTypeButtons();
  getAllAnimals();
}

module.exports = {
  createAnimalsCards,
  createTypeButtons,
  getAllAnimals,
  getAnimalsByType,
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
