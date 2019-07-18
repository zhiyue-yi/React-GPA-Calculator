/// <reference types="Cypress" />

describe('The GPA Calculation', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('should add course correctly', () => {
    cy.get('.cgpa').contains('CGPA 4.44');

    const courseName = 'Test Course';
    const courseInput = cy.get('.course-input')

    courseInput.get('.course-input__name').type(courseName);
    courseInput.get('.course-input__credit-unit').type('3');
    courseInput.get('.course-input__grade').select('B');
    courseInput.get('.course-input__add-button').click();

    cy.get('.cgpa').contains('CGPA 4.39');
    cy.get('.course-list').first().get('.course__name').contains(courseName);
  });
});