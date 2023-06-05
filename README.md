# Labook-backend

O Labook é uma API que simula a interação de postagens de uma rede social. Podendo cadastrar novos usuarios, fazer postagens e dar like e dislike em postagens alheia.

## Entidades (TypeScript)

#### users(usuário)

Representa os usuarios da aplicação. Todo usuário é composto pelas seguintes caracteristicas:
- id (string) unico e gerado pela aplicação
- name (string)
- email (string) unico por usuario
- password (string)
- role (string)
- creted_at (string) gerado pela propria aplicação

#### post(Postagem)

Representa as postagens da aplicação. Toda postagem é composto pelas seguintes caracteristicas:

- id (string) unico e gerado pela aplicação
- creator_id (string)
- content (string)
- like (number)
- dislike (number)
- createt_at (string)
- update_at (string)

### likes_dislikes

Representa a relação de usuario e os likes e dislikes nas postagens. Todo like/dislike é composto pelas seguintes caracteristicas:

- user_id (string)
- post_id (string)
- like (number)


## Tabelas (SQLite)
### users



| id(TEXT)   | name(TEXT) |     email(TEXT)    | password(TEXT) | role(TEXT) | createt_at(TEXT) |
| :----------| :--------- | :------------------| :--------------|:--------------------------------| :-------|
|    **a aplicação ira gerar**  |  `fulano`  | `fulano@email.com` |    `123456`    |`string`|**a propria aplicação vai gerar**|

&nbsp;
### post

|id(TEXT)|creator_id(TEXT)|content(TEXT)| like(REAL) | dislike(REAL)| created_at(TEXT) | update_at(TEXT)|
|:-------|:---------|:------------|:-----------------------|:---------------------------|:------ | :------ |
|   **a aplicação ira gerar** |**id do usuario**|`ola pessoas !!`| 0 | 1 |**gerado pela aplic ação**| **gerado pela aplicação**|



&nbsp;
### like_sidlike

| user_id(TEXT)|  post_id(TEXT)  | like(REAL) |
|:-----------------|:-------------------|:---------------|
|**id do usuario**  |** id do post**|      `0 ou 1`      |

&nbsp;
## Instruções

***Instalando as dependecias***
- `npm install`:
instala todas as  "dependencies" listadas no `package.json`.

&nbsp;

## Criando o arquivo .env:

Criar o arquivo `.env` e configurar com as informações de seu banco de dados.
```
PORT=3003

DB_FILE_PATH=./src/database/nome-do-arquivo.db

JWT_KEY=senha-de-exemplo-jwt-key
JWT_EXPIRES_IN=7d

BCRYPT_COST=12
```

***executar o projeto***
- `npm run dev`:
Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor `localhost` toda a vez que o projeto for alterado e salvo.

#
## Funcionalidades
&nbsp;

1.Cadastro de usuário
- Método: `POST`
- Caminho: `/users/signup`
- Entrada: `name, email, password`
- Saida: `mensagem de cadastro de um novo usuário. Ao final, retorna um token de acesso ao sistema.`
- Validações e regras de negocio:
  - `name, email e password devem ser fornecidos e serem do tipo string.`
  - `name deve possuir  ao menos 2 caracteres, enquanto o password ao menos 6 caracteres.`
  - `email deve ter um formato válido e único, não podendo repetir no banco de dados.`

&nbsp;

  2.Acesso de usuário
  - Método: `POST`
  - Caminho: `/users/login`
  - Entrada: `email, password`
  - Saida: `mensagem de acesso de um usuário cadastrado no endpoint anterior. Ao final, retorna um token de acesso ao sistema.`
  - Validações e regras de negocio: 
    -`email e password devem ser fornecidos e serem do tipo string`
    -`password deve possuir ao menos 6 caracteres`
    -`email deve ter um formato válido`
    -`usuário com o email fornecido deve existir no sistema`

&nbsp;

3.Criar uma postagem
  - Método: `POST`
  - Caminho: `/posts`
  - Entrada: `content, token`
  - Saida: `a postagem criada`
  - Validações e regras de negocio:
    - `conteudo e token devem ser uma string`
  - Observação:  `somente pessoas logadas e com token de acesso podem criar postagens`

&nbsp;

4.Buscar postagens
  - Método: `GET`
  - Caminho: `/posts`
  - Entrada: `token`
  - Saida: `lista de todas as postagens`
  - Validações e regras de negocio:
    - `Deve haver um token para acessar tal informação`
  - Observação: `este endpoint deve ser acessível apenas aos admins.`

&nbsp;

5.Modificar postagem
  - Método: `PUT`
  - Caminho: `/posts/:id`
  - Entrada: `token de acesso, id da postagem e o novo conteudo`
  - Saida: `O conteudo modificado`
  - Validações e regras de negocio:
    - `id do post, token de acesso e o novo conteudo devem ser string`
    - `o novo conteudo deve contenter no minimo um caractere`
  - Observação: `A pessoa só podera modificar a postagem que ela criou, e não a dos outros.`

&nbsp;

6.Deletar postagem
  - Método: `DELETE`
  - Caminho: `/posts/:id`
  - Entrada: `token e id da postagem`
  - Saida: `uma mensagem de sucesso ao excluir postagem`
  - Validações e regras de negocio:
    - token e id devem ser string
  - Observação: `A postagem podera ser apagada apenas por quem a criou.`

&nbsp;

7.Like e Dislike
  - Método: `PUT`
  - Caminho: `/posts/:id/like`
  - Entrada: `token, id do post e um true(like) ou false(dislike)`
  - Saida: 
  - Validações e regras de negocio:
    - `token e id devem ser uma string, enquanto o like deve ser um boolean`
    


#

### Documentação (links)
- [Postman](https://documenter.getpostman.com/view/24823240/2s93mBxefm)


&nbsp;

### Tecnologias utilizadas
- NodeJS
- TypeScript
- SQLite
- sqlite3
- Knex
- Express
- Cors
- bcryptjs
- dotenv
- jsonwebtoken
- uuid
- zod

&nbsp;

### Programas utilizados
- Git
- VSCode
- Extensão MySQL
- Extensão Thunder Client
- Postman API Platform

&nbsp;

### Autor
- [Adriano Silva](https://github.com/AdrianoSilva42) - desenvolvedor web Full-Stack em treinamento pela [Labenu](https://www.labenu.com.br)
- [![Linkedin](https://encurtador.com.br/MSY09)](https://www.linkedin.com/in/adriano-h-silva/)


