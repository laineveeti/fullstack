describe('template spec', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it('login form is displayed', function() {
    cy.contains('Login');
  });

  it('login works', function() {
    cy.get('input:first').type('user1');
    cy.get('input:last').type('pwd');
    cy.contains('login').click();
  })
});