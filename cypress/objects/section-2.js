const Section2 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    NETWORK_ALERT_MSG: 'Abnormally long network call!',
    FILE_DOWNLOAD_IMAGE: '/assets/img/javascript-logo.png',
    newtabButtonText: 'Click me!'
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    networkCallButton: '[data-test = network-call-button]',
    newtabButton: '[data-test = new-tab-button]',
    fileDownloadButton: 'data-test = file-download-button'
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

      cy.get(Section2.elements.sampleElement).click()
      // ... An api call to "/endpoint" performed on the app.
      cy.wait('@endpoint').should((request) => {
        expect(request.status).to.eq(200)
      })
    },
  },

  assertNetworkApiResponse () {
    cy.get(networkCallButton.click().then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.length(10)
      cy.on('window:alert', (str) => {
        expect(str).to.equal(NETWORK_ALERT_MSG)
      })
    })
    )
  },

  assertNewTabOpen () {
  cy.get(newtabButton.invoke('removeAttr','target').click().then (() =>
      expect(cy.contains(newtabButtonText)).should('not.exist')
 
  ))
}, 

downloadFile () {
  cy.get(fileDownloadButton.should('be.visible').click().then (() => {
    cy.wait(2000)
    expect(cy.contains(fileDownloadButton)).should('not.exist'),
    cy.downloadFile(FILE_DOWNLOAD_IMAGE,'./mydownloads/example.jpg').then ( () => {
      cy.task("getImageText", {fileName: "./mydownloads/example.jpg"}
      .then(text => {
        expect(text).to.contains("")
      }))
    })
  })
  },
} 

module.exports = { Section2 }
