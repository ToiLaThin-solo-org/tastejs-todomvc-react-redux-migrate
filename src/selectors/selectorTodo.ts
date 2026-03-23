import { Filter, FilterActive, FilterAll, FilterCompleted, FilterURLParameter } from '@/types/Filter';
import { Todo } from '@/types/Todo';

export function getTodoFilter(searchParams: URLSearchParams) {
    const filter = searchParams.get(FilterURLParameter);
    if (!filter) {
        return FilterAll;
    }
    switch (filter) {
        case FilterActive: {
            return FilterActive;
        }
        case FilterCompleted: {
            return FilterCompleted;
        }
        default: {
            return FilterAll;
        }
    }
}

export function getVisibleTodos(todos: Todo[], filter: Filter) {
    switch (filter) {
        case FilterActive:
            return todos.filter((t) => !t.completed);
        case FilterCompleted:
            return todos.filter((t) => t.completed);
        default:
            return todos;
    }
}
