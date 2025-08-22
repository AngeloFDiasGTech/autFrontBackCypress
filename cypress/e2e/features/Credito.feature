#language: pt

Funcionalidade: Solictação de créditos
  Como um usuário do sistema
  Eu quero solicitar créditos
  Para avaliação de crédito

  Contexto:
    Dado que estou na página de solicitação de crédito

    Cenário: Validação dos campos obrigatórios
        Quando preencho todos os campos obrigatórios
        E clico no botão de solicitar crédito
        Então devo ver a mensagem


    Esquema do Cenário: Validação de crédito - Aprovação e Reprovação
        Quando preencho todos os campos obrigatórios
        E coloco uma renda de <renda>
        E clico no botão de solicitar crédito
        Então devo ver a mensagem de <status> de crédito

    Exemplos:
        | renda | status   |
        | "2000"  | "APROVADA" |
        | "1000"  | "REPROVADA" |