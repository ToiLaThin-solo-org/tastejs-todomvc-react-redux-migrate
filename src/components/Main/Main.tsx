import TodoItem from '@/components/TodoItem/TodoItem';
import { useVisibleTodos } from '@/hooks/useVisibleTodos';
import { Footer } from '@/components/Footer/Footer';
import { useActiveTodosCount, useCompletedTodosCount } from '@/hooks/useCompletedTodos';
import { useTodoDispatch } from '@/hooks/useTodoDispatch';
import { useTodos } from '@/hooks/useTodos';
import { TodoActionType } from '@/contexts/TodoContext';

export default function Main() {
    const todos = useTodos();
    if (!todos?.length) {
        return null;
    }
    const completedTodosCount = useCompletedTodosCount();
    const visibleTodos = useVisibleTodos();
    const activeTodosCount = useActiveTodosCount();
    const todoDispatch = useTodoDispatch();
    return (
        <main className="main" data-testid="main">
            <div className="toggle-all-container">
                <input
                    className="toggle-all"
                    type="checkbox"
                    data-testid="toggle-all"
                    checked={completedTodosCount === todos.length}
                    onChange={() => todoDispatch({ type: TodoActionType.ToggleCompleteAll })}
                />
                <label className="toggle-all-label" htmlFor="toggle-all">
                    Toggle All Input
                </label>
            </div>
            <ul>
                {visibleTodos.map((td) => (
                    <TodoItem key={td.id} todo={td}></TodoItem>
                ))}
            </ul>
            <Footer
                completedTodosCount={completedTodosCount}
                activeTodosCount={activeTodosCount}
                onClearCompleted={() => todoDispatch({ type: TodoActionType.ClearCompleted })}
            ></Footer>
        </main>
    );
}
