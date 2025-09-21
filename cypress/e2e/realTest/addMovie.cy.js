

describe('Add Movie flow', () => {

    //login voor elke test
  beforeEach(() => {
    cy.login();
  });

  it('should create a new movie successfully', () => {
    cy.visit('http://localhost:3000/movies');

    // Klik op de "New Movie" knop
    cy.contains('a.btn-success', 'New Movie').click();

    // Verifieer dat we op de juiste URL zitten
    cy.url().should('include', '/movies/create');

    // Vul het formulier in
    cy.get('#title').type('Cypress Test Movie');
    cy.get('#description').type('Een film toegevoegd via Cypress');
    cy.get('#release_year').type('2025');
    cy.get('#language_id').select('English'); // selecteer o.b.v. zichtbare tekst
    cy.get('#rental_duration').clear().type('7');
    cy.get('#rental_rate').clear().type('3.99');
    cy.get('#length').type('120');
    cy.get('#replacement_cost').clear().type('24.99');
    cy.get('#rating').select('PG-13');

    // Vink enkele special features aan
    cy.get('#sfTrailers').check();
    cy.get('#sfBehind').check();

    // Klik op Create knop
    cy.get('button[type="submit"]').contains('Create').click();

    // Controleer of we terug op de /movies pagina zijn
    cy.url().should('include', '/movies');

    // Controleer of de toegevoegde film zichtbaar is
    cy.contains('Cypress Test Movie').should('be.visible');  });
});
