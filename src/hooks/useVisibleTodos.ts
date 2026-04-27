import { useTodos } from '@/hooks/useTodos';
import { useTodoFilter } from '@/hooks/useTodoFilter';
import { todoSelectors } from '@/selectors/todoSelectors';
import { useMemo } from 'react';

export function useVisibleTodos() {
    const todos = useTodos();
    const filter = useTodoFilter();
    return useMemo(() => todoSelectors.visibleTodos(todos, filter), [todos, filter]);
}
