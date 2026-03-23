import { getVisibleTodos } from '@/selectors/selectorTodo';
import { useTodos } from '@/hooks/useTodos';
import { FilterActive, FilterCompleted } from '@/types/Filter';

export function useCompletedTodos() {
    const todos = useTodos();
    const completedTodos = getVisibleTodos(todos, FilterCompleted);
    return completedTodos;
}

export function useActiveTodos() {
    const todos = useTodos();
    const activeTodos = getVisibleTodos(todos, FilterActive);
    return activeTodos;
}

export function useCompletedTodosCount() {
    const completedTodos = useCompletedTodos();
    return completedTodos.length;
}

export function useActiveTodosCount() {
    const activeTodos = useActiveTodos();
    return activeTodos.length;
}
