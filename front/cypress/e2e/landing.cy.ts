describe("should see landing page", () => {
    beforeEach(() => {
        cy.visit("");
    });
    it("should nagivate to signup Teacher Page", () => {
        cy.get('[data-cy="heading-teacher-signup"]')
            .should("exist")
            .click()
            .url()
            .should("eq", "http://localhost:5173/signup_teacher");
        cy.contains("CREER MON COMPTE");
        cy.get('input[role="lastname"]').type("string");
        cy.get('input[role="firstname"]').type("string");
        cy.get('input[role="email"]').type("string@string.string");
        cy.get('input[name="password"]').type("Azerty123?#");
        cy.get('input[name="school_name"]').type("string");
        cy.get('input[name="school_cp"]').type("12345");
        cy.get('input[name="school_address"]').type("string");
        cy.get('[data-cy="alert-falsy-term"]').should("not.exist");
        cy.get('[data-cy="submit"]').click();
        cy.get('[data-cy="alert-falsy-term"]')
            .should("exist")
            .should("be.visible");
        cy.get('input[name="terms"]').click();
        cy.get('[data-cy="alert-falsy-term"]').should("not.be.visible");
        cy.contains("Me connecter");
        cy.get('[data-cy="heading-signin"]')
            .should("exist")
            .click()
            .url()
            .should("eq", "http://localhost:5173/signin");
        cy.contains("CONNEXION");
    });

    it("should nagivate to signin Page", () => {
        cy.get('[data-cy="heading-signin"]')
            .should("exist")
            .click()
            .url()
            .should("eq", "http://localhost:5173/signin");
        cy.contains("CONNEXION");
    });

    it("should nagivate to signup Parent Page", () => {
        cy.get('[data-cy="heading-parent-signup"]')
            .should("exist")
            .click()
            .url()
            .should("eq", "http://localhost:5173/signup_parent");
        cy.contains("CREER MON COMPTE");
        cy.get('input[role="lastname"]').type("string");
        cy.get('input[role="firstname"]').type("string");
        cy.get('input[name="password"]').type("Azerty123?#");
        cy.get('input[role="email"]').type("string@string.string");
        cy.get('[data-cy="alert-falsy-term"]').should("not.exist");
        cy.get('[data-cy="submit"]').click();
        cy.get('[data-cy="alert-falsy-term"]')
            .should("exist")
            .should("be.visible");
        cy.get('input[name="terms"]').click();
        cy.get('[data-cy="alert-falsy-term"]').should("not.be.visible");
        cy.contains("Me connecter");
        cy.get('[data-cy="heading-signin"]')
            .should("exist")
            .click()
            .url()
            .should("eq", "http://localhost:5173/signin");
        cy.contains("CONNEXION");
    });

    it("should nagivate to signin Page", () => {
        cy.visit("/signin");
        cy.get('[data-cy="cookies"]').should("exist");
        cy.get('[data-cy="accept"]').click();
        cy.get('[data-cy="cookies"]').should("not.exist");
        cy.get('input[role="email"]').type("user.teacherUn@ac-rennes.fr");
        cy.get('input[name="password"]').type("1234");
        cy.get('[data-cy="submit"]').click();
        cy.url().should("include", "/home");
    });
});
