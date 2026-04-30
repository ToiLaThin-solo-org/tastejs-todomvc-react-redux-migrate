import TodoItem from '@/components/TodoItem/TodoItem';
import { useVisibleTodos } from '@/hooks/useVisibleTodos';
import { Footer } from '@/components/Footer/Footer';
import { useTodoDispatch } from '@/hooks/useTodoDispatch';
import { useTodos, useTodoSelector } from '@/hooks/useTodos';
import { TodoActionType } from '@/contexts/TodoContext';
import { todoSelectors } from '@/selectors/todoSelectors';

export default function Main() {
    const todos = useTodos();
    const visibleTodos = useVisibleTodos();
    const completedTodosCount = useTodoSelector(todoSelectors.completedCount);
    const activeTodosCount = useTodoSelector(todoSelectors.activeCount);
    const todoDispatch = useTodoDispatch();

    if (!todos?.length) {
        return null;
    }
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
            <ul className="todo-list" data-testid="todo-list">
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
