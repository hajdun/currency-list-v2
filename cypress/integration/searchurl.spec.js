/// <reference types="cypress" />

const baseUrl = "http://localhost:5000";

context("Search from url", () => {
  it("url search Mexico (one result)", () => {
    const searchTerm = "Mexico";
    const numberOfResults = 1;

    cy.visit(`${baseUrl}/${searchTerm}`).wait(3000);

    cy.get(".listItem").should("have.length", numberOfResults);
    cy.get(".listItem").first().should("contain.text", searchTerm);
  });

  it("url search Peso (multiple results)", () => {
    const searchTerm = "Peso";

    cy.visit(`${baseUrl}/${searchTerm}`).wait(3000);

    cy.get(".listItem").each(($el) => {
      cy.wrap($el).should("contain.text", searchTerm);
    });
  });

  it("urls search then input search", () => {
    const searchTerm = "Peso";

    cy.visit(`${baseUrl}/${searchTerm}`).wait(3000);

    const length = Cypress.$(".listItem").length;

    cy.get(".searchInput")
      .type(searchTerm)
      .should("have.value", searchTerm)
      .wait(3000);

    cy.get(".searchInput").clear().should("have.value", "").wait(3000);

    // list resets to original state on clear
    cy.get(".listItem").should("not.have.length", length);
  });
});
