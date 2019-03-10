describe('Blog ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
    it('front page can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('log in to application')
    })

    it('user can log in', function() {
      cy.get('input:first')
        .type('testi')
      cy.get('input:last')
        .type('salasana123')
      cy.contains('kirjaudu')
        .click()
      cy.contains('Testeri logged in')
    })

    it('user can log out', function() {
      cy.get('input:first')
      .type('testi')
      cy.get('input:last')
      .type('salasana123')
      cy.contains('kirjaudu')
      .click()
      cy.contains('logout')
        .click()
      cy.contains('log in to application')
    })
  })
