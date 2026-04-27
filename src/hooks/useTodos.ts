import { useContext, useMemo } from 'react';
import { TodoContext } from '@/contexts/TodoContext';
import { Todo } from '@/types/Todo';

export function useTodos() {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodos must be used inside TodoProvider');
    }
    return context;
}

export function useTodoSelector<T>(selector: (todos: Todo[]) => T): T {
    const todos = useTodos();

    return useMemo(() => selector(todos), [todos, selector]);
}
