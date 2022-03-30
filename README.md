# Track History iFood

<p>
Html | Css | JavaScript | TypeScript | React |  MUI Styled Components<br><br>
Descrição
</p>

Acesse no [site](https://www.trackhistoryifood.tk/)<br>

## Pré-requisitos

- [NodeJS](https://nodejs.org/en/download/)

<br>

```bash
#Fazer o fork do repositório para sua conta

#Executar git clone do seu fork no terminal para clonar o repositório
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


 4. 🔒 Environment

Por padrão, após a instalação das dependências a aplicação vem com um módulo de configuração que pode ler todas as variáveis ​​de ambiente do arquivo `.env`.
Utilizando de uma boa prática, as urls da api que retornar e recebe todas as informações para o funcionamento do front end, e a chave da api do Google Maps que libera a utilzação da ferramenta devem ser configuradas como variáveis de ambiente. Então, você deve configurar estas variáveis com os valores da url base do back end e a chave do Google Maps.

```bash
# Crie um arquivo .env usando de exemplo o arquivo .env.example
$ cp .env.example .env
```

| Key                       | Description                                                          | Default Value              |
| ------------------------- | -------------------------------------------------------------------- | -------------------------- |
| REACT_APP_BASE_URL        | URL BASE DA API DO BACKEND                                           | https://exemplodeurl.com   |
| REACT_APP_GOOGLE_MAPS_API_KEY | CHAVE DA API DO GOOGLE MAPS | AaBbCcDdEXEMPLO123456789|



5. Start da aplicação:

```sh
yarn start
```

6. Aplicação ficará disponível em **http://localhost:3000**

###### tags: `JavaScript` `Html`  `Css`  `React`  `TypeScript` `MUI Styled Components`