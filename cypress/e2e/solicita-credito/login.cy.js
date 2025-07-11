/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Validação dos campos obrigatórios', () => {
    cy.get('#nome').type('João da Silva')
    cy.get('#email').type('a@a.com')
    cy.get('#renda').type('1000')
    cy.get('#cpf').type('123.456.789-01')
    cy.get('#credito').type('5000')
    cy.get('[type="submit"]').click()
    cy.get('#result').should('exist').should('be.visible')
  })

  context('Login válido', () => {


    // it.skip('can filter for uncompleted tasks', () => {
      
    // })
  })
})
