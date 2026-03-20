import { Filter } from "../types/Filter";
import { useTodos } from "./useTodos";

export function useFilteredTodos(filter: Filter) {
    const todos = useTodos();

    switch (filter) {
        case "active":
            return todos.filter(t => !t.completed);
        case "completed":
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}