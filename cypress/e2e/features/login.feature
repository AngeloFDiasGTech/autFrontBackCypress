#language: pt

Funcionalidade: Login
  Como um usuário do sistema
  Eu quero fazer login
  Para acessar o sistema

    Cenário: Validação dos campos obrigatórios
        Dado que estou na página de login
        Quando preencho todos os campos obrigatórios
        E clico no botão de login
        Então devo ver a mensagem