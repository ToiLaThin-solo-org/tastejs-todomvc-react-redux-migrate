import { todoSelectors } from './todoSelectors';
import { FilterActive, FilterAll, FilterCompleted, FilterURLParameter } from '@/types/Filter';

const todos = [
    { id: 1, text: 'A', completed: false },
    { id: 2, text: 'B', completed: true },
    { id: 3, text: 'C', completed: false },
];

describe('todoSelectors', () => {
    it('completedCount', () => {
        expect(todoSelectors.completedCount(todos)).toBe(1);
    });

    it('activeCount', () => {
        expect(todoSelectors.activeCount(todos)).toBe(2);
    });

    it('hasCompleted returns true when completed exists', () => {
        expect(todoSelectors.hasCompleted(todos)).toBe(true);
    });

    it('hasCompleted returns false when none completed', () => {
        expect(todoSelectors.hasCompleted([{ id: 1, text: 'A', completed: false }])).toBe(false);
    });

    describe('todoFilter', () => {
        it('returns all when param missing', () => {
            const params = new URLSearchParams();
            expect(todoSelectors.todoFilter(params)).toBe(FilterAll);
        });

        it('returns active', () => {
            const params = new URLSearchParams({
                [FilterURLParameter]: FilterActive,
            });

            expect(todoSelectors.todoFilter(params)).toBe(FilterActive);
        });

        it('returns completed', () => {
            const params = new URLSearchParams({
                [FilterURLParameter]: FilterCompleted,
            });

            expect(todoSelectors.todoFilter(params)).toBe(FilterCompleted);
        });

        it('returns all for invalid value', () => {
            const params = new URLSearchParams({
                [FilterURLParameter]: 'trash',
            });

            expect(todoSelectors.todoFilter(params)).toBe(FilterAll);
        });
    });

    describe('visibleTodos', () => {
        it('returns active todos', () => {
            expect(todoSelectors.visibleTodos(todos, FilterActive)).toHaveLength(2);
        });

        it('returns completed todos', () => {
            expect(todoSelectors.visibleTodos(todos, FilterCompleted)).toHaveLength(1);
        });

        it('returns all todos', () => {
            expect(todoSelectors.visibleTodos(todos, FilterAll)).toHaveLength(3);
        });
    });
});
