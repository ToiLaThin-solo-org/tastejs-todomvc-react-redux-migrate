import { TODO_SELECTORS } from '../fixtures/selectors';

describe('Todos', () => {
    it('should filter status', () => {
        cy.visit('/');
        cy.addTodos(['123', '222']);

        cy.get(TODO_SELECTORS.TEXT_INPUT).should('be.empty');

        cy.get(TODO_SELECTORS.TODO_COUNT).contains('2 items left!');
        cy.get(TODO_SELECTORS.TODO_ITEM)
            .last()
            .should('be.visible')
            .find(TODO_SELECTORS.TODO_ITEM_TOGGLE)
            .click()
            .should('be.checked');

        cy.get(TODO_SELECTORS.FOOTER_NAVIGATION).find(TODO_SELECTORS.FILTER_COMPLTED).click();
        cy.get(TODO_SELECTORS.TODO_COUNT).contains('1 item left!');
        cy.get(TODO_SELECTORS.FOOTER_NAVIGATION).find(TODO_SELECTORS.FILTER_ACTIVE).click();
        cy.get(TODO_SELECTORS.TODO_COUNT).contains('1 item left!');
    });

    it('should toggle all', () => {
        cy.visit('http://localhost:8080/');
        cy.addTodos(['123', '222']);

        cy.get(TODO_SELECTORS.TOGGLE_ALL).click().should('be.checked');
        cy.get(TODO_SELECTORS.TODO_ITEM)
            .should('be.visible')
            .find(TODO_SELECTORS.TODO_ITEM_TOGGLE)
            .should('be.checked');

        cy.get(TODO_SELECTORS.TODO_COUNT).contains('0 items left!');
    });
});
