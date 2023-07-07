Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username, password
    }).then(response => {
        localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body));
        cy.visit('');
    });
});

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
        url: `${Cypress.env('BACKEND')}/blogs`,
        method: 'POST',
        body: { title, author, url },
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
        }
    });
});

Cypress.Commands.add('likeBlog', ( title ) => {
    cy.get('.blog').contains(title).as('blog');
    cy.get('@blog').find('button').contains('like').click();
});