describe('Bloglist app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user = {
            name: 'Testi Käyttäjä',
            username: 'testuser',
            password: 'pwd'
        };
        cy.request('POST', 'http://localhost:3003/api/users/', user);
        cy.visit('http://localhost:3000');
    });

    it('login form is displayed', function() {
        cy.contains('Login');
    });

    it('login works', function() {
        cy.get('input:first').type('testuser');
        cy.get('input:last').type('pwd');
        cy.contains('login').click();
        cy.contains('user logged in');
    });

    it('login fails with wrong password', function() {
        cy.get('input:first').type('testuser');
        cy.get('input:last').type('wrongpwd');
        cy.contains('login').click();

        cy.get('#msg')
            .should('contain', 'invalid username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid');
        cy.get('html').should('not.contain', 'user logged in');
    });

    describe('when logged in', function() {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'testuser', password: 'pwd'
            }).then(response => {
                localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body));
                cy.visit('http://localhost:3000');
            });
        });
        it('a new blog can be created', function() {
            cy.contains('create new blog').click();
            cy.get('#title-input').type('testTitle');
            cy.get('#author-input').type('testAuthor');
            cy.get('#url-input').type('testUrl');
            cy.contains(/^create$/).click();
            cy.contains('a new blog testTitle by testAuthor added');
        });
    });
});