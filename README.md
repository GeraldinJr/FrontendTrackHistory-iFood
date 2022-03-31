# Track History iFood

<p align="center">
  <a href="#-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-pré-requisitos">Iniciando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>
</p>

## - Sobre o projeto

<p>
    O Track History iFood é um aplicativo web que permite as pessoas entregadoras selecionarem pedidos feitos por clientes e realizar sua respectiva entrega.
    O aplicativo é desenvolvido com o objetivo de facilitar o processo de entrega dessas refeições e trazer dados relevantes sobre esse processo.
</p>

Acesse no [trackhistoryifood.tk/](https://www.trackhistoryifood.tk/)<br>
Para o repositorio do back end acesse: [Github](https://github.com/GeraldinJr/BackendTrackHistory-iFood/tree/hml)<br>

### 💻 Desenvolvedores

- [Debora Brum](https://github.com/DeboraBrum)
- [Edvan Junior](https://github.com/Edvan-Jr)
- [Geraldo Junior](https://github.com/GeraldinJr)
- [Lucas Fernandes](https://github.com/lucasfpds)
- [Magnólia Medeiros](https://github.com/magnoliamedeiros)

## - Tecnologias

- [Html](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [Css](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [JavaScript](https://www.javascript.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [ReactJS](https://reactjs.org/)
- [React Router DOM](https://reacttraining.com/react-router/)
- [MUI Styled Components](https://mui.com/pt/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)


## Pré-requisitos

- [NodeJS](https://nodejs.org/en/download/)

<br>

```bash
#Fazer o fork do repositório para sua conta

#Executar git clone do seu fork no terminal para clonar o repositório

$ git clone https://github.com/GeraldinJr/FrontendTrackHistory-iFood.git && cd FrontendTrackHistory-iFood
```

<br>

## Passos para montar o ambiente local

1. Instalar o Yarn

```sh
npm install -g Yarn
```

3. Instalar dependências:

```sh
yarn install
```

4.  🔒 Environment

Por padrão, após a instalação das dependências a aplicação vem com um módulo de configuração que pode ler todas as variáveis ​​de ambiente do arquivo `.env`.
Utilizando de uma boa prática, as urls da api que retornar e recebe todas as informações para o funcionamento do front end, e a chave da api do Google Maps que libera a utilzação da ferramenta devem ser configuradas como variáveis de ambiente. Então, você deve configurar estas variáveis com os valores da url base do back end e a chave do Google Maps.

```bash
# Crie um arquivo .env usando de exemplo o arquivo .env.example
$ cp .env.example .env
```

| Key                           | Description                 | Default Value            |
| ----------------------------- | --------------------------- | ------------------------ |
| REACT_APP_BASE_URL            | URL BASE DA API DO BACKEND  | https://exemplodeurl.com |
| REACT_APP_GOOGLE_MAPS_API_KEY | CHAVE DA API DO GOOGLE MAPS | AaBbCcDdEXEMPLO123456789 |

5. Start da aplicação:

```sh
yarn start
```

6. Aplicação ficará disponível em **http://localhost:3000**

## - Funcionalidades

Voce poderá nessa aplicação:
- Cadastrar e fazer login de uma pessoa entregadora.
- Listar os pedidos em aberto.
- Selecionar um pedido para entrega.
- Iniciar a entrega do pedido.
- Ver o registro do trajeto percorrido em tempo real.
- Concluir ou Cancelar o pedido
- Deslogar da aplicação.

### 📝 Cadastro e Login
<img height="256" width="200" src="./src/assets/cadastro.gif">

###### tags: `Html` `Css` `React JS`  `JavaScript`  `TypeScript` `MUI Styled Components` `React Router DOM` `MUI Styled Components` `Eslint` `Prettier`
