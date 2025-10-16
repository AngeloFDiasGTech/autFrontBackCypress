#language: pt

@paymentsServicesV1
@regressionTest
@payinCheckoutSwagger
Funcionalidade: API V1 - PP3 Checkout

    Como usuário da API de Itens
    Quero manipular os dados via endpoints
    Para validar suas determidas ações
    Swagger - http://localhost:8080/swagger-ui.html#/

  Contexto: Criar um item para os testes de leitura
    Dado que eu crio um item com os dados do arquivo "novo_item_valido.json" e armazeno o seu "id"

  Esquema do Cenário: [GET] - Buscar um item pelo seu ID
    Quando eu fizer uma requisição GET para o endpoint do item usando o id <tipo_id>
    Então a resposta deve ter o status code <status_code>

    Exemplos:
      | caso_de_teste          | tipo_id      | status_code |
      | Busca por ID válido    | 'armazenado' | 200         |
      | Busca por ID inválido  | 'invalido'   | 404         |
  
    Esquema do Cenário: [PUT] - Atualizar um item com diferentes dados
    Dado que eu tenho os dados de atualização do item do arquivo <fixture>
    Quando eu fizer uma requisição PUT para o endpoint do item que criei com os dados de atualização
    Então a resposta deve ter o status code <status_code>

    Exemplos:
      | caso_de_teste                | fixture                           | status_code |
      | Atualização com sucesso      | 'item_para_edicao.json'           | 200         |
      | Falha por nome em branco     | 'item_para_edicao_invalido.json'  | 400         |

  Cenário: [PUT] - Atualizar dinamicamente o nome de um item e validar a alteração
    Dado que eu tenho os dados de atualização do item do arquivo "item_para_edicao.json"
    E eu modifico o "name" do item para incluir um timestamp
    Quando eu fizer uma requisição PUT para o endpoint do item que criei com os dados de atualização
    Então a resposta deve ter o status code 200
    E o "name" no corpo da resposta deve ser igual ao nome que eu modifiquei
  
  Esquema do Cenário: [DELETE] - Deletar um item pelo seu ID
    Quando eu fizer uma requisição DELETE para o endpoint do item usando o id <tipo_id>
    Então a resposta deve ter o status code <status_code>

    Exemplos:
      | caso_de_teste           | tipo_id      | status_code |
      | Deleção com ID válido   | 'armazenado' | 204         |
      | Deleção com ID inválido | 'invalido'   | 404         |