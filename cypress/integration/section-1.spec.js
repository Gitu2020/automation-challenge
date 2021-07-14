/// <reference types="cypress" />

const { Section1 } = require('../objects/section-1')

/* const { Section1 } = require('../objects/section-1') */

describe('Problem 1', () => {
  it('Validate table interactions', () => {
    cy.invoke(Section1.verifyTableInteractions())
  })

  // test case
  it('Verify table is 5 columns wide', () => {
    cy.invoke(Section1.verifyTableSize())
  })

  // test case
  it('Validate at least 5 entries have the role "user"', () => {
    cy.invoke(Section1.verifyUserRole())
  })

  // test case
  it('Validate there are exactly 3 people older than 60 years old', () => {
    cy.invoke(Section1.verifyAge())
  })

  // test case
  it('Validate visibility of form', () => {
    cy.invoke(Section1.validateSignUpForm())
  })

  // test case
  it('Fill in the "Name" and "Age" inputs, and validate that both inputs are filled', () => {
    cy.invoke(Section1.validateFormFields())
  })

  // test case
  it('Select "Female" from the option and Validate that the value is "female"', () => {
    cy.invoke(Section1.selectDropDownOption())
  })

  // test case
  it('Tick the "Nurse" checkbox and validate that the value "nurse" is true', () => {
    cy.invoke(Section1.checkProfession())
  })

  // test case
  it('Click on the "Submit" button and verify that there is an alert window showing with the text "Form submitted!"', () => {
    cy.invoke(Section1.submitForm())
  })
})
