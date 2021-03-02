/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000").wait(2000);
  });

  // https://on.cypress.io/interacting-with-elements

  /**
    it('.scrollIntoView() - scroll an element into view', () => {
      // https://on.cypress.io/scrollintoview
  
      // normally all of these buttons are hidden,
      // because they're not within
      // the viewable area of their parent
      // (we need to scroll to see them)
      cy.get('#scroll-horizontal button')
        .should('not.be.visible')
  
      // scroll the button into view, as if the user had scrolled
      cy.get('#scroll-horizontal button').scrollIntoView()
        .should('be.visible')
  
      cy.get('#scroll-vertical button')
        .should('not.be.visible')
  
      // Cypress handles the scroll direction needed
      cy.get('#scroll-vertical button').scrollIntoView()
        .should('be.visible')
  
      cy.get('#scroll-both button')
        .should('not.be.visible')
  
      // Cypress knows to scroll to the right and down
      cy.get('#scroll-both button').scrollIntoView()
        .should('be.visible')
    })
  
    it('cy.scrollTo() - scroll the window or element to a position', () => {
      // https://on.cypress.io/scrollto
  
      // You can scroll to 9 specific positions of an element:
      //  -----------------------------------
      // | topLeft        top       topRight |
      // |                                   |
      // |                                   |
      // |                                   |
      // | left          center        right |
      // |                                   |
      // |                                   |
      // |                                   |
      // | bottomLeft   bottom   bottomRight |
      //  -----------------------------------
  
      // if you chain .scrollTo() off of cy, we will
      // scroll the entire window
      cy.scrollTo('bottom')
  
      cy.get('#scrollable-horizontal').scrollTo('right')
  
      // or you can scroll to a specific coordinate:
      // (x axis, y axis) in pixels
      cy.get('#scrollable-vertical').scrollTo(250, 250)
  
      // or you can scroll to a specific percentage
      // of the (width, height) of the element
      cy.get('#scrollable-both').scrollTo('75%', '25%')
  
      // control the easing of the scroll (default is 'swing')
      cy.get('#scrollable-vertical').scrollTo('center', { easing: 'linear' })
  
      // control the duration of the scroll (in ms)
      cy.get('#scrollable-both').scrollTo('center', { duration: 2000 })
    }) */
});
