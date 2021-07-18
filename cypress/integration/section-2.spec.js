/// <reference types="cypress" />
const { Section2 } = require('../objects/section-2')

describe('Problem 2', () => {
  /**
   * Example:
   * To access assertSampleApiResponse() from Section2, you can do: Section2.actions.assertSampleApiResponse();
   *
   * Test away!
   */

  it('Click on the button and validate response', () => {
    Section2.actions.assertNetworkApiResponse()
  })

  it('Validate Browser API: Opening a new tab', () => {
    Section2.actions.assertNetworkApiResponse()
  })

  it('Validate Browser API: Downloading a file', () => {
    Section2.actions.downloadFile()
  })
})
