describe('Delete Movie flow', () => {
  it('should delete the first movie successfully', () => {
    // Log in + ga naar overzicht
    cy.login();

    // Klik op Details van eerste kaart
    cy.get('.card').first().within(() => {
      cy.contains('Details').click();
    });

    // Titel onthouden om later te controleren
    cy.get('h1').invoke('text').as('movieTitle');

    // Klik op de Delete knop (form button)
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').contains('Delete').click();
    });

    // Bevestig dat we terug op de overzichtspagina zijn
    cy.url().should('include', '/movies');

    // (Optioneel) Controleer dat de titel niet meer in de lijst staat
    cy.get('@movieTitle').then((deletedTitle) => {
      cy.contains('.card-title', deletedTitle.trim()).should('not.exist');
    });
  });
});
