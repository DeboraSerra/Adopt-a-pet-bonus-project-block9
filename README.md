# Adopt a Pet - Bonus project - Block9

Esse projeto foi desenvolvido em conjunto pelos desenvolvedores:
* [Débora Rodrigues Serra](https://github.com/DeboraSerra/Trybe-exercicios),
* [Elias Galindo](https://github.com/EliasGalindo0/trybe-exercicios),
* [Marcelo Alexandre](https://github.com/marceloalexandredacunhasimao/trybe-exercicios),
* [Rafael Friedel](https://github.com/Rafael-Friedel/Trybe-Exercises).

Esse projeto possui as seguintes regras:

1. *O projeto deve ser feito em grupos de 3 ou 4 pessoas da mesma tribo.*

> O tema fica a critério do grupo, com base nos requisitos abaixo;

2. *Requisitos obrigatórios:*

>* Utilizar uma API externa desta [lista](https://github.com/public-apis/public-apis);

>* Utilizar funções HoF no projeto;

>* Deve existir alguma(s) manipulação(ões) do DOM a partir de uma ação do usuário usando o addEventListener em algum(ns) elemento(s) do HTML;

>* Todas as HoF’s utilizadas no projeto devem ter, pelo menos, 1 teste de validação usando o Jest;

>* O código deve estar no GitHub de vocês.

3. *Bônus:*

>* Utilizar um framework CSS;
>* Utilizar uma API que usa APIKey ou outra forma de autorização/autenticação para acesso

4. *Critérios de avaliação*

>* Soft Skills:
>>* Apresentação pessoal e da equipe (postura corporal, organização do pensamento, administração do tempo)
>>* Apresentação do problema que o projeto resolveu
>>* Apresentação das lições aprendidas

>* Hard Skills:
>>* Falar tecnicamente como foi desenvolvido
>>* Mostrar o design

>* Além de:
>>* Criatividade
>>* Inovação
>>* Aplicabilidade;

## 1. Tema escolhido

Inicialmente o tema escolhido foi uma aplicação de receitas que fornece receitas saudáveis com base nos ingredientes que a pessoa usuária possui em casa. Porém, após deliberação entre as pessoas integrantes do grupo, decidimos trocar para uma aplicação de incentivo à adoção de animais.
A API escolhida foi a _[Petfinder](https://www.petfinder.com/developers/)_, mantida pela marca de produtos para animais _Purina_.
Foi então gerada uma chave de cliente e uma chave secreta para acessar a API e iniciamos o desenvolvimento do projeto.

> Para gerar essas chaves foi utilizado um 'CEP' de Kelowna, BC - Canada, pois a API ainda não está disponível com animais do Brasil.

## 2. Funcionamento da aplicação

A aplicação carrega com uma lista de 20 animais de espécies aleatórias e gera botões por espécie de animais. A pessoa ursuária pode então escolher qual o tipo de animal ela quer que apareça na tela.
Os animmais disponíveis para adoção aparecem em cards com o nome do animal (sendo que algumas vezes pode não ser fornecido, aparecendo um número de identificação ou algo parecido), a foto do animal (quando disponível), a descrição do animal (que pode ter sido fornecida ou não), as informações de idade, tamanho e gênero, algumas tags que descrevem o animal e o email de contato para obter mais informações e adotar o animal.
O usuário pode, então, clicar no card do animal escolhido e ser redirecionado para o preenchimento de um formulário de adoção responsável.

______________________________________________________________________________________________________

# Adopt a Pet - Bonus project - Block9 (English version)

This project was developed by the developers:
* [Débora Rodrigues Serra](https://github.com/DeboraSerra/Trybe-exercicios),
* [Elias Galindo](https://github.com/EliasGalindo0/trybe-exercicios),
* [Marcelo Alexandre](https://github.com/marceloalexandredacunhasimao/trybe-exercicios),
* [Rafael Friedel](https://github.com/Rafael-Friedel/Trybe-Exercises).

To develop this project we had to follow this rules:

1. *The project must be done in groups of 3 or 4 people.*

> The theme can be chosen by the group;

2. *Required requisites:*

>* Use an API from this [list](https://github.com/public-apis/public-apis);

>* Use HoF on the project;

>* There must be some manipulation of the DOM by the user, using `addEventListener` in any HTML element;

>* All the HoF's used on the project must have at least one validation test using `Jest`;

>* The code must be on the developers GitHub.

3. *Bonus:*

>* Use an CSS framework;

>* Use an API that uses APIKey or other way of authorization/authentication to access

4. *Rating criteria*

>* Soft Skills:
>>* Personal and team presentation (posture, thoughts organization, time management)
>>* Presentation of the problem that the project helps to solve
>>* Presentation of the lessons learned

>* Hard Skills:
>>* Talk tecnically of how the project was developed
>>* Show the design

>* And also:
>>* Creativity
>>* Inovation
>>* Aplicability

## 1. Chosen Theme

First the theme chosen was a recipes app that provide health recipes based on the ingridients the user have available. However, after some deliberation, we decided to change to an application to promote pet adoption.

The chosen API was _[Petfinder](https://www.petfinder.com/developers/)_, sustained by the animal products brand _Purina_.

Then, we generated a client key and a secret key to access the API and started developing the project.

> To generate this keys, we use a zip code in Kelowna, BC - Canada, since this API doesn't have animals available in our country.

## 2. How the application works

The application loads a list with 20 availablle animals of random species and generate some buttons by specie. Then the user can choose the specie of animal he/she want to appear on screen.

The animals available to adoption appear in cards with the name of the animal (sometimes it appears an identification number instead), the animal's picture (when provided), the animal description (when provided), the inforrmations about age, size, and gender, some tags that desccribe the animal and a contact email so the user can get more informations and adopt the pet.

Then the user can click on the card of the selected animal and be redirected to fill a form for responsible adoption.
