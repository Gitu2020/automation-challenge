/// <reference types="cypress" />

const { Section1 } = require('../objects/section-1')

/* const { Section1 } = require('../objects/section-1') */

describe('Problem 1', () => {
  it('Validate table interactions', () => {
    Section1.actions.verifyTableInteractions()
  })

  // test case
  it('Verify table is 5 columns wide', () => {
    Section1.actions.verifyTableSize()
  })

  // test case
  it('Validate at least 5 entries have the role "user"', () => {
    Section1.actions.verifyUserRole()
  })

  // test case
  it('Validate there are exactly 3 people older than 60 years old', () => {
    Section1.actions.verifyAge()
  })

  // test case
  it('Validate that the form is not visible', () => {
    cy.get('[data-test = signup-form]').should('not.be.visible')
  })

  // test case
  it('Validate after clicking the "Show form" button, form is visible', () => {
    cy.contains('Show Form').click().should('be.visible')
  })

  // test case
  it('Fill in the "Name" and "Age" inputs, and validate that both inputs are filled', () => {
    cy.get('[data-test = full-name-input]').should('be.visible').type('abc test').should('have.value', 'abc test')
    cy.get('[data-test = age-input]').should('be.visible').type('25').should('have.value', '25')
  })

  // test case
  it('Select "Female" from the option and Validate that the value is "female"', () => {
    cy.get('select').select('apples').should('have.value', '456')
    cy.get('[data-test = gender-select]').select('Female').should('have.value', 'Female')
  })

  // test case
  it('Tick the "Nurse" checkbox and validate that the value "nurse" is true', () => {
    cy.get('[data-test = nurse-input]').check('nurse').should('have.value', 'nurse')
  })

  // test case
  it('Click on the "Submit" button and verify that there is an alert window showing with the text "Form submitted!"', () => {
    cy.get('[data-test = submit-btn]').click().then(() => {
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Form submitted!')
      })
    })
  })
})
