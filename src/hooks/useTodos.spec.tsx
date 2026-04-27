import { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { useTodos } from '@/hooks/useTodos';
import { useTodoDispatch } from '@/hooks/useTodoDispatch';
import TodoProvider, { TodoActionType } from '@/contexts/TodoContext';

describe('useTodos hook', () => {
    it('should return todos array from context', () => {
        const { result } = renderHook(() => useTodos(), {
            wrapper: TodoProvider,
        });
        expect(result.current).toBeDefined();
        expect(Array.isArray(result.current)).toBe(true);
        expect(result.current).toEqual([]);
    });

    it('should throw error when used outside TodoProvider', () => {
        expect(() => renderHook(() => useTodos())).toThrow('useTodos must be used inside TodoProvider');
    });

    it('should return updated todos after adding a todo', () => {
        const Wrapper = ({ children }: { children: ReactNode }) => <TodoProvider>{children}</TodoProvider>;

        const { result } = renderHook(
            () => ({
                todos: useTodos(),
                dispatch: useTodoDispatch(),
            }),
            { wrapper: Wrapper },
        );

        expect(result.current.todos).toEqual([]);

        act(() => {
            result.current.dispatch({
                type: TodoActionType.Add,
                text: 'Test todo',
            });
        });

        expect(result.current.todos).toHaveLength(1);
        expect(result.current.todos[0]).toMatchObject({
            text: 'Test todo',
            completed: false,
        });
    });
});
