/// <reference types="cypress" />
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

import serviceBase from "../serviceBase";

When("eu fizer uma requisição GET para o endpoint base de itens", () => {
    cy.request({
        method: 'GET',
        url: Cypress.config('baseUrl')
    }).as('response');
});

Then("a resposta deve ter o status code {int}", (statusCode) => {
    cy.get('@response').its('status').should('eq', statusCode);
});

Then("o corpo da resposta deve ser um array", () => {
    cy.get('@response').its('body').should('be.an', 'array');
});

// Carrega uma fixture e a armazena no contexto do cenário
Given("que eu tenho os dados de um novo item do arquivo {string}", function (fixtureName) {
    cy.fixture(fixtureName).then((itemData) => {
        this.itemData = itemData;
    });
});







// Com ServiceBase


When("eu fizer uma requisição GET para {string}", (endpoint) => {
    cy.request({
        method: 'GET',
        url: `http://localhost:8080${endpoint}`
    }).as('response'); // Salva a resposta com um alias
});

Then("a resposta deve ter o status code {int}", (statusCode) => {
    cy.get('@response').its('status').should('eq', statusCode);
});

Then("o corpo da resposta deve ser um array", () => {
    cy.get('@response').its('body').should('be.an', 'array');
});

// Steps para o cenário de POST
Given("que eu tenho os dados de um novo item no arquivo {string}", (fixtureName) => {
    cy.fixture(fixtureName).as('itemData'); // Carrega a fixture e salva com um alias
});

When("eu fizer uma requisição POST para {string} com os dados do item", function (endpoint) {
    cy.request({
        method: 'POST',
        url: `http://localhost:8080${endpoint}`,
        body: this.itemData // Acessa os dados salvos pelo alias
    }).as('response');
});

Then("o corpo da resposta deve conter os dados do item criado", function () {
    cy.get('@response').its('body.name').should('eq', this.itemData.name);
    cy.get('@response').its('body.description').should('eq', this.itemData.description);
});

Then("o corpo da resposta deve conter uma propriedade {string}", (propriedade) => {
    cy.get('@response').its('body').should('have.property', propriedade);
});