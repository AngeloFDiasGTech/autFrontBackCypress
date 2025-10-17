#language: pt

@itemsServicesV1
@regressionTest
Funcionalidade: API V1 - Items

    Como usuário da API de Itens
    Quero manipular os dados via endpoints
    Para validar suas determidas ações
    Swagger - http://localhost:8080/swagger-ui.html#/


  Cenário: Listar todos os itens com sucesso
    Quando eu fizer uma requisição GET para o endpoint base de itens
    Então a resposta deve ter o status code 200
    E o corpo da resposta deve ser um array

  Esquema do Cenário: Criar um novo item com diferentes dados
    Dado que eu tenho os dados de um novo item no arquivo <fixture>
    Quando eu fizer uma requisição POST para o endpoint base de itens com os dados do item
    Então a resposta deve ter o status code <status_code>

  Exemplos:
    | caso_de_teste               | fixture                  | status_code |
    | 'Criação com sucesso'       | 'novo_item_valido.json'  | 201         |
    | 'Falha por falta de nome'   | 'item_sem_nome.json'     | 400         |

Esquema do Cenário: Realizar um fluxo CRUD completo para um item
    # CREATE
    Dado que eu tenho os dados de um novo item do arquivo <fixture_criacao>
    Quando eu fizer uma requisição POST para o endpoint base de itens com estes dados
    Então a resposta deve ter o status code 201
    E eu armazeno o "id" do item criado

    # READ
    Quando eu fizer uma requisição GET para o endpoint do item que criei
    Então a resposta deve ter o status code 200
    E o corpo da resposta deve conter os dados do item que criei

    # UPDATE
    Dado que eu tenho os dados de atualização do item do arquivo <fixture_edicao>
    Quando eu fizer uma requisição PUT para o endpoint do item que criei com os dados de atualização
    Então a resposta deve ter o status code 200
    E o corpo da resposta deve conter os dados do item atualizado

    # DELETE
    Quando eu fizer uma requisição DELETE para o endpoint do item que criei
    Então a resposta deve ter o status code 204

    # VERIFY DELETION
    Quando eu fizer uma requisição GET para o endpoint do item que criei
    Então a resposta deve ter o status code 404

    Exemplos:
      | fixture_criacao           | fixture_edicao         |
      | 'novo_item_valido.json'   | 'item_para_edicao.json'|