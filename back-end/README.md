# My-ShoppingAssistant Back-end

## Contratos dos Endpoints

- [My-ShoppingAssistant Back-end](#my-shoppingassistant-back-end)
	- [Contratos dos Endpoints](#contratos-dos-endpoints)
	- [Login Endpoints](#login-endpoints)
		- [LoginForm](#loginform)
		- [LoggedUserDto](#loggeduserdto)
		- [LoginDto](#logindto)
		- [POST login](#post-login)
		- [GET logged-user](#get-logged-user)
	- [Users Endpoints](#users-endpoints)
		- [UserDto](#userdto)
		- [PagedUserDto](#pageduserdto)
		- [UserFilteredSortedCollectionsDto](#userfilteredsortedcollectionsdto)
		- [UserForm](#userform)
		- [GET users](#get-users)
		- [GET users/:id](#get-usersid)
		- [GET users/:id/collection](#get-usersidcollection)
		- [POST users](#post-users)
		- [PUT users/:id](#put-usersid)
		- [DELETE users/:id](#delete-usersid)
	- [Collections Endpoints](#collections-endpoints)
		- [CollectionDto](#collectiondto)
		- [PagedCollectionDto](#pagedcollectiondto)
		- [CollectionFilteredSortedProductsDto](#collectionfilteredsortedproductsdto)
		- [CollectionForm](#collectionform)
		- [GET collections](#get-collections)
		- [GET collections/:id](#get-collectionsid)
		- [GET collections/:id/product](#get-collectionsidproduct)
		- [POST collections](#post-collections)
		- [PUT collections/:id](#put-collectionsid)
		- [DELETE collections/:id](#delete-collectionsid)
	- [Products Endpoints](#products-endpoints)
		- [ProductDto](#productdto)
		- [PagedProductDto](#pagedproductdto)
		- [ProductForm](#productform)
		- [GET products](#get-products)
		- [GET products/:id](#get-productsid)
		- [POST products](#post-products)
		- [PUT products/:id](#put-productsid)
		- [DELETE products/:id](#delete-productsid)

---

## Login Endpoints

### LoginForm

```json
{
  "username": "user 1",
  "password": "password1"
}
```

### LoggedUserDto

```json
{
  "userId": "61d8d5a903b4e6912e202389",
  "username": "user 1"
}
```

### LoginDto

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIgMSIsInN1YiI6IjYxZDhkYTI4M2VjZDRiOGM0ODlhMzc3OCIsImlhdCI6MTY0MTYwMTU4NCwiZXhwIjoxNjQxNjg3OTg0fQ.ikoM4TvqwdpFfRL6lxexZTqFhn7V_HeBvJ4qOLmIFFA"
}
```

### POST login

- **Função**: `Efetua login do usuário`
- **Método HTTP**: `POST`
- **Path**: `/login`
- **Exige autenticação?**: `Não`
- **Path params**: `none`
- **Query params**: `none`
- **Request body params**: [LoginForm](#loginform)
- **Response Body**: [LoginDto](#logindto)

### GET logged-user

- **Função**: `Recupera o usuário logado`
- **Método HTTP**: `GET`
- **Path**: `/logged-user`
- **Exige autenticação?**: `Sim`
- **Path params**: `none`
- **Query params**: `none`
- **Request body params**: `none`
- **Response Body**: [LoggedUserDto](#loggeduserdto)

---

## Users Endpoints

### UserDto

```json
{
  "_id": "61d8da283ecd4b8c489a3778",
  "collections": [
    "61d8dd4f076849b5c5ad4624",
    "61d90ca3767c7b9ceb1cfeb7"
  ],
  "password": "password1",
  "email": "test1@email.com",
  "username": "user 1",
  "__v": 0
}
```

### PagedUserDto

```json
{
	"firstPage": 0,
	"page": 0,
	"elementsPerPage": 5,
	"totalElements": 4,
	"lastPage": 0,
	"users": [ ...UserDto ]
}
```

### UserFilteredSortedCollectionsDto

```json
{
  "filters": [
    {
      "name": "COLLECTION_FINISHED",
      "text": "Coleções finalizadas"
    },
    {
      "name": "COLLECTION_OPEN",
      "text": "Coleções abertas"
    }
  ],
  "sorters": [
    {
      "name": "ALPHABETICAL_ASC",
      "text": "Ordem alfabética crescente"
    },
    {
      "name": "ALPHABETICAL_DESC",
      "text": "Ordem alfabética decrescente"
    }
  ],
  "collections": ...PagedCollectionDto
}
```

### UserForm

```json
{
  "username": "user 1",
  "email": "test1@email.com",
  "password": "password1"
}
```

### GET users

- **Função**: `Recupera todos os usuários cadastrados`
- **Método HTTP**: `GET`
- **Path**: `/users?page=0&elementsPerPage=10`
- **Exige autenticação?**: `Sim`
- **Path params**: `none`
- **Query params**: `[page inteiro começando por zero], [elementsPerPage inteiro começando por 1]`
- **Request body params**: `none`
- **Response Body**: [PagedUserDto](#pageduserdto)

### GET users/:id

- **Função**: `Recupera um usuário dado seu ID`
- **Método HTTP**: `GET`
- **Path**: `/users/:id`
- **Exige autenticação?**: `Sim`
- **Path params**: `id do elemento (string)`
- **Query params**: `none`
- **Request body params**: `none`
- **Response Body**: [UserDto](#userdto)

### GET users/:id/collection

- **Função**: `Recupera um usuário e suas coleções com os elementos de ordenação e filtragem das coleções`
- **Método HTTP**: `GET`
- **Path**: `/users/:id/collection?filter=COLLECTION_OPEN&sort=ALPHABETICAL_DESC`
- **Exige autenticação?**: `Sim`
- **Path params**: `id do elemento (string)`
- **Query params**: `[filter (string contendo o campo 'name' de um dos filters do UserFilteredSortedCollectionsDto)], [sort (string contendo o campo 'name' de um dos sorters do UserFilteredSortedCollectionsDto)], [page inteiro começando por zero], [elementsPerPage inteiro começando por 1]`
- **Request body params**: `none`
- **Response Body**: [UserFilteredSortedCollectionsDto](#userfilteredsortedcollectionsdto)

### POST users

- **Função**: `Cria um novo usuário`
- **Método HTTP**: `POST`
- **Path**: `/users`
- **Exige autenticação?**: `Sim`
- **Path params**: `none`
- **Query params**: `none`
- **Request body params**: [UserForm](#userform)
- **Response Body**: [UserDto](#userdto)

### PUT users/:id

- **Função**: `Atualiza um usuário`
- **Método HTTP**: `PUT`
- **Path**: `/users/:id`
- **Exige autenticação?**: `Sim`
- **Path params**: `id do elemento (string)`
- **Query params**: `none`
- **Request body params**: [UserForm](#userform)
- **Response Body**: [UserDto](#userdto)

### DELETE users/:id

- **Função**: `Remove um usuário`
- **Método HTTP**: `DELETE`
- **Path**: `/users/:id`
- **Exige autenticação?**: `Sim`
- **Path params**: `id do elemento (string)`
- **Query params**: `none`
- **Request body params**: `none`
- **Response Body**: [UserDto](#userdto)

---

## Collections Endpoints

### CollectionDto

```json
{
  "_id": "61d8dd4f076849b5c5ad4624",
  "products": [
    "61d90629d1600b609a6c3ab8",
    "61d910353dbd80af1ddfa03e"
  ],
  "name": "Coleção 2",
  "__v": 0
}
```

### PagedCollectionDto

```json
{
	"firstPage": 0,
	"page": 0,
	"elementsPerPage": 5,
	"totalElements": 4,
	"lastPage": 0,
	"collections": [ ...CollectionDto ]
}
```

### CollectionFilteredSortedProductsDto

```json
{
  "filters": [
    {
      "name": "FREE_SHIPPING",
      "text": "Frete grátis"
    }
  ],
  "sorters": [
    {
      "name": "MORE_ADVANTAGES",
      "text": "Mais vantagens"
    },
    {
      "name": "LESS_DISADVANTAGES",
      "text": "Menos desvantagens"
    },
    {
      "name": "CHEAPER",
      "text": "Mais baratos"
    }
  ],
  "products": ...PagedProductDto
}
```

### CollectionForm

```json
{
  "name": "Minha Coleção 1"
}
```

### GET collections

- **Função**: `Recupera todas as coleções criadas`
- **Método HTTP**: `GET`
- **Path**: `/collections?page=0&elementsPerPage=10`
- **Exige autenticação?**: `Sim`
- **Path params**: `none`
- **Query params**: `[page inteiro começando por zero], [elementsPerPage inteiro começando por 1]`
- **Request body params**: `none`
- **Response Body**: [PagedCollectionDto](#pagedcollectiondto)

### GET collections/:id

- **Função**: `Recupera uma coleção dado seu ID`
- **Método HTTP**: `GET`
- **Path**: `/collections/:id`
- **Exige autenticação?**: `Sim`
- **Path params**: `id do elemento (string)`
- **Query params**: `none`
- **Request body params**: `none`
- **Response Body**: [CollectionDto](#collectiondto)

### GET collections/:id/product

- **Função**: `Recupera uma coleção e seus produtos com os elementos de ordenação e filtragem dos produtos`
- **Método HTTP**: `GET`
- **Path**: `/collections/:id/product?filter=FREE_SHIPPING&sort=CHEAPER`
- **Exige autenticação?**: `Sim`
- **Path params**: `id do elemento (string)`
- **Query params**: `[filter (string contendo o campo 'name' de um dos filters do CollectionFilteredSortedProductsDto)], [sort (string contendo o campo 'name' de um dos sorters do CollectionFilteredSortedProductsDto)], [page inteiro começando por zero], [elementsPerPage inteiro começando por 1]`
- **Request body params**: `none`
- **Response Body**: [CollectionFilteredSortedProductsDto](#collectionfilteredsortedproductsdto)

### POST collections

- **Função**: `Cria uma nova coleção`
- **Método HTTP**: `POST`
- **Path**: `/collections`
- **Exige autenticação?**: `Sim`
- **Path params**: `none`
- **Query params**: `none`
- **Request body params**: [CollectionForm](#collectionform)
- **Response Body**: [CollectionDto](#collectiondto)

### PUT collections/:id

- **Função**: `Atualiza uma coleção`
- **Método HTTP**: `PUT`
- **Path**: `/collections/:id`
- **Exige autenticação?**: `Sim`
- **Path params**: `id do elemento (string)`
- **Query params**: `none`
- **Request body params**: [CollectionForm](#collectionform)
- **Response Body**: [CollectionDto](#collectiondto)

### DELETE collections/:id

- **Função**: `Remove uma coleção`
- **Método HTTP**: `DELETE`
- **Path**: `/collections/:id`
- **Exige autenticação?**: `Sim`
- **Path params**: `id do elemento (string)`
- **Query params**: `none`
- **Request body params**: `none`
- **Response Body**: [CollectionDto](#collectiondto)

---

## Products Endpoints

### ProductDto

```json
{
  "_id": "61d90629d1600b609a6c3ab8",
  "collectionId": "61d8dd4f076849b5c5ad4624",
  "imageUrl": "https://m.media-amazon.com/images/I/61X0ISBpD-L._AC_SL1000_.jpg",
  "productUrl": "https://www.amazon.com.br/dp/B07FQK1TS9/...",
  "disadvantages": [
    "Desvantagem 1"
  ],
  "advantages": [
    "Vantagem 1"
  ],
  "deliveryDate": "2022-02-01T03:00:00.000Z",
  "shipValue": 5.75,
  "price": 379.05,
  "name": "Kindle 10ª Geração",
  "__v": 0
}
```

### PagedProductDto

```json
{
	"firstPage": 0,
	"page": 0,
	"elementsPerPage": 5,
	"totalElements": 4,
	"lastPage": 0,
	"products": [ ...ProductDto ]
}
```

### ProductForm

```json
{
  "name": "Kindle 10ª Geração",
  "price": 450.55,
  "shipValue": 0,
  "deliveryDate": "02/01/2022",
  "advantages": [
    "Vantagem 1"
  ],
  "disadvantages": [
    "Desvantagem 1",
    "Desvantagem 2",
    "Desvantagem 3"
  ],
  "productUrl": "https://www.amazon.com.br/dp/B07FQK1TS9/...",
  "imageUrl": "https://m.media-amazon.com/images/I/61X0ISBpD-L._AC_SL1000_.jpg",
  "collectionId": "61d8dd4f076849b5c5ad4624"
}
```

### GET products

- **Função**: `Recupera todos os produtos cadastrados`
- **Método HTTP**: `GET`
- **Path**: `/products?page=0&elementsPerPage=10`
- **Exige autenticação?**: `Sim`
- **Path params**: `none`
- **Query params**: `[page inteiro começando por zero], [elementsPerPage inteiro começando por 1]`
- **Request body params**: `none`
- **Response Body**: [PagedProductDto](#pagedproductdto)

### GET products/:id

- **Função**: `Recupera um produto dado seu ID`
- **Método HTTP**: `GET`
- **Path**: `/products/:id`
- **Exige autenticação?**: `Sim`
- **Path params**: `id do elemento (string)`
- **Query params**: `none`
- **Request body params**: `none`
- **Response Body**: [ProductDto](#productdto)

### POST products

- **Função**: `Cria um novo produto`
- **Método HTTP**: `POST`
- **Path**: `/products`
- **Exige autenticação?**: `Sim`
- **Path params**: `none`
- **Query params**: `none`
- **Request body params**: [ProductForm](#productform)
- **Response Body**: [ProductDto](#productdto)

### PUT products/:id

- **Função**: `Atualiza um produto`
- **Método HTTP**: `PUT`
- **Path**: `/products/:id`
- **Exige autenticação?**: `Sim`
- **Path params**: `id do elemento (string)`
- **Query params**: `none`
- **Request body params**: [ProductForm](#productform)
- **Response Body**: [ProductDto](#productdto)

### DELETE products/:id

- **Função**: `Remove um produto`
- **Método HTTP**: `DELETE`
- **Path**: `/products/:id`
- **Exige autenticação?**: `Sim`
- **Path params**: `id do elemento (string)`
- **Query params**: `none`
- **Request body params**: `none`
- **Response Body**: [ProductDto](#productdto)