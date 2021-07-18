const Section2 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    NETWORK_ALERT_MSG: 'Abnormally long network call!',
    FILE_DOWNLOAD_IMAGE: 'http://localhost:8080/assets/img/javascript-logo.png',
    newtabButtonText: 'Click me!',
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    networkCallButton: '[data-test = network-call-button]',
    newtabButton: '[data-test = new-tab-button]',
    fileDownloadButton: '[data-test = file-download-button]',
  },

  /**
   * An action should be pretty self explanatory! It consists of all the method performing
   * a particular action from clicking a simple button to doing complex assertions.
   */
  actions: {

    assertNetworkApiResponse () {
      cy.visit('http://localhost:8080', { responseTimeout: 31000 })
      cy.get('a').eq(3).click()
      cy.get(Section2.elements.networkCallButton).click()
      cy.request({
        url: 'http://localhost:8889/todos/1',
        failOnNetworkError: false, // default: true
      })
      .then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).has.property('id', 1)
        expect(res.body).has.property('title', 'Abnormally long network call!')
        cy.on('window:alert', (str) => {
          expect(str).to.equal(this.NETWORK_ALERT_MSG)
        })
      })
    },

    assertNewTabOpen () {
      cy.get(Section2.elements.newtabButton).invoke('removeAttr', 'target').click().then(() => {
        expect(cy.contains(Section2.elements.newtabButtonText)).should('not.exist')
      })
    },

    downloadFile () {
      cy.get(Section2.elements.fileDownloadButton).should('be.visible').click().then(() => {
        cy.wait(2000)
        // expect(cy.get(Section2.elements.fileDownloadButton).should('not.exist'))
        cy.downloadFile(Section2.literals.FILE_DOWNLOAD_IMAGE, 'mydownloads', 'example.jpg').then(() => {
          cy.readFile('./mydownloads/example.jpg').should('exist')
        })
      })
    },
  },
}

module.exports = { Section2 }
