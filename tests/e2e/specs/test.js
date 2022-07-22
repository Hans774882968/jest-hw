// https://docs.cypress.io/api/table-of-contents

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Welcome to Your Vue.js + TypeScript App');
  });
});

describe('Form Test', () => {
  it('can fill the form', () => {
    cy.visit('/');
    cy.get('form');
    cy.get('input[name="name"]').type('hans7').should('have.value', 'hanshans7');
    cy.get('input[name="email"]').type('hans@dev.dev').should('have.value', 'hans@dev.dev');
    cy.get('form').submit();
  });
});
