describe('Bloglist app', function() {
    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
        const user = {
            name: 'Testi Käyttäjä',
            username: 'testuser',
            password: 'pwd'
        };
        const another = {
            name: 'toinen käyttäjä',
            username: 'testuser2',
            password: 'pwd2'
        };
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, another);
        cy.visit('');
    });

    it('Login form is shown', function() {
        cy.contains('Login');
    });

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('input:first').type('testuser');
            cy.get('input:last').type('pwd');
            cy.contains('login').click();
            cy.contains('user logged in');
        });

        it('fails with wrong credentials', function() {
            cy.get('input:first').type('testuser');
            cy.get('input:last').type('wrongpwd');
            cy.contains('login').click();
            cy.get('#msg')
                .should('contain', 'invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid');
            cy.get('html').should('not.contain', 'user logged in');
        });
    });

    describe('When logged in', function() {
        beforeEach(function () {
            cy.login({ username: 'testuser', password: 'pwd' });
        });

        it('a blog can be created', function() {
            cy.contains('create new blog').click();
            cy.get('#title-input').type('testTitle');
            cy.get('#author-input').type('testAuthor');
            cy.get('#url-input').type('testUrl');
            cy.contains(/^create$/).click();
            cy.contains('a new blog testTitle by testAuthor added');
            cy.contains('testTitle testAuthor');
        });

        describe('an existing blog', function() {
            beforeEach(function () {
                cy.createBlog({ title: 'testTitle', author: 'testAuthor', url: 'testUrl' });
                cy.visit('');
                cy.contains('view').click();
            });

            it('can be liked', function() {
                cy.get('button').contains('like').click();
                cy.contains('likes: 1');
            });

            it('can be removed', function() {
                cy.get('button').contains('remove').click();
                cy.should('not.contain', 'testTitle');
            });

            it('can only be removed if user created the blog', function() {
                cy.get('button').contains('remove');
                cy.login({ username: 'testuser2', password: 'pwd2' });
                cy.visit('');
                cy.contains('view').click();
                cy.should('not.contain', 'remove');
            });
        });

        describe('blogs are ordered correctly', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'title1', author: 'author1', url: 'url1' });
                cy.createBlog({ title: 'title2', author: 'author2', url: 'url2' });
                cy.visit('');
                cy.contains('title1').find('button').contains('view').click();
                cy.contains('title2').find('button').contains('view').click();
            });

            it.only('the blog with more likes will be displayed first', function() {
                cy.likeBlog('title1');
                cy.wait(200);
                cy.get('.blog').eq(0).should('contain', 'title1');
                cy.get('.blog').eq(1).should('contain', 'title2');
            });
        });
    });
});