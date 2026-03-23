import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { Todo } from '@/types/Todo';

const initialTodos: Todo[] = [];
let newId = 0;

export const TodoActionType = {
    Add: 'ADD_TODO',
    Delete: 'DELETE_TODO',
    Edit: 'EDIT_TODO',
    ToggleCompleteTodo: 'TOGGLE_TODO',
    ToggleCompleteAll: 'TOGGLE_ALL',
    ClearCompleted: 'CLEAR_COMPLETED',
} as const;

//bad because it is generic, consumer cannot express clear intent
export type TodoAction =
    | { type: typeof TodoActionType.Add; text: string }
    | { type: typeof TodoActionType.Edit; id: number; todo: Partial<Todo> }
    | { type: typeof TodoActionType.ToggleCompleteTodo; id: number }
    | { type: typeof TodoActionType.Delete; id: number }
    | { type: typeof TodoActionType.ToggleCompleteAll }
    | { type: typeof TodoActionType.ClearCompleted };

const taskReducer = function (todos: Todo[], action: TodoAction): Todo[] {
    switch (action.type) {
        case TodoActionType.Add: {
            const newTodo: Todo = {
                id: ++newId,
                text: action.text,
                completed: false,
            };
            return [...todos, newTodo];
        }
        case TodoActionType.Edit: {
            return todos.map((t) => (t.id === action.id ? { ...t, ...action.todo } : t));
        }
        case TodoActionType.ToggleCompleteTodo: {
            return todos.map((t) => (t.id === action.id ? { ...t, completed: !t.completed } : t));
        }
        case TodoActionType.Delete: {
            return todos.filter((t) => t.id != action.id);
        }
        case TodoActionType.ToggleCompleteAll: {
            const allComplete = todos.every((t) => t.completed);
            return todos.map((t) => (t.completed === allComplete ? { ...t, completed: !allComplete } : t));
        }
        case TodoActionType.ClearCompleted: {
            return todos.filter((t) => !t.completed);
        }
    }
};

export const TodoContext = createContext<Todo[] | undefined>(undefined);
export const TodoDispatchContext = createContext<Dispatch<TodoAction> | undefined>(undefined);

export default function TodoProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [todos, todoDispatch] = useReducer(taskReducer, initialTodos);

    return (
        <TodoContext.Provider value={todos}>
            <TodoDispatchContext.Provider value={todoDispatch}>{children}</TodoDispatchContext.Provider>
        </TodoContext.Provider>
    );
}
