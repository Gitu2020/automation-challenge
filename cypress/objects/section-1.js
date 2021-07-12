const Section1 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    TABLE_BUTTON_TEXT: 'Show table',
    DATE_OF_BIRTH_TEXT: 'D.O.B',
    DOB_FORMAT: 'DD-MM-YYYY',
    SHOW_FORM_LABEL: 'Show Form',
    FULL_NAME: 'test',
    AGE: '25',
    GENDER: 'Female',
    PROFESSION: 'nurse',
    ALERT_WINDOW_TEXT: 'Form submitted!',
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    tableButtonElement: '[data-test= table-toggle-button]',
    tableElement: '[data-test = user-table]',
    tableHeaderElement: '[data-test = table-header]',
    signUpForm: '[data-test = signup-form]',
    signupFormButton: '[data-test= form-toggle-button]',
    formFullNameElement: '[data-test = full-name-input]',
    formAgeElement: '[data-test = age-input]',
    genderElement: '[data-test = gender-select]',
    professionElement: '[data-test = nurse-input]',
    submitFormElement: '[data-test = submit-btn]',

  },

  /**
   * An action should be pretty self explanatory! It consists of all the method performing
   * a particular action from clicking a simple button to doing complex assertions.
   */
  actions: {
    /**
     * Example of action.
     * In this example, we are grabbing a sample element, clicking on it and asserting the api answer.
     *
     * This is only used as an example and can be safely deleted.
     */

    verifyTableInteractions () {
      cy.get(tableButtonElement).should('not.be.visible').contains(TABLE_BUTTON_TEXT).click()
    .then(() => {
      cy.get(tableElement).should('be.visible')
    })
    },

    verifyTableSize () {
      let tableCol = 5
      let tableRow = 11

      cy.get(tableHeaderElement).find('th').then((th) => {
        th.length.should('have.length', tableCol)
      })

      cy.get(tableElement).find('tr').then((tr) => {
        th.length.eq(tableRow - 1)
      })
    },

    verifyUserRole () {
      let count = 5

      cy.get(tableElement).find('tr').each(($el) => {
        cy.wrap($el)
      .invoke('text')
      .then((text) => {
        if ($el === 'user') {
          values.push(text.trim())
        }
      })
      })
     .then(() => expect(values).should('be.gte', count))
    },

  },

  verifyAge () {
    let count

    cy.get(tableElement).find('th').then(($rows) => {
      $rows.each((index, value) => {
        const date = Cypress.$(value).find(DATE_OF_BIRTH_TEXT).text()
        const todaysDate = new Date()

        if (todaysDate.subtract(60, 'days').format(DOB_FORMAT) >= date) {
          count = count + 1
        }
      })
    })
    .then(() => expect(count).to.eq(3))
  },

  validateSignUpForm () {
    cy.get(signUpForm).should('not.be.visible')
    cy.get(signupFormButton).click().then(() => {
      cy.contains(SHOW_FORM_LABEL).should('be.visible')
    })
  },

  validateFormFields () {
    cy.get(formFullNameElement).should('be.visible').type(FULL_NAME).should('have. value', FULL_NAME)
    cy.get(formAgeElement).should('be.visible').type(AGE).should('have.value', AGE)
  },

  selectDropDownOption () {
    cy.get(genderElement).select(GENDER).should('have.value', GENDER)
  },

  checkProfession () {
    cy.get(professionElement).check(PROFESSION).should('have.value', PROFESSION)
  },

  submirForm () {
    cy.get(submitFormElement).click().then(() => {
      cy.on('window:alert', (str) => {
        expect(str).to.equal(ALERT_WINDOW_TEXT)
      })
    })
  },

}

module.exports = { Section1 }
