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
  it('Validate visibility of form', () => {
    Section1.actions.validateSignUpForm()
  })

  // test case
  it('Fill in the "Name" and "Age" inputs, and validate that both inputs are filled', () => {
    Section1.actions.validateFormFields()
  })

  // test case
  it('Select "Female" from the option and Validate that the value is "female"', () => {
    Section1.actions.selectDropDownOption()
  })

  // test case
  it('Tick the "Nurse" checkbox and validate that the value "nurse" is true', () => {
    Section1.actions.checkProfession()
  })

  // test case
  it('Click on the "Submit" button and verify that there is an alert window showing with the text "Form submitted!"', () => {
    Section1.actions.submitForm()
  })
})
