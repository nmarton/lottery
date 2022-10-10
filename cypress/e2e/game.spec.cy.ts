import { tick } from "@angular/core/testing";

describe('Game Test', () => {
  it('anonym user should navigate to login', () => {
    localStorage.removeItem('user');
    cy.visit('/game');
    cy.contains('Login')
  })

  it('game page loaded', () => {
    localStorage.setItem('user', 'Test User');
    cy.visit('/game');
    cy.contains('Logout')
  })

  it('should 24 cell checked when fill random', () => {
    localStorage.setItem('user', 'Test User');
    cy.visit('/game');
    for (let i=0; i < 4; i++) {
      cy.get(`[data-cy="generate"]:eq(${i})`).click();
    }

    cy.get('.cell__cross').should('have.length',24);
  })

  it('should 0 cell checked when clear', () => {
    localStorage.setItem('user', 'Test User');
    cy.visit('/game');
    for (let i=0; i < 4; i++) {
      cy.get(`[data-cy="generate"]:eq(${i})`).click();
    }
    for (let i=0; i < 4; i++) {
      cy.get(`[data-cy="clear"]:eq(${i})`).click();
    }

    cy.get('.cell__cross').should('have.length',0);
  });

  it('should messages appear on play', () => {
    localStorage.setItem('user', 'Test User');
    cy.visit('/game');
    cy.get('.panel:eq(0) .cell:eq(1)').click();
    cy.get('.panel:eq(0) .cell:eq(2)').click();
    cy.get('.panel:eq(0) .cell:eq(3)').click();
    cy.get('.panel:eq(0) .cell:eq(4)').click();
    cy.get('.panel:eq(0) .cell:eq(5)').click();
    cy.get('.panel:eq(0) .cell:eq(6)').click();

    cy.get('.panel:eq(1) .cell:eq(11)').click();

    cy.get('.panel:eq(2) .cell:eq(10)').click();
    cy.get('.panel:eq(2) .cell:eq(15)').click();
    cy.get('.panel:eq(2) .cell:eq(20)').click();
    cy.get('.panel:eq(2) .cell:eq(25)').click();
    cy.get('.panel:eq(2) .cell:eq(30)').click();
    cy.get('.panel:eq(2) .cell:eq(35)').click();
    cy.get('.panel:eq(2) .cell:eq(40)').click();

    cy.get('[data-cy="play"]').click()

    cy.get('.cell__cross').should('have.length', 14);
    cy.contains('Panel 1: 2,3,4,5,6,7');
    cy.contains('Panel 2: Error: 5 marks are missing');
    cy.contains('Panel 3: Error: Please remove 1 mark');
    cy.contains('Panel 4: empty');
  });

  it('lougout should navigate to login page', () => {
    localStorage.setItem('user', 'Test User');
    cy.visit('/game');
    cy.get('[data-cy="logout"]').click();
    cy.contains('Login');
  })
})
