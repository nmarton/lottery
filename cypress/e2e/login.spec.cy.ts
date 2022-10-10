describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/login');
    cy.contains('LOTTERY');
  })

  it('should errors on empty form', () => {
    cy.visit('/login');
    cy.get('[name="uname"]').clear();
    cy.get('[name="upass"]').clear();
    cy.get('[data-cy="login"]').submit();
    cy.contains('Name is required!');
    cy.contains('Password is required!');
  })

  it('should errors on bad data', () => {
    cy.visit('/login');
    cy.get('[name="uname"]').type('Test User');
    cy.get('[name="upass"]').type('testpass');
    cy.get('[data-cy="login"]').submit();
    cy.contains('Invalid username or password!');
  })

  it('name select set the user', () => {
    cy.visit('/login');
    
    cy.get('[name="uname"]').clear();
    cy.get('[name="name"]').select(1);
    cy.get('[name="uname"]').then((element) => {
      const value = element.val() as String;
      expect(value.length).to.have.greaterThan(1)
    });
  });

  it('navigate to game on success login', () => {
    cy.visit('/login');
    
    cy.get('[name="uname"]').type('t.darell');
    cy.get('[name="upass"]').type('Toran');
    
    cy.get('[data-cy="login"]').submit();
    cy.contains('Logout');
  });
})
