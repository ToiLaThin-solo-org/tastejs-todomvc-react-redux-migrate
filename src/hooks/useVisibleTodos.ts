import { useTodos } from '@/hooks/useTodos';
import { useTodoFilter } from '@/hooks/useTodoFilter';
import { getVisibleTodos } from '@/selectors/selectorTodo';

export function useVisibleTodos() {
    const todos = useTodos();
    const filter = useTodoFilter();
    const visibleTodos = getVisibleTodos(todos, filter);
    return visibleTodos;
}
