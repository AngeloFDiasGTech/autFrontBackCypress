/// <reference types="cypress" />


import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given("que estou na página de login", () => {
    cy.visit('/')
})

When("preencho todos os campos obrigatórios", () => {
    cy.get('#nome').type('Anjo')
    cy.get('#email').type('a@a.com')
    cy.get('#renda').type('2000')
    cy.get('#cpf').type('123.456.789-01')
    cy.get('#credito').type('1000')
})

And("clico no botão de login", () => {
    cy.get('[type="submit"]').click()
})

Then("devo ver a mensagem", () => {
    cy.get('#result').should('exist').should('be.visible')
})