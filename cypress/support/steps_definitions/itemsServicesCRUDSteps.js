import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// -------------------------------------------------------------------------
// --- STEPS DE CONTEXTO E PREPARAÇÃO (Given) ---
// -------------------------------------------------------------------------

/**
 * Carrega uma fixture e armazena seu conteúdo em `this.requestBody` para ser usado na próxima requisição.
 * @param {string} fixtureName - O nome do arquivo JSON dentro da pasta cypress/fixtures.
 */
Given("que eu tenho os dados de um item do arquivo {string}", function (fixtureName) {
    cy.fixture(fixtureName).then((itemData) => {
        this.requestBody = itemData; // Armazena os dados da fixture para a requisição
    });
});

/**
 * Um step de setup crucial: cria um item via API antes do cenário começar.
 * Armazena o ID do item criado em `this.createdItemId` para ser usado nos steps seguintes.
 * @param {string} fixtureName - A fixture para criar o item base.
 * @param {string} prop - A propriedade a ser extraída da resposta (geralmente "id").
 */
Given("que eu crio um item com os dados do arquivo {string} e armazeno o seu {string}", function (fixtureName, prop) {
    cy.fixture(fixtureName).then((itemData) => {
        cy.request({
            method: 'POST',
            url: Cypress.config('baseUrl'),
            body: itemData
        }).then((response) => {
            expect(response.status).to.eq(201);
            this.createdItemId = response.body[prop]; // Armazena o ID para uso nos steps seguintes
        });
    });
});

/**
 * Carrega os dados de uma fixture para uma requisição de atualização (PUT).
 * @param {string} fixtureName - O nome do arquivo JSON com os dados de edição.
 */
Given("que eu tenho os dados de atualização do item do arquivo {string}", function (fixtureName) {
    cy.fixture(fixtureName).then((itemData) => {
        this.requestBody = itemData; // Armazena os dados da fixture para a requisição de PUT
    });
});

// -------------------------------------------------------------------------
// --- STEPS DE AÇÃO (When) ---
// -------------------------------------------------------------------------

/**
 * Executa uma requisição POST para o endpoint base com os dados armazenados em `this.requestBody`.
 */
When("eu fizer uma requisição POST para o endpoint base de itens com estes dados", function () {
    cy.request({
        method: 'POST',
        url: Cypress.config('baseUrl'),
        body: this.requestBody,
        failOnStatusCode: false // Permite testar status codes de erro (4xx, 5xx)
    }).as('response');
});

/**
 * Executa uma requisição GET para um item específico, decidindo se usa um ID válido (armazenado) ou um inválido.
 * @param {string} tipoId - Deve ser "armazenado" ou "invalido".
 */
When("eu fizer uma requisição GET para o endpoint do item usando o id {string}", function (tipoId) {
    const id = (tipoId === "armazenado") ? this.createdItemId : "99999"; // Usa o ID real ou um inválido
    cy.request({
        method: 'GET',
        url: `${Cypress.config('baseUrl')}/${id}`,
        failOnStatusCode: false
    }).as('response');
});

/**
 * Executa uma requisição PUT para o item criado, usando os dados armazenados em `this.requestBody`.
 */
When("eu fizer uma requisição PUT para o endpoint do item que criei com os dados de atualização", function () {
    cy.request({
        method: 'PUT',
        url: `${Cypress.config('baseUrl')}/${this.createdItemId}`,
        body: this.requestBody,
        failOnStatusCode: false
    }).as('response');
});

/**
 * Executa uma requisição DELETE para um item específico, decidindo se usa um ID válido ou inválido.
 * @param {string} tipoId - Deve ser "armazenado" ou "invalido".
 */
When("eu fizer uma requisição DELETE para o endpoint do item usando o id {string}", function (tipoId) {
    const id = (tipoId === "armazenado") ? this.createdItemId : "99999";
    cy.request({
        method: 'DELETE',
        url: `${Cypress.config('baseUrl')}/${id}`,
        failOnStatusCode: false
    }).as('response');
});

// --- STEP DE MODIFICAÇÃO DINÂMICA (para o cenário de update) ---

/**
 * Modifica uma propriedade do objeto `this.requestBody` em tempo de execução.
 * Útil para criar dados dinâmicos, como adicionar um timestamp.
 * @param {string} propriedade - A chave do objeto a ser modificada (ex: "name").
 */
And("eu modifico o {string} do item para incluir um timestamp", function (propriedade) {
    const timestamp = Date.now();
    const valorOriginal = this.requestBody[propriedade];
    this.modifiedValue = `${valorOriginal} ${timestamp}`;
    this.requestBody[propriedade] = this.modifiedValue;
});

// -------------------------------------------------------------------------
// --- STEPS DE VALIDAÇÃO (Then) ---
// -------------------------------------------------------------------------

/**
 * Valida o status code da última requisição salva com o alias 'response'.
 * @param {number} statusCode - O código de status esperado.
 */
Then("a resposta deve ter o status code {int}", function (statusCode) {
    cy.get('@response').its('status').should('eq', statusCode);
});

/**
 * Valida o corpo da resposta de uma criação bem-sucedida (status 201).
 */
Then("se a criação for bem-sucedida, o corpo da resposta deve conter os dados do item criado", function () {
    cy.get('@response').then((response) => {
        if (response.status === 201) {
            expect(response.body.name).to.eq(this.requestBody.name);
            expect(response.body.description).to.eq(this.requestBody.description);
            expect(response.body).to.have.property('id');
        }
    });
});

/**
 * Armazena uma propriedade da resposta (geralmente o 'id') no contexto do cenário.
 * @param {string} propriedade - A chave a ser extraída do corpo da resposta.
 */
Then("eu armazeno o {string} do item criado", function (propriedade) {
    cy.get('@response').then((response) => {
        this.createdItemId = response.body[propriedade];
    });
});

/**
 * Valida que o corpo da resposta de uma requisição GET/PUT corresponde aos dados do item criado.
 */
Then("o corpo da resposta deve conter os dados do item que criei", function () {
    cy.get('@response').its('body.name').should('eq', this.requestBody.name);
    cy.get('@response').its('body.description').should('eq', this.requestBody.description);
});


/**
 * Valida que o corpo da resposta de uma requisição GET/PUT corresponde aos dados de atualização.
 */
Then("o corpo da resposta deve conter os dados do item atualizado", function () {
    cy.get('@response').its('body.name').should('eq', this.requestBody.name);
    cy.get('@response').its('body.description').should('eq', this.requestBody.description);
});


/**
 * Valida que o nome do item na resposta é igual ao nome que foi modificado dinamicamente.
 * @param {string} propriedade - A chave a ser validada (ex: "name").
 */
Then("o {string} no corpo da resposta deve ser igual ao nome que eu modifiquei", function (propriedade) {
    cy.get('@response').its(`body.${propriedade}`).should('eq', this.modifiedValue);
});

