const baseUrl = 'https://api.petfinder.com/v2/animals';
//const urlByType = `https://api.petfinder.com/v2/types/${type}`;
const urlToFindTypes = 'https://api.petfinder.com/v2/types';
const animalsParent = document.querySelector('.animals-parent');

const token = {
  "token_type":"Bearer",
  "expires_in":3600,
  "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ5SUdNUERRNUJmendQWXp2N3dEUWo3Z2N4Y0ZFNWU2VnVYVzZtMHZISHh4cjV2anJBTSIsImp0aSI6ImNkMzRhYzZiMDhlNjU3Y2ZiMjNhODdkODNiMzhhYjhkMWJjY2YxN2ZiZWE2YmEzODAxNzk3MjUyOGNhODdjNTA3OTM4MTEzMGU5MzI2MWVkIiwiaWF0IjoxNjQ0NTMyNzA3LCJuYmYiOjE2NDQ1MzI3MDcsImV4cCI6MTY0NDUzNjMwNywic3ViIjoiIiwic2NvcGVzIjpbXX0.WqfTdTjzLBNE2xs8vtWgiYKfrGPaZB_zU0Ojuwd_ckDPw_FN91c5h90LyT9tWY6xCGyvim4BeQeP0AedyqNpmUtyLottQiUqJUUvQtXTfIRvXX4hY2x0hitoX5lTIBRXp7ixyqs2S4U9jZWjO2EisfcG68Ro9ft5luSFb2rGWdjd0zuZL85q3DDcdkt3zfd8Zjq-W84qFHW6CxLCGIQAjEALzYoga-atme0ean52HCCZrPmq06iZyfajMkE6zvc6G2KU1KeGBQlw_1Enimk_NtyT7exW-scOgMaUNOE-gcguj8c2w4OQ9nRPy6HF1X7OKZFtCARjbvGLu4B_rRcXNA"
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
  const dataText = `Tipo: ${type}, Raça: ${breeds.primary}, Idade: ${age}, Sexo: ${gender}, Porte: ${size}`;
  animalTags.push(createCustomElement('p', 'animal-description', dataText));
  animalTags.push(createCustomElement('p', 'animal-description', tags.join(',')));
  animalTags.push(createCustomElement('p', 'animal-description', status));
  animalTags.push(createCustomElement('p','animal-contact', `Me adote! ${email}`));
  return animalTags;
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
  createAnimalsCards(returnedAnimals);
}

window.onload = async () => {
  animalsParent.innerHTML = '';
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