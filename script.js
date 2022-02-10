const endPoint = '/api/recipes/v2/{id}';

const urlGeneral = `https://api.edamam.com/api/recipes/v2`;

const createEndpint1 = (keyWord, diet, health, mealType) => {
  let endPoint1 = `?q=${keyWord}&app_id=0b134290&app_key=b35531f68b6cfd2e5934da94be49397a`
  const dietEnd = `&diet=${diet}`;
  const healthEnd = `&health=${health}`;
  const mealTypeEnd = `&mealType=${mealType}`;
  const end = `&time=25&random=true`;
  if (diet) endPoint1 = `${endPoint1}${dietEnd}`;
  if (health) endPoint1 = `${endPoint1}${healthEnd}`;
  if (mealType) endPoint1 = `${endPoint1}${mealTypeEnd}`;
  return `${endPoint1}${end}`;
}

const fetchApi = async (apiUrl, endpoint) => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`);
    const data = await response.json();
    const recipes = data.hits.map((recipe) => {
      const { label, image, source, url, yeld, dietLabels, healthLabels, ingredientLines, calories, mealType } = recipe.recipe;
      return { label, image, source, url, yeld, dietLabels, healthLabels, ingredientLines, calories, mealType }
    })
  return recipes;
  } catch (error) {
    console.log(error);
  }
} 
const string = 'eggs'
fetchApi(urlGeneral, `?q=${string}&app_id=0b134290&app_key=b35531f68b6cfd2e5934da94be49397a`)
/* Parametros:
q - palavra chave
diet - tipo de dieta (low-carb, balanced, high-protein...)
health - vegan, diet, gluten-free
mealType - breakfast...



 
*/

console.log(new Date())
