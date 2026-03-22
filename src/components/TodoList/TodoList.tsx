import TodoItem from '@/components/TodoItem/TodoItem';
import { useVisibleTodos } from '@/hooks/useVisibleTodos';

export default function TodoList() {
    const visibleTodos = useVisibleTodos();
    if (visibleTodos.length === 0) return null;
    return (
        <ul>
            {visibleTodos.map((td) => (
                <TodoItem key={td.id} todo={td}></TodoItem>
            ))}
        </ul>
    );
}
