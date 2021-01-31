    <h1>
        Linx - Teste Técnico
    </h1>
    <div>
        <h2>
            Dependências
        </h2>
        <ul>
            <li>
                docker-compose version 1.28.2
            </li>
            <li>
                yarn ou npm para gerenciar os pacotes
            </li>
            <li>
                node v15.6.0
            </li>
        </ul>
    </div>
    <div>
        <h2>
            Instruções
        </h2>
        <ol>
            <li>
                cp .env.example .env
            </li>
            <li>
                modificar a variável de ambiente CATALOG_HOST no arquivo .env para o ipv4 da máquina
            </li>
            <li>
                . ./.env
            </li>
            <li>
                docker-compose up --build -d
            </li>
            <li>
               cd catalog-api 
            </li>
            <li>
                yarn run seed <br>
                ou <br>
                npm run seed
            </li>
            <li>
                cd ../
            </li>
            <li>
                cd frontend-layout
            </li>
            <li>
                yarn <br>
                ou <br>
                npm install
            </li>
            <li>
                yarn run dev<br>
                ou <br>
                npm run dev
            </li>
        </ol>
    </div>
    <div>
        <h2>
            API de Catálogo
        </h2>
        <p>
            A api de catálogo tem a funcionalidade de disponibilizar informações de um catálogo de produtos fornecido pelo teste. Por meio
            das rotas é possível requisitar os produtos com informações completas ou compactadas (apenas nome, preço, estado e categorias).
            Os dados foram guardados no banco não relacional Mongo e o aplicativo foi desenvolvido com o framework restify que possui
            ferramentas para apoiar a construção de um servidor REST.
        </p>
    
        <div>
            <h3>
                Endpoints:
            </h3>
            <ul>
                <li>
                    GET /product/complete?id
                    <p>
                        Retorna as informações dos produtos das ids fornecidas
                    </p>
                </li>
                <li>
                    GET /product/compact?id
                    <p>
                        Retorna o nome, preço, estado e as categorias dos protudos das ids fornecidas
                    </p>
                </li>
            </ul>
            <p>
                 as duas rotas recebem um parâmetro obrigatório chamado id, ele pode ser uma lista de IDs do catálogo ou apenas um.
            </p>

            <h3>
                exemplos:
            </h3>
            <ul>
                <li>
                    http://localhost:5000/product/complete?id=123<br>
                    Retorna um objeto com as informações do produto 123
                </li>
                <br>
                <li>
                    http://localhost:5000/product/complete?id=123,456,321<br>
                    Retorna uma lista de objetos com as informações dos produtos 123,456,321
                </li>
            </ul>
        </div>

        <div>
            <h3>
                Resolução dos itens 1 da api de catálogo e de recomendação
            </h3>
            <p>
                A ideia da aplicação do teste era de uma api que recebendo um ID fornecia a informação do produto. Sabendo que o
                servidor de recomendação acessaria o servidor de catálogo para a listagem de produtos, então adicionei a possibilidade
                de utilizar uma lista de IDs para diminuir a quantidade de acesso ao servidor. Para não ter requisições caras ao SGBD
                eu utilize o ODM mongoose que fornece toda uma interface de gerenciamente ao banco, como também o operador 'in' afim de
                tornar a busca da lista de produtos uma busca única.
            </p>
        </div>
    </div>
    
    <div>
        <h2>
            API de Recomendações
        </h2>
        <p>
            O servidor de recomendações se comunica com duas APIs, uma disponibilizada pelo teste para adquirir a lista de recomendação e a
            API de catálogo para adquirir as informações dos produtos. Possui uma única rota que recebe um parâmetro maxProducts que
            tem um valor padrão de 10, ele é responsável pela quantidades de produtos recomendados e não pode ser maior que 10.
        </p>
    </div>

    <div>
        <h3>
            Endpoint:
        </h3>
        <ul>
            <li>
                GET /recommendations<br>
                <p>
                    Retorna um objeto com as listas de produtos mais populares e outra com ofertas
                </p>

            </li>
        </ul>
        <p>
            possui o parâmetro maxProducts que define a quantidade de produtos
        </p>

        <h3>
            exemplos:
        </h3>
        <ul>
            <li>
                http://localhost:5051/recommendations?maxProducts=16<br>
                Retorna um objeto com duas listas de 16 elementos dos produtos com ofertas e mais populares
            </li>
            <br>
            <li>
                http://localhost:5051/recommendations?maxProducts=12<br>
                Retorna um objeto com duas listas de 12 elementos dos produtos com ofertas e mais populares
            </li>
        </ul>
    </div>

    <div>
        <h2>
            Frontend
        </h2>
        <p>
            O frontend consiste na apresentação em duas vitrines com 16 produtos da api de recomendações.
        </p>
        <h3>
            Diferenciais
        </h3>
        <ul>
            <li>
                Foi utilizado o parcel Bundle como ferramenta de build;
            </li>
            <li>
                O pré-processado de css foi o sass;
            </li>
        </ul>
    </div>