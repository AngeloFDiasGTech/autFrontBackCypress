import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("que eu tenho os dados de um item para o teste E2E do arquivo {string}", function (fixtureName) {
    cy.fixture(fixtureName).as('itemE2E');
});

When("eu crio o item via requisição POST", function () {
    cy.request({
        method: 'POST',
        url: Cypress.config('baseUrl'),
        body: this.itemE2E
    }).as('responseE2E');
});

Then("a resposta da API deve ter o status code {int} e conter a URL do item", function (statusCode) {
    cy.get('@responseE2E').then(response => {
        expect(response.status).to.eq(statusCode);
        expect(response.body.url).to.exist;
        
        // Valida se a URL retornada pela API usa a base do frontend
        const browserUrl = Cypress.env('browserUrl');
        expect(response.body.url).to.contain(browserUrl);
        
        // Armazena o item criado para uso nos próximos steps
        this.createdItem = response.body; 
    });
});

When("eu visitar a URL do item retornada pela API", function () {
    cy.visit(this.createdItem.url);
});

Then("a página deve exibir o nome e a descrição do item criado", function () {
    cy.get('#titulo-item-1').should('contain.text', this.createdItem.name);
    cy.get('.description').should('contain.text', this.createdItem.description);
});

