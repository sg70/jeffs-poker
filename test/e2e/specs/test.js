// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.start')
      .assert.containsText('h1', 'Welcome to Planning Poker')
      .assert.elementCount('button', 1)
      .assert.elementCount('input[type=text]', 1)
      .setValue('input[type=text]', 'e2e')
      .click('button')
      .waitForElementVisible('div[class=invite]')
      .assert.containsText('h1', 'Invite players')
      .assert.elementCount('button', 1)
      .click('button')
      .waitForElementVisible('div[class=estimation]')
      .assert.containsText('h1', 'Estimation')
      .click('.cards li')
      .end()
  }
}
