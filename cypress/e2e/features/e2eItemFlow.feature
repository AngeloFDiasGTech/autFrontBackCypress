# language: pt
Funcionalidade: Fluxo End-to-End para Itens
    Como um usuário do sistema, eu quero garantir que um item criado via API
    seja exibido corretamente na interface do usuário.

    Esquema do Cenário: Criar item via API e validar no Frontend
    Dado que eu tenho os dados de um item para o teste E2E do arquivo <fixture>
    Quando eu crio o item via requisição POST
    Então a resposta da API deve ter o status code <status_code> e conter a URL do item
    Quando eu visitar a URL do item retornada pela API
    Então a página deve exibir o nome e a descrição do item criado

    Exemplos:
    | fixture                           | status_code |
    | 'novo_item_valido_com_url.json'   | 201         |
