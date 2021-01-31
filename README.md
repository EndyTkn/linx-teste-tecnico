# Linx - Teste Técnico

## Dependências

*   [docker-compose](https://docs.docker.com/compose/install/)  = 1.28.2
*   [docker](https://docs.docker.com/engine/install/) >= 20.10.2
*   [node](https://nodejs.org/en/) >= v15.6.0 
*   [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable) >= 1.22.10 ou [npm](https://docs.npmjs.com/about-npm) >= 6.16.9


## Instruções
copiar o arquivo de configuração:
```sh
cp .env.example .env
```
executar o arquivo de configuração:
```sh
. ./.env
```
subir os servidores:
```sh
docker-compose up --build -d
```
entrar na pasta de catálog:
```sh
cd catalog-api
```
executar sprint para popular o servidor:
```sh
yarn && yarn run seed
ou  
npm install && npm run seed
```
entrar na pasta do front:
```sh
cd ../
```
```sh
cd frontend-layout
```
instalar dependência do Parcel Bundle:
```sh
yarn  
ou  
npm install
```
Executar o front:
```sh
yarn run dev  
ou  
npm run dev
```

observações: caso a rede criada pelo docker-compose já esteja sendo utilizada, há casos que é necessário configurar manualmente a rede, modificando as variáveis CATALOG_HOST e CATALOG_DB_HOST no arquivo .env, também vai ser preciso modificar no docker-compose um novo ip no seção de network.
## API de Catálogo

A api de catálogo tem a funcionalidade de disponibilizar informações de um catálogo de produtos fornecido pelo teste. Por meio das rotas é possível requisitar os produtos com informações completas ou compactadas (apenas nome, preço, estado e categorias). Os dados foram guardados no banco não relacional Mongo e o aplicativo foi desenvolvido com o framework restify que possui ferramentas para apoiar a construção de um servidor REST.

### Endpoints:
Retorna as informações dos produtos das ids fornecidas:
```sh
GET /product/complete?id
```
Retorna o nome, preço, estado e as categorias dos protudos das ids fornecidas:
```sh
GET /product/compact?id
```

as duas rotas recebem um parâmetro obrigatório chamado id, ele pode ser uma lista de IDs do catálogo ou apenas um.

### exemplos:

Retorna um objeto com as informações do produto 123:
```sh
http://localhost:5000/product/complete?id=123  
```
Retorna uma lista de objetos com as informações dos produtos 123,456,321:
```sh
http://localhost:5000/product/complete?id=123,456,321  
```
### Resolução do item 1 dos diferenciais da api de catálogo

A ideia da aplicação do teste era de uma api que recebendo um ID fornecia a informação do produto. Sabendo que o servidor de recomendação acessaria o servidor de catálogo para a listagem de produtos, então adicionei a possibilidade de utilizar uma lista de IDs para diminuir a quantidade de acesso ao servidor. Para não ter requisições caras ao SGBD eu utilize o ODM mongoose que fornece toda uma interface de gerenciamente ao banco, como também o operador 'in' afim de tornar a busca da lista de produtos uma busca única.

## API de Recomendações

O servidor de recomendações se comunica com duas APIs, uma disponibilizada pelo teste para adquirir a lista de recomendação e a API de catálogo para adquirir as informações dos produtos. Possui uma única rota que recebe um parâmetro maxProducts que tem um valor padrão de 10, ele é responsável pela quantidades de produtos recomendados e não pode ser maior que 10.

### Endpoint:

Retorna um objeto com as listas de produtos mais populares e outra com ofertas:
```sh
GET /recommendations  
```
*   possui o parâmetro maxProducts que define a quantidade de produtos

### exemplos:

Retorna um objeto com duas listas de 16 elementos dos produtos com ofertas e mais populares:
```sh
http://localhost:5051/recommendations?maxProducts=16  
```
Retorna um objeto com duas listas de 12 elementos dos produtos com ofertas e mais populares:
```sh
http://localhost:5051/recommendations?maxProducts=12  
```

### Resolução do item 1 dos diferenciais da api de catálogo

Muitas vezes para fazer um software é necessário pesquisar sobre o ambiente e as regras de negócio. Sabendo que a api do wishlist fornece sempre uma lista pequena IDs, então ela é enviada ao servidor de catálogo para conseguir todas as informações, assim é possível adquirir todas as informações em uma só requisição. É verificado se os produtos estão disponíveis e os que não estão são descartados.

* Resolução do Pior Caso (Não Implementada):

    Digamos que o wishlist fornece uma lista bem grande de IDs, então enviar todos os IDs em uma
    única requisição não é viável. Para resolver, definiria uma constante MAX_PRODUCT_PER_QUERY que define o número máximo de IDs que pudessem ser enviados para o servidor catálogo, enviaria uma quantidade MAX_PRODUCT_PER_QUERY de IDs para o servidor e pós isso verificaria quantos produtos adquiridos são válidos, se forem o suficiente para satisfazer o parâmetro maxProduct enviado na rota, então é validado e enviado para o cliente, caso contrário, é enviado mais IDs para o catálogo até satisfazer o maxProduct.

## Frontend

O frontend consiste na apresentação em duas vitrines com 16 produtos da api de recomendações.

### Diferenciais

*   Foi utilizado o [parcelJs](https://parceljs.org/) como ferramenta de build;
*   O pré-processado de css foi o [sass](https://sass-lang.com/);
