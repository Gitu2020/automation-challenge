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
      cy.visit('http://localhost:8080', { responseTimeout: 31000 })
      cy.get(this.tableButtonElement).should('not.be.visible')
      cy.contains(this.TABLE_BUTTON_TEXT).then(($btn) => {
        if ($btn.click()) {
          cy.get(this.tableElement).should('be.visible')
        }
      })
    },

    verifyTableSize () {
      let tableCol = 5
      let tableRow = 11

      cy.get(this.tableHeaderElement).find('th').then((th) => {
        th.length.should('have.length', tableCol)
      })

      cy.get(this.tableElement).find('tr').then((tr) => {
        th.length.eq(tableRow - 1)
      })
    },

    verifyUserRole () {
      let count = 5

      cy.get(this.tableElement).find('tr').each(($el) => {
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

    cy.get(this.tableElement).find('th').then(($rows) => {
      $rows.each((index, value) => {
        const date = Cypress.$(value).find(this.DATE_OF_BIRTH_TEXT).text()
        const todaysDate = new Date()

        if (todaysDate.subtract(60, 'days').format(this.DOB_FORMAT) >= date) {
          count = count + 1
        }
      })
    })
    .then(() => expect(count).to.eq(3))
  },

  validateSignUpForm () {
    cy.get(this.signUpForm).should('not.be.visible')
    cy.get(this.signupFormButton).click().then(() => {
      cy.contains(this.SHOW_FORM_LABEL).should('be.visible')
    })
  },

  validateFormFields () {
    cy.get(this.formFullNameElement).should('be.visible').type(this.FULL_NAME).should('have. value', this.FULL_NAME)
    cy.get(this.formAgeElement).should('be.visible').type(this.AGE).should('have.value', this.AGE)
  },

  selectDropDownOption () {
    cy.get(this.genderElement).select(this.GENDER).should('have.value', this.GENDER)
  },

  checkProfession () {
    cy.get(this.professionElement).check(this.PROFESSION).should('have.value', this.PROFESSION)
  },

  submitForm () {
    cy.get(this.submitFormElement).click().then(() => {
      cy.on('window:alert', (str) => {
        expect(str).to.equal(ALERT_WINDOW_TEXT)
      })
    })
  },

}

module.exports = { Section1 }
