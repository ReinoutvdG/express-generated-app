Cypress.Commands.add('login', (username = 'test', password = 'test') => {
  cy.visit('http://localhost:3000/login');

  cy.get('#username').type(username);
  cy.get('#password').type(password);

  cy.get('form[action="/login"]').within(() => {
    cy.get('button[type="submit"]').click();
  });

  // Klik op 'Movies' in de navigatie
  cy.contains('a.nav-link', 'Movies').click();

  // Verifieer dat je op de juiste pagina bent
  cy.url().should('include', '/movies');
});
