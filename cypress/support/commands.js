// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('DataRandomica', () => { 
    const start = new Date(2000, 0, 1)
    const end = new Date(2030, 11, 31)
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    const mm = String(randomDate.getMonth() + 1).padStart(2, '0')
    const dd = String(randomDate.getDate()).padStart(2, '0')
    const yyyy = randomDate.getFullYear()
    return `${mm}-${dd}-${yyyy}`
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('visitBrowserUrl', (data) => {
    cy.log(`Browser URL: ${Cypress.env('browserUrl')}`);
    const fullUrl = `${Cypress.env('browserUrl')}/${data}`;
    cy.log("URL completa:" + fullUrl)

    cy.visit(fullUrl);

    return cy.wrap(fullUrl);;
});

Cypress.Commands.add('atualizarCampoJsonComNovoUUID', (fixtureName, fieldToReplace) => {
    return cy.fixture(fixtureName).then((fixture) => {

        // Criar uma cópia do fixture para evitar referências circulares
        const updatedFixture = JSON.parse(JSON.stringify(fixture));

        const newUUID = uuidv4();
        updatedFixture[fieldToReplace] = newUUID;
        return updatedFixture;
    });
});

Cypress.Commands.add('atualizarCampoJsonComDados', (fixtureName, fieldToReplace, data) => {
    return cy.fixture(fixtureName).then((fixture) => {

        const updatedFixture = JSON.parse(JSON.stringify(fixture));

        if (fieldToReplace.includes('.')) {
            const [objeto, atributo] = fieldToReplace.split('.');
            if (updatedFixture[objeto]) {
                updatedFixture[objeto][atributo] = data;
            } else {
                console.error(`O objeto '${objeto}' não existe dentro dessa request.`);
                cy.log(`O objeto '${objeto}' não existe dentro dessa request.`)
            }
        } else {
            updatedFixture[fieldToReplace] = data;
        }

        return updatedFixture;
    });
});

Cypress.Commands.add('form_request_cy', (method, url, body) => {
    cy.log('url commands = ' + url)
    cy.request({
        method: method,
        url: url,
        body: body,
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json"
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('form_request_cy_authBasic', (method, url, body) => {
    cy.log('url commands = ' + url)
    cy.request({
        method: method,
        url: url,
        body: body,
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json",
            "authorization": "Basic MTA6MTIz"
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('form_request', (method, url, accessToken) => {
    cy.log('url commands = ' + url)
    cy.request({
        method: method,
        url: url,
        headers: {
            "accept": "*/*",
            "Authorization": "Bearer " + accessToken
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('form_request_cy_noBody', (method, url, accessToken) => {
    cy.log('url commands = ' + url)
    cy.request({
        method: method,
        url: url,
        headers: {
            "accept": "*/*",
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        },
        failOnStatusCode: false
    })
})



/**
 * Costum command to validate a schema
 * @example cy.schemaValidation(schemaName)
 */
Cypress.Commands.add('schemaValidation', (schema, body) => {
    let schema_directory = "../fixtures"
    let schema_path = schema_directory + "/" + schema

    expect(body.to.equal == JSON.stringify(schema_path))
})