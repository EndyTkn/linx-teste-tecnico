# Linx - Teste Técnico

## Dependências

*   docker-compose version 1.28.2
*   yarn ou npm para gerenciar os pacotes
*   node v15.6.0

## Instruções

1.  cp .env.example .env
2.  modificar a variável de ambiente CATALOG_HOST no arquivo .env para o ipv4 da máquina
3.  . ./.env
4.  docker-compose up --build -d
5.  cd catalog-api
6.  yarn run seed  
    ou  
    npm run seed
7.  cd ../
8.  cd frontend-layout
9.  yarn  
    ou  
    npm install
10.  yarn run dev  
    ou  
    npm run dev

## API de Catálogo

A api de catálogo tem a funcionalidade de disponibilizar informações de um catálogo de produtos fornecido pelo teste. Por meio das rotas é possível requisitar os produtos com informações completas ou compactadas (apenas nome, preço, estado e categorias). Os dados foram guardados no banco não relacional Mongo e o aplicativo foi desenvolvido com o framework restify que possui ferramentas para apoiar a construção de um servidor REST.

### Endpoints:

*   GET /product/complete?id

    Retorna as informações dos produtos das ids fornecidas

*   GET /product/compact?id

    Retorna o nome, preço, estado e as categorias dos protudos das ids fornecidas

as duas rotas recebem um parâmetro obrigatório chamado id, ele pode ser uma lista de IDs do catálogo ou apenas um.

### exemplos:

*   http://localhost:5000/product/complete?id=123  
    Retorna um objeto com as informações do produto 123

*   http://localhost:5000/product/complete?id=123,456,321  
    Retorna uma lista de objetos com as informações dos produtos 123,456,321

### Resolução dos itens 1 da api de catálogo e de recomendação

A ideia da aplicação do teste era de uma api que recebendo um ID fornecia a informação do produto. Sabendo que o servidor de recomendação acessaria o servidor de catálogo para a listagem de produtos, então adicionei a possibilidade de utilizar uma lista de IDs para diminuir a quantidade de acesso ao servidor. Para não ter requisições caras ao SGBD eu utilize o ODM mongoose que fornece toda uma interface de gerenciamente ao banco, como também o operador 'in' afim de tornar a busca da lista de produtos uma busca única.

## API de Recomendações

O servidor de recomendações se comunica com duas APIs, uma disponibilizada pelo teste para adquirir a lista de recomendação e a API de catálogo para adquirir as informações dos produtos. Possui uma única rota que recebe um parâmetro maxProducts que tem um valor padrão de 10, ele é responsável pela quantidades de produtos recomendados e não pode ser maior que 10.

### Endpoint:

*   GET /recommendations  

    Retorna um objeto com as listas de produtos mais populares e outra com ofertas

possui o parâmetro maxProducts que define a quantidade de produtos

### exemplos:

*   http://localhost:5051/recommendations?maxProducts=16  
    Retorna um objeto com duas listas de 16 elementos dos produtos com ofertas e mais populares

*   http://localhost:5051/recommendations?maxProducts=12  
    Retorna um objeto com duas listas de 12 elementos dos produtos com ofertas e mais populares

## Frontend

O frontend consiste na apresentação em duas vitrines com 16 produtos da api de recomendações.

### Diferenciais

*   Foi utilizado o parcel Bundle como ferramenta de build;
*   O pré-processado de css foi o sass;