/// <reference types="cypress" />
const { Section2 } = require('../objects/section-2')

describe('Problem 2', () => {
  /**
   * Example:
   * To access assertSampleApiResponse() from Section2, you can do: Section2.actions.assertSampleApiResponse();
   *
   * Test away!
   */
  it('Validate API response', () => {
      cy.get(Section2.actions.assertSampleApiResponse().then((response) => {

        expect(response.body).to.have.length(10)
      });
  })
})
