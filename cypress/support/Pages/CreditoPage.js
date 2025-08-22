const ELEMENTS = {
    creditoInput: '#credito',
    rendaInput: '#renda1',
    nomeInput: '#nome',
    emailInput: '#email',
    cpfInput: '#cpf',
    submitButton: '[type="submit"]',
    resultMessage: '#result'
}

class CreditoPage {
    visit() {
        cy.visit('/');
    }
    
    preencherNome(nome) {
        cy.get(ELEMENTS.nomeInput).type(nome);
    }

    preencherEmail(email) {
        cy.get(ELEMENTS.emailInput).type(email);
    }

    preencherCpf(cpf) {
        cy.get(ELEMENTS.cpfInput).type(cpf);
    }

    preencherCredito(credito) {
        cy.get(ELEMENTS.creditoInput).type(credito);
    }

    preencherRenda(renda) {
        cy.get(ELEMENTS.rendaInput).clear().type(renda);
    }

    apertarBotaoSolicitarCredito() {
        cy.get(ELEMENTS.submitButton).click();
    }

    verificarStatusDaMensam(status) {
        cy.get(ELEMENTS.resultMessage).should('exist').should('be.visible').contains(status);
    }

    //AppActions abaixo:
    preencherCamposObrigatorios(nome, email, renda, cpf, credito) {
        cy.get(ELEMENTS.nomeInput).type(nome);
        cy.get(ELEMENTS.emailInput).type(email);
        cy.get(ELEMENTS.rendaInput).type(renda);
        cy.get(ELEMENTS.cpfInput).type(cpf);
        cy.get(ELEMENTS.creditoInput).type(credito);
    }
}

export default new CreditoPage();