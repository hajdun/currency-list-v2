/// <reference types="cypress" />

context('Search from input', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('base_url')).wait(2000)
  })

  it('.type() - type into search Mexico (one result)', () => {
    const searchTerm = 'Mexico'
    const numberOfResults = 1

    cy.get('.searchInput').type(searchTerm).should('have.value', searchTerm).wait(3000)

    cy.get('.listItem').should('have.length', numberOfResults)
    cy.get('.listItem').first().should('contain.text', searchTerm)
  })

  it('.type() - type into search Peso (multiple results)', () => {
    const searchTerm = 'Peso'
    const { length } = Cypress.$('.listItem')

    cy.get('.searchInput').type(searchTerm).should('have.value', searchTerm).wait(3000)

    cy.get('.listItem').each(($el) => {
      cy.wrap($el).should('contain.text', searchTerm)
    })
    cy.get('.listItem').should('not.have.length', length)
  })

  it('.clear() - clears search', () => {
    const { length } = Cypress.$('.listItem')
    cy.get('.listItem').should('have.length', length)

    cy.get('.searchInput')
      .type('Clear this text')
      .should('have.value', 'Clear this text')
      .clear()
      .should('have.value', '')
      .wait(3000)

    // list resets to original state on clear
    cy.get('.listItem').should('have.length', length)
  })
})
