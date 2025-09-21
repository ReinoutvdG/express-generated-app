describe('Edit Movie flow', () => {
  it('should edit the first movie successfully', () => {
    // Inloggen + naar /movies
    cy.login();

    // Stap 1: Pak de eerste filmkaart en klik op de Details knop
    cy.get('.card').first().within(() => {
      cy.contains('Details').click();
    });

    // Stap 2: Klik op de Edit knop op de detailpagina
    cy.contains('a.btn-warning', 'Edit').click();

    // Stap 3: Wijzig het formulier
    cy.get('#title')
      .clear()
      .type('Cypress Edited Movie');

    cy.get('#description')
      .clear()
      .type('Updated description from Cypress');

    cy.get('#release_year')
      .clear()
      .type('2001');

    cy.get('#language_id').select('2'); // Italian

    cy.get('#rental_duration').clear().type('5');
    cy.get('#rental_rate').clear().type('2.99');
    cy.get('#length').clear().type('95');
    cy.get('#replacement_cost').clear().type('14.99');
    cy.get('#rating').select('PG');

    // Special features - deselect/select
    cy.get('#sfTrailers').uncheck({ force: true });
    cy.get('#sfCommentaries').uncheck({ force: true });
    cy.get('#sfDeleted').uncheck({ force: true });
    cy.get('#sfBehind').check({ force: true });

    // Stap 4: Klik op Update knop
    cy.get('button[type="submit"]').contains('Update').click();

    // Stap 5: Controleer dat we op detailpagina zijn met nieuwe titel
    cy.get('h1').should('contain.text', 'Cypress Edited Movie');
    cy.contains('Updated description from Cypress').should('exist');
  });
});
