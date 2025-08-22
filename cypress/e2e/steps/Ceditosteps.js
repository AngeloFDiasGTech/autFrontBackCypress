/// <reference types="cypress" />


import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import CreditoPage from "../../support/Pages/CreditoPage";
import { faker } from '@faker-js/faker';

function gerarCPF() {
    let n = [];
    for (let i = 0; i < 9; ++i) n[i] = Math.floor(Math.random() * 10);
    n[9] = ((n[0]*10 + n[1]*9 + n[2]*8 + n[3]*7 + n[4]*6 + n[5]*5 + n[6]*4 + n[7]*3 + n[8]*2) % 11);
    n[9] = n[9] < 2 ? 0 : 11 - n[9];
    n[10] = ((n[0]*11 + n[1]*10 + n[2]*9 + n[3]*8 + n[4]*7 + n[5]*6 + n[6]*5 + n[7]*4 + n[8]*3 + n[9]*2) % 11);
    n[10] = n[10] < 2 ? 0 : 11 - n[10];
    return `${n.slice(0,3).join('')}.${n.slice(3,6).join('')}.${n.slice(6,9).join('')}-${n.slice(9,11).join('')}`;
}

Given("que estou na página de solicitação de crédito", () => {
    CreditoPage.visit();
    cy.DataRandomica().then((data) => {
        cy.log(data);
    });
})

When("preencho todos os campos obrigatórios", () => {
    const nome = faker.person.fullName();
    const email = faker.internet.email();
    const renda = faker.number.int({ min: 1000, max: 50000 }).toString()
    const cpf = gerarCPF();
    CreditoPage.preencherCamposObrigatorios(
        nome, email, '2000', cpf, renda
    );
})

And("clico no botão de solicitar crédito", () => {
    CreditoPage.apertarBotaoSolicitarCredito();
})

When("coloco uma renda de {string}", (renda) => {
    cy.log("Alteração de renda para: " + renda)
    CreditoPage.preencherRenda(renda);
})

Then("devo ver a mensagem", () => {
    cy.get('#result').should('exist').should('be.visible');
    cy.screenshot('mensagem-resultado')
})

Then("devo ver a mensagem de {string} de crédito", (status) => {
    CreditoPage.verificarStatusDaMensam(status);
    cy.screenshot(`mensagem-credito-${status}`)
})
