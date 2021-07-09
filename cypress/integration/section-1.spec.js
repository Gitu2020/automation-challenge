/// <reference types="cypress" />
/* const { Section1 } = require('../objects/section-1') */

describe('Problem 1', () => {
  /**
   * Example:
   * To access assertSampleApiResponse() from Section1, you can do: Section1.actions.assertSampleApiResponse();
   *
   * Test away!
   */
  it('Validate table interactions', () => {
    cy.get('[data-test=table-toggle-button]').should('not.be.visible')
    cy.get('button').contains('Show table').click()
    cy.get('[data-test = user-table]').should('be.visible')
  })

  // test case
  it('Verify table is 5 columns wide', () => {
    let tableCol = 5

    cy.get('[data-test = table-header]').find('th').then((th) => {
      th.length.should('have.length', tableCol)
    })
  })

  // test case
  it('Validate the table is 10 rows long, excluding the first (header) row', () => {
    let tableRow = 11

    cy.get('[data-test= user-table]').find('tr').then((tr) => {
      th.length.eq(tableRow - 1)
    })
  })

  // test case
  it('Validate at least 5 entries have the role "user"', () => {
    let count = 5

    cy.get('data-test= user-table').find('tr').each(($el, $role) => {
      cy.wrap($el)
      .invoke('text')
      .then((text) => {
        if ($role === 'user')
        { values.push(text.trim())
      }
      })
    })
     .then(() => expect(values).should('be.gte', count))
  })

  // test case
  it('Validate there are exactly 3 people older than 60 years old', () => {
    let count 

    cy.get('data-test= user-table').find('th').then(($rows) => {
      $rows.each((index, value) => {
        const date = Cypress.$(value).find('D.O.B').text()
        const todaysDate = new Date()
    
        if (todaysDate.subtract(60, 'days').format('DD-MM-YYYY') >= date) {
         count = count+1
        }
      })
    })
    .then(() => expect(count).to.eq(3)
  })

   // test case
   it('Validate that the form is not visible', () => {
    
})
  