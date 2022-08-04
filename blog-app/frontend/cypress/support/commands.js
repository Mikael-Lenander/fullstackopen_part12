// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const URL = 'http://server:3003'

Cypress.Commands.add('createUser', ({ username, name, password }) => {
  cy.request('POST', `${URL}/api/users`, {
    username, password, name
  })
})

Cypress.Commands.add('logoutUser', () => {
  localStorage.setItem('user', null)
})

Cypress.Commands.add('loginUser', ({ username, password }) => {
  cy.request('POST', `${URL}/api/login`, ({ username, password }))
    .then(res => {
      console.log('res.body', res.body)
      localStorage.setItem('user', JSON.stringify(res.body))
      cy.visit(URL)
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  console.log('url', `${URL}/api/blogs`)
  cy.request({
    method: 'POST',
    url: `${URL}/api/blogs`,
    body: { title, author, url },
    headers: { Authorization: `bearer ${JSON.parse(localStorage.getItem('user')).token}` }
  })
  cy.visit(URL)
})

Cypress.Commands.add('likeBlog', ( title ) => {
  cy.contains(title).parent().find('button').contains('view').click()
  cy.get('button').contains('like').click()
  cy.visit(URL)
})