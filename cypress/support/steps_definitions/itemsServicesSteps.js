/// <reference types="cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// Step que recebe o nome da fixture do Exemplo
Given("que eu tenho os dados de um novo item no arquivo {string}", (fixtureName) => {
    cy.fixture(fixtureName).as('itemData');
});

// Reutilizável: usa a baseUrl e os dados do contexto
When("eu fizer uma requisição POST para o endpoint base de itens com os dados do item", function () {
    cy.request({
        method: 'POST',
        url: Cypress.config('baseUrl'),
        body: this.itemData,
        failOnStatusCode: false // Importante para não falhar no teste de status 4xx e 5xx
    }).as('response');
});

// --- STEPS PARA LISTAGEM (GET ALL) ---

When("eu fizer uma requisição GET para o endpoint base de itens", () => {
    cy.request({
        method: 'GET',
        url: Cypress.config('baseUrl'),
    }).as('response');
});

Then("o corpo da resposta deve ser um array", () => {
    cy.get('@response').its('body').should('be.an', 'array');
});

// --- STEPS PARA CRIAÇÃO (POST) ---

When("eu fizer uma requisição POST para o endpoint base de itens com estes dados", function () {
    cy.request({
        method: 'POST',
        url: Cypress.config('baseUrl'),
        body: this.itemData,
        failOnStatusCode: false // Permite testar status codes de erro (4xx, 5xx)
    }).as('response');
});

// --- STEPS PARA O FLUXO CRUD ---

// Armazena o ID do item criado no contexto do cenário
Then("eu armazeno o {string} do item criado", function (propriedade) {
    cy.get('@response').then((response) => {
        this.createdItemId = response.body[propriedade];
    });
});

// Faz uma requisição GET para o item específico usando o ID armazenado
When("eu fizer uma requisição GET para o endpoint do item que criei", function () {
    cy.request({
        method: 'GET',
        url: `${Cypress.config('baseUrl')}/${this.createdItemId}`,
        failOnStatusCode: false // Permite testar o 404 no final do fluxo
    }).as('response');
});

// Valida se o corpo da resposta corresponde aos dados usados na criação
Then("o corpo da resposta deve conter os dados do item que criei", function () {
    cy.get('@response').its('body.name').should('eq', this.itemData.name);
    cy.get('@response').its('body.description').should('eq', this.itemData.description);
});

// Carrega os dados para a edição
Given("que eu tenho os dados de atualização do item do arquivo {string}", function (fixtureName) {
    cy.fixture(fixtureName).then((itemData) => {
        this.itemDataEdicao = itemData;
    });
});

// Faz a requisição PUT com os dados de edição
When("eu fizer uma requisição PUT para o endpoint do item que criei com os dados de atualização", function () {
    cy.request({
        method: 'PUT',
        url: `${Cypress.config('baseUrl')}/${this.createdItemId}`,
        body: this.itemDataEdicao
    }).as('response');
});

// Valida se o corpo da resposta corresponde aos dados da edição
Then("o corpo da resposta deve conter os dados do item atualizado", function () {
    cy.get('@response').its('body.name').should('eq', this.itemDataEdicao.name);
    cy.get('@response').its('body.description').should('eq', this.itemDataEdicao.description);
});

// Faz a requisição DELETE para o item criado
When("eu fizer uma requisição DELETE para o endpoint do item que criei", function () {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.config('baseUrl')}/${this.createdItemId}`
    }).as('response');
});