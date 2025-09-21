// cypress/e2e/login.spec.js
describe('Login flow', () => {
  it('should show login page and log in successfully', () => {
    cy.visit('http://localhost:3000/login');      // ga naar loginpagina

    // vul formulier in
    cy.get('#username').type('test');
    cy.get('#password').type('test');

    // klik op login
    cy.get('form[action="/login"]').within(() => {
      cy.get('button[type="submit"]').click();
    });

    // controleer dat de logout knop zichtbaar is
    cy.contains('Logout').should('be.visible');
  });
});
