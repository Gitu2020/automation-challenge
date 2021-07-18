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
    GENDER_VALUE: 'female',
    PROFESSION: 'nurse',
    ALERT_WINDOW_TEXT: 'Form submitted!',
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    tableButtonElement: '[data-test= table-toggle-button]',
    tableElement: '[data-test="user-table"]',
    tableHeaderElement: '[data-test = "table-header"]',
    signUpForm: '[data-test = signup-form]',
    signupFormButton: '[data-test= form-toggle-button]',
    signUpFormId: '#alaya-form',
    formFullNameElement: '[data-test = full-name-input]',
    formFullName: 'input[name="fullName"]',
    formAgeElement: '[data-test = age-input]',
    formAge: 'input[name="age"]',
    genderElement: '[data-test = gender-select]',
    professionElement: '[data-test = nurse-input]',
    professionCheckBox: '[type="checkbox"]',
    submitFormElement: '[data-test = submit-btn]',
    href: '/section-1',

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
      cy.get('a').eq(2).click()
      cy.get('a[href= "/section-1"]').click().then(() => {
        cy.get(Section1.elements.tableElement).should('not.be.visible')
      })

      cy.contains(Section1.literals.TABLE_BUTTON_TEXT).then(($btn) => {
        if ($btn.click()) {
          cy.get(Section1.elements.tableButtonElement).should('be.visible').click()
        }
      })
    },

    verifyTableSize () {
      let tableCol = 5
      let tableRow = 10

      cy.get(Section1.elements.tableHeaderElement).find('th').should('have.length', tableCol)

      cy.get(Section1.elements.tableElement).find('tr').should('have.length', tableRow + 1)
    },

    verifyUserRole () {
      const count = 5

      cy.get(Section1.elements.tableElement).get('tr').each(($elem) => {
        if ($elem.text === 'user') {
          $elem = $elem + 1
          expect($elem).to.be.gte(count)
        }
      })
    },

    verifyAge () {
      cy.get('th:nth-child(4)').each(($e1, index, $list) => {
        const today = new Date()
        let count = 0

        if ($e1.text === 'D.O.B') {
          cy.get('th:nth-child(4)').next()
            .eq(index)
            .then(function (Field) {
              const Fieldtext = Field.text()
              const dateString = Cypress.moment(Fieldtext, 'MM/DD/YYYY')
              const year = Cypress.moment(dateString, 'MM/DD/YYYY').format('YYYY')
              let ageDifMs = today.getFullYear - year

              if (ageDifMs > 60) {
                count = count + 1
              }

              expect(count = 3)
            })
        }
      })
    },

    validateSignUpForm () {
      cy.get(Section1.elements.signUpForm).should('not.be.visible')
      cy.get(Section1.elements.signupFormButton).click().then(() => {
        cy.contains(Section1.literals.SHOW_FORM_LABEL).should('be.visible')
      })
    },

    validateFormFields () {
      cy.get(Section1.elements.signUpFormId).within(() => {
        cy.get(Section1.elements.formFullName).should('be.visible').type(Section1.literals.FULL_NAME).should('have.value', Section1.literals.FULL_NAME)
        cy.get(Section1.elements.formAge).should('be.visible').type(Section1.literals.AGE).should('have.value', Section1.literals.AGE)

        cy.get(Section1.elements.genderElement).select(Section1.literals.GENDER).should('have.value', Section1.literals.GENDER_VALUE)
        cy.get(Section1.elements.professionCheckBox).check().should('be.checked')
      })
    },

    submitForm () {
      cy.get(Section1.elements.submitFormElement).click().then(() => {
        cy.on('window:alert', (str) => {
          expect(str).to.equal(Section1.literals.ALERT_WINDOW_TEXT)
        })
      })
    },
  },
}

module.exports = { Section1 }
