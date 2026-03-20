 
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';

export default function TodoList() {
    const todos = useTodos();
    if (todos.length === 0) return null;
    return todos.map((td) => <TodoItem key={td.id} todo={td}></TodoItem>);
}
