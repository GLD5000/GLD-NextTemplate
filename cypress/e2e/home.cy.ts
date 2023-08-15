describe('template spec', () => {
    it('H1 contains correct text', () => {
        cy.visit('http://localhost:3000/')
        cy.get("[data-testid='hero-heading']").contains(
            'Minimal Starter Template for'
        )
    })
})
