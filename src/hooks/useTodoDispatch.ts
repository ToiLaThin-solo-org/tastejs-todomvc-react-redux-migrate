import { useContext } from "react";
import { TodoDispatchContext } from "../contexts/TodoContext";

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('useTodoDispatch must be used inside TodoProvider');
    }
    return context;
}