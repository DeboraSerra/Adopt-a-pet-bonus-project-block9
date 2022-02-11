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
Foi então gerada uma chave de cliente para acessar a API e iniciamos o desenvolvimento do projeto.

## 2. Funcionamento da aplicação

A aplicação carrega com uma lista de 20 animais de espécies aleatórias e gera botões por espécie de animais. A pessoa ursuária pode então escolher qual o tipo de animal ela quer que apareça na tela.
Os animmais disponíveis para adoção aparecem em cards com o nome do animal (sendo que algumas vezes pode não ser fornecido, aparecendo um número de identificação ou algo parecido), a foto do animal (quando disponível), a descrição do animal (que pode ter sido fornecida ou não), as informações de idade, tamanho e gênero, algumas tags que descrevem o animal e o email de contato para obter mais informações e adotar o animal.
