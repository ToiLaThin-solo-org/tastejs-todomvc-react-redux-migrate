import { Filter, FilterActive, FilterAll, FilterCompleted, FilterURLParameter } from '@/types/Filter';
import { Todo } from '@/types/Todo';

export const todoSelectors = {
    completedCount: (todos: Todo[]) => todos.filter((t) => t.completed).length,

    activeCount: (todos: Todo[]) => todos.filter((t) => !t.completed).length,

    hasCompleted: (todos: Todo[]) => todos.some((t) => t.completed),
    todoFilter(searchParams: URLSearchParams): Filter {
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
    },
    visibleTodos(todos: Todo[], filter: Filter) {
        switch (filter) {
            case FilterActive:
                return todos.filter((t) => !t.completed);
            case FilterCompleted:
                return todos.filter((t) => t.completed);
            default:
                return todos;
        }
    },
};
