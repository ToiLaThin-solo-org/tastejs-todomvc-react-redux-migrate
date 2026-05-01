declare namespace Cypress {
    interface Chainable {
        addTodos(todos: string[]): Chainable<void>;
    }
}
