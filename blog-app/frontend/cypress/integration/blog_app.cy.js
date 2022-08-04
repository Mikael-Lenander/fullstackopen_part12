const RED = 'rgb(255, 0, 0)'
const GREEN = 'rgb(0, 128, 0)'

describe('Blog app', function () {
  const mockUser = {
    username: 'miuge',
    name: 'Mikael Lenander',
    password: '123'
  }

  const mockBlog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'Blog url',
    likes: 0
  }

  const mockBlog2 = {
    title: 'React is awesome',
    author: 'react dev',
    url: 'Blog url2',
    likes: 0
  }

  beforeEach(function () {
    cy.request('POST', 'http://server:3003/api/testing/reset')
    cy.createUser(mockUser)
    cy.logoutUser()
    cy.visit('http://app:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(mockUser.username)
      cy.get('#password').type(mockUser.password)
      cy.get('#login-button').click()
      cy.get('.notification')
        .should('contain', 'Login successful')
        .and('have.css', 'color', GREEN)
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type(mockUser.username)
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()
      cy.get('.notification')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', RED)
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.loginUser(mockUser)
    })

    it('A blog can be created', function () {
      cy.get('#blogs').should('not.contain', mockBlog.title)
      cy.get('#toggle-visibility-button').click()
      cy.get('#title').type(mockBlog.title)
      cy.get('#author').type(mockBlog.author)
      cy.get('#url').type(mockBlog.url)
      cy.get('#blog-form').submit()
      cy.get('.notification')
        .should('contain', 'Added blog')
        .and('have.css', 'color', GREEN)
      cy.get('#blogs').contains(mockBlog.title)
    })

    describe('When a blog is created', function () {
      beforeEach(function () {
        cy.createBlog(mockBlog)
      })

      it('the blog can be liked', function () {
        cy.contains('view').click()
        cy.contains(`likes ${mockBlog.likes}`)
        cy.get('button').contains('like').click()
        cy.contains(`likes ${mockBlog.likes + 1}`)
      })

      it('the blog can be deleted', function () {
        cy.contains('view').click()
        cy.contains(mockBlog.title)
        cy.get('button').contains('remove').click()
        cy.get('.notification')
          .should('contain', 'Blog removed')
          .and('have.css', 'color', GREEN)
        cy.should('not.contain', mockBlog.title)
      })
    })

    describe('When many blogs are created', function () {
      beforeEach(function () {
        cy.createBlog(mockBlog)
        cy.createBlog(mockBlog2)
      })

      it('blogs are sorted in descending order', function () {
        cy.likeBlog(mockBlog2.title)
        cy.get('#blogs').find('.blog')
          .then(blogs => {
            expect(blogs[0].innerText).contain(mockBlog2.title)
            expect(blogs[1].innerText).contain(mockBlog.title)

            cy.likeBlog(mockBlog.title)
            cy.likeBlog(mockBlog.title)
            cy.get('#blogs').find('.blog')
              .then(blogs => {
                expect(blogs[0].innerText).contain(mockBlog.title)
                expect(blogs[1].innerText).contain(mockBlog2.title)
              })
          })

      })

    })

  })

})