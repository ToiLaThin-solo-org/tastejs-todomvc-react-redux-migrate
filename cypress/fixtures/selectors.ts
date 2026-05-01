const TODO_SELECTORS = {
    TEXT_INPUT: '[data-testid="text-input"]',
    TODO_ITEM: '[data-testid="todo-item"]',
    TODO_ITEM_TOGGLE: '[data-testid="todo-item-toggle"]',
    TOGGLE_ALL: '[data-testid="toggle-all"]',
    TODO_COUNT: '.todo-count',
    FOOTER_NAVIGATION: '[data-testid="footer-navigation"]',
    FILTER_COMPLTED: 'a[href*="completed"]',
    FILTER_ALL: 'a[href*="all"]',
    FILTER_ACTIVE: 'a[href*="active"]',
} as const;

export { TODO_SELECTORS };
