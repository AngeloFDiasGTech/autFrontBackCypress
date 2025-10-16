// FACADE*

let response
let accessToken
let UUIDAtual
let urlV3

class ServiceBase {

    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    getAuthorization() {
        cy.autenticacaoAd().then((res) => {
            return accessToken = res.body["access_token"]
        })
    }

    // from_post_request_update_field(requestBody, url, field) {
    //     cy.atualizarCampoJsonComNovoUUID(requestBody + '.json', field).then((updatedFixture) => {
    //         cy.log(`CheckoutId atual: ${updatedFixture.checkoutId}`);
    //         UUIDAtual = updatedFixture.checkoutId;
    //         this.form_request_cy("POST", url, updatedFixture);
    //     })
    // }


    from_post_request_update_field_novo_uuid(requestBody, url, field) {
        cy.atualizarCampoJsonComNovoUUID(requestBody + '.json', field).then((updatedFixture) => {
            cy.log(`CheckoutId atual: ${updatedFixture[field]}`);
            console.log(`CheckoutId atual: ${updatedFixture[field]}`);
            UUIDAtual = updatedFixture[field];
            this.form_request_cy("POST", url, updatedFixture);
        })
    }

    from_post_request_last_checkoutid(requestBody, url) {
        cy.atualizarCampoJsonComDados(requestBody + '.json', 'checkoutId', UUIDAtual).then((updatedFixture) => {
            cy.log(`CheckoutId atual: ${updatedFixture.checkoutId}`);
            this.form_request_cy("POST", url, updatedFixture);
        })
    }

    from_post_request_new_timestamp_reference(requestBody, url) {
          
        cy.atualizarTimestampReference(requestBody + '.json').then((updatedFixture) => {
            cy.log(`Timestamp atual: ${updatedFixture.integration.reference}`);
            this.form_request_cy("POST", url, updatedFixture);
        })
    }

    from_post_request_new_checkout_v3(requestBody, url, formaPagamento, currency, unitPrice, country) {

        cy.atualizarCamposDoJsonV3(requestBody, {
            newCurrency: currency,
            newUnitPrice: unitPrice,
            newCountry: country,
            newPayMethod: formaPagamento
          }).then((updatedFixture) => {
            cy.log(`JSON novo V3: ${updatedFixture.integration.reference}`)
            this.form_request_cy_authBasic("POST", url, updatedFixture);
          });
          
    }

    from_post_request_update_field(requestBody, url, field, data) {
        cy.atualizarCampoJsonComDados(requestBody + '.json', field, data).then((updatedFixture) => {
            this.form_request_cy("POST", url, updatedFixture);
        })
    }

    form_request_cy(method, url, body) {
        cy.form_request_cy(method, url, body).then((res) => {
            return response = res
        })
    }

    form_request_cy_authBasic(method, url, body) {
        cy.form_request_cy_authBasic(method, url, body).then((res) => {
            return response = res
        })
    }

    form_request_cy_fix(method, url, body) {
        cy.fixture(body + '.json').then((requestBody) => {
            cy.form_request_cy(method, url, requestBody).then((res) => {
                return response = res
            })
        });
    }


    form_request(method, url) {
        cy.form_request(method, url, accessToken).then((res) => {
            return response = res
        })
    }

    form_request_cy_noBody(method, url) {
        return cy.form_request_cy_noBody(method, url, accessToken).then((res) => {
            return response = res
        })
    }

    visitBrowserUrlCheckoutAtual() {
        cy.visitBrowserUrlCheckout(UUIDAtual);
    }

    visitBrowserUrlCheckoutV3() {
        cy.log(this.returnResponseUrlV3())
        cy.visit(this.returnResponseUrlV3());
    }

    validateBrowserUrlCheckoutRedirect(requestBody) {

        cy.visitBrowserUrlCheckout(UUIDAtual + "?collected=true").then((fullUrl) => {

            cy.fixture(requestBody + '.json').then((data) => {
                const expectedRedirectUrl = data.transaction.payment.redirect;

                cy.url().should('not.eq', fullUrl).then((currentUrl) => {
                    // Comparar a URL atual com a URL do JSON
                    expect(currentUrl).to.equal(expectedRedirectUrl);
                });
            });
        })
    }

    returnResponse() {
        return response
    }

    returnStatus() {
        return response.status
    }

    returnStatusCheckout() {
        return response.body.status
    }

    returnTransactionID() {
        return response.body.transaction.id
    }

    returnResponseBody() {
        return response.body
    }

    returnUUIDAtual() {
        return UUIDAtual
    }

    returnResponseUrlV3() {
        cy.log(response.body.url)
        return response.body.url
    }

}

export default new ServiceBase()