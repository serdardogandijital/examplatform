describe('Authentication Flow', () => {
  it('should visit home page', () => {
    cy.visit('/');
    cy.contains('Professional Online Language Testing').should('be.visible');
  });

  it('should navigate to register page', () => {
    cy.visit('/');
    cy.contains('Get Started').click();
    cy.url().should('include', '/register');
  });

  it('should navigate to login page', () => {
    cy.visit('/');
    cy.contains('Browse Exams').click();
    cy.url().should('include', '/exams');
  });
});

