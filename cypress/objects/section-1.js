const Section1 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    TABLE_BUTTON_TEXT: 'Show table',
    DATE_OF_BIRTH_TEXT: 'D.O.B',
    DOB_FORMAT: 'DD-MM-YYYY',
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    tableButtonElement: '[data-test= table-toggle-button]',
    tableElement: '[data-test = user-table]',
    tableHeaderElement: '[data-test = table-header]',

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
    assertSampleApiResponse () {
      cy.server()
      cy.wait('/endpoint').as('endpoint')

      cy.get(Section1.elements.sampleElement).click()
      // ... An api call to "/endpoint" performed on the app.
      cy.wait('@endpoint').should((request) => {
        expect(request.status).to.eq(200)
      })
    },
    verifyTableInteractions () {
      cy.get(Section1.elements.tableButtonElement).should('not.be.visible').contains(Section1.literals.TABLE_BUTTON_TEXT).click()
    .then(() => {
      cy.get(Section1.elements.tableElement).should('be.visible')
    })
    },

    verifyTableSize () {
      let tableCol = 5
      let tableRow = 11

      cy.get(Section1.elements.tableHeaderElement).find('th').then((th) => {
        th.length.should('have.length', tableCol)
      })

      cy.get(Section1.elements.tableElement).find('tr').then((tr) => {
        th.length.eq(tableRow - 1)
      })
    },

    verifyUserRole () {
      let count = 5

      cy.get(Section1.elements.tableElement).find('tr').each(($el) => {
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

    cy.get(Section1.elements.tableElement).find('th').then(($rows) => {
      $rows.each((index, value) => {
        const date = Cypress.$(value).find(Section1.literals.DATE_OF_BIRTH_TEXT).text()
        const todaysDate = new Date()

        if (todaysDate.subtract(60, 'days').format(DOB_FORMAT) >= date) {
          count = count + 1
        }
      })
    })
    .then(() => expect(count).to.eq(3))
  },
}

module.exports = { Section1 }
