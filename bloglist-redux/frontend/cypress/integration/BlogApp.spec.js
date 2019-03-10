describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi',
      username: 'End-to-End',
      password: 'huippusalainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
    it('front page can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('log in to application')
    })

    it('user can log in', function() {
      cy.get('input:first')
        .type('End-to-End')
      cy.get('input:last')
        .type('huippusalainen')
      cy.contains('kirjaudu')
        .click()
      cy.contains('Testi logged in')
    })

    it('user can log out', function() {
      cy.get('input:first')
      .type('End-to-End')
      cy.get('input:last')
      .type('huippusalainen')
      cy.contains('kirjaudu')
      .click()
      cy.contains('logout')
        .click()
      cy.contains('log in to application')
    })

    describe('when logged in', function() {
      beforeEach(function() {
        cy.get('input:first')
          .type('End-to-End')
        cy.get('input:last')
          .type('huippusalainen')
        cy.contains('kirjaudu')
          .click()
      })

      it('username is shown', function() {
        cy.contains('Testi logged in')
      })

      it('a new blog can be created', function() {
        cy.contains('Create new')
          .click()
        cy.get('#title')
          .type('A blog added by Cypress!')
        cy.get('#author')
          .type('Cypress')
        cy.get('#url')
          .type('cypress.cy')
        cy.get('#createbutton')
          .click()
        cy.contains('A blog added by Cypress!')
      })
    })
  })
