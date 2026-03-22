import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { Todo } from '@/types/Todo';

const initialTodos: Todo[] = [];
let newId = 0;

type TodoAction =
    | { type: 'Add'; text: string }
    | { type: 'Edit'; id: number; todo: Partial<Todo> } //bad because it is generic, consumer cannot express clear intent
    | { type: 'ToggleComplete'; id: number }
    | { type: 'Delete'; id: number }
    | { type: 'ToggleCompleteAll' };

const taskReducer = function (todos: Todo[], action: TodoAction): Todo[] {
    switch (action.type) {
        case 'Add': {
            const newTodo: Todo = {
                id: ++newId,
                text: action.text,
                completed: false,
            };
            return [...todos, newTodo];
        }
        case 'Edit': {
            return todos.map((t) => (t.id === action.id ? { ...t, ...action.todo } : t));
        }
        case 'ToggleComplete': {
            return todos.map((t) => (t.id === action.id ? { ...t, completed: !t.completed } : t));
        }
        case 'Delete': {
            return todos.filter((t) => t.id != action.id);
        }
        case 'ToggleCompleteAll': {
            const allComplete = todos.every((t) => t.completed);
            return todos.map((t) => (t.completed === allComplete ? { ...t, completed: !allComplete } : t));
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
