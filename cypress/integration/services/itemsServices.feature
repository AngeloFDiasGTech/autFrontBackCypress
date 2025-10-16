#language: pt

@paymentsServicesV1
@regressionTest
@payinCheckoutSwagger
Funcionalidade: API V1 - PP3 Checkout

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

# # @ignore
#     Scenario Outline: [POST] CRIAR uma transação checkout
#         When executo a requisição POST de CRIAR transação com os dados do <requestBody>
#         Then valido se a requisição retornará o statusCode igual a <status_code>
#         And valido se o Status do checkout está igual ao <status_checkout>

#         Examples:
#             | FormaPagamento | requestBody                             | status_checkout    | status_code |
#             | 'pix'          | 'requestBody_create_pix_transaction'    | 'CREATED'          | '204'       |
#             | 'paypal'       | 'requestBody_create_paypal_transaction' | 'CREATED'          | '204'       |

# # @ignore
#     Scenario Outline: [POST] EXPIRAR uma transação checkout
#         When executo a requisição POST de CRIAR transação com os dados do <requestBodyCreate>
#         And executo a requisição POST de EXPIRAR a transação com <requestBodyExpire>
#         Then valido se a requisição retornará o statusCode igual a <status_code>

#         Examples:
#             | FormaPagamento | requestBodyCreate                       | requestBodyExpire                  | status_checkout    | status_code |
#             | 'pix'          | 'requestBody_create_pix_transaction'    | 'requestBody_expire_transaction'   | 'EXPIRED'          | '204'       |
#             | 'paypal'       | 'requestBody_create_paypal_transaction' | 'requestBody_expire_transaction'   | 'EXPIRED'          | '204'       |

# # @ignore
#     Scenario Outline: [POST] INICIALIZAR uma transação checkout
#         When executo a requisição POST de CRIAR transação com os dados do <requestBodyCreate>
#         And executo a requisição POST de INICIALIZAR transação com os dados <requestBodyInitalize>
#         Then valido se a requisição retornará o statusCode igual a <status_code>
#         And valido se o Status do checkout está igual ao <status_checkout>

#         Examples:
#             | FormaPagamento | requestBodyCreate                        | requestBodyInitalize                          | status_checkout    | status_code |
#             | 'pix'          | 'requestBody_create_pix_transaction'     |'requestBody_initialize_pix_transaction'       | 'INITIALIZED'      | '204'       |
#             | 'paypal'       | 'requestBody_create_paypal_transaction'  |'requestBody_initialize_paypal_transaction'    | 'INITIALIZED'      | '204'       |

# # @ignore
#         Scenario Outline: [POST] ABANDONAR uma transação checkout
#         When executo a requisição POST de CRIAR transação com os dados do <requestBodyCreate>
#         And executo a requisição POST de INICIALIZAR transação com os dados <requestBodyInitalize>
#         And executo a requisição POST de ABANDONAR a transação com <requestBodyAbandon>
#         Then valido se a requisição retornará o statusCode igual a <status_code>

#         Examples:
#             | FormaPagamento    | requestBodyCreate                         | requestBodyInitalize                          | requestBodyAbandon                      | status_checkout  | status_code |
#             | 'pix'             | 'requestBody_create_pix_transaction'      |'requestBody_initialize_pix_transaction'       | 'requestBody_abandon_transaction'       | 'ABANDONED'      | '204'       |
#             | 'paypal'          | 'requestBody_create_paypal_transaction'   |'requestBody_initialize_paypal_transaction'    | 'requestBody_abandon_transaction'       | 'ABANDONED'      | '204'       |    

# # @ignore
#     Scenario Outline: [POST] COLETAR uma transação checkout
#         When executo a requisição POST de CRIAR transação com os dados do <requestBodyCreate>
#         And executo a requisição POST de INICIALIZAR transação com os dados <requestBodyInitalize>
#         And executo a requisição POST de COLETAR transação com os dados <requestBodyCollect>
#         Then valido se a requisição retornará o statusCode igual a <status_code>
#         And valido se o Status do checkout está igual ao <status_checkout>

#         Examples:
#             | FormaPagamento | requestBodyCreate                        | requestBodyInitalize                          | requestBodyCollect                            | status_checkout  | status_code |
#             | 'pix'          | 'requestBody_create_pix_transaction'     |'requestBody_initialize_pix_transaction'       | 'requestBody_collect_pix_transaction'         | 'COLLECTED'      | '204'       |
#             | 'paypal'       | 'requestBody_create_paypal_transaction'  |'requestBody_initialize_paypal_transaction'    | 'requestBody_collect_paypal_transaction'      | 'COLLECTED'      | '204'       |

# # @ignore
#     Scenario Outline: [POST] COMPLETAR uma transação checkout
#         When executo a requisição POST de CRIAR transação com os dados do <requestBodyCreate>
#         And executo a requisição POST de INICIALIZAR transação com os dados <requestBodyInitalize>
#         And executo a requisição POST de COLETAR transação com os dados <requestBodyCollect>
#         And executo a requisição POST de COMPLETAR a transação com <requestBodyComplete>
#         Then valido se a requisição retornará o statusCode igual a <status_code>
#         And valido se o Status do checkout está igual ao <status_checkout>

#         Examples:
#             | FormaPagamento | requestBodyCreate                        | requestBodyInitalize                          | requestBodyCollect                            | requestBodyComplete                                | status_checkout  | status_code |
#             | 'pix'          | 'requestBody_create_pix_transaction'     |'requestBody_initialize_pix_transaction'       | 'requestBody_collect_pix_transaction'         | 'requestBody_complete_pix_transaction'             | 'COMPLETED'      | '204'       |
#             | 'paypal'       | 'requestBody_create_paypal_transaction'  |'requestBody_initialize_paypal_transaction'    | 'requestBody_collect_paypal_transaction'      | 'requestBody_complete_paypal_transaction'          | 'COMPLETED'      | '204'       |
        
# # @ignore
#         Scenario Outline: [POST] CANCELAR uma transação checkout
#         When executo a requisição POST de CRIAR transação com os dados do <requestBodyCreate>
#         And executo a requisição POST de INICIALIZAR transação com os dados <requestBodyInitalize>
#         And executo a requisição POST de COLETAR transação com os dados <requestBodyCollect>
#         And executo a requisição POST de CANCELAR a transação com <requestBodyCancel>
#         Then valido se a requisição retornará o statusCode igual a <status_code>
#         And valido se o Status do checkout está igual ao <status_checkout>

#         Examples:
#             | FormaPagamento    | requestBodyCreate                         | requestBodyInitalize                          | requestBodyCollect                        | requestBodyCancel                      | status_checkout  | status_code |
#             | 'pix'             | 'requestBody_create_pix_transaction'      |'requestBody_initialize_pix_transaction'       | 'requestBody_collect_pix_transaction'     | 'requestBody_cancel_transaction'       | 'CANCELED'       | '204'       |
#             | 'paypal'          | 'requestBody_create_paypal_transaction'   |'requestBody_initialize_paypal_transaction'    | 'requestBody_collect_paypal_transaction'  | 'requestBody_cancel_transaction'       | 'CANCELED'       | '204'       |
