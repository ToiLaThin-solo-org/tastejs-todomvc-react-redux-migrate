import { Link } from 'react-router-dom';
import { FilterActive, FilterAll, FilterCompleted, FilterURLParameter } from '@/types/Filter';
import { useVisibleTodos } from '@/hooks/useVisibleTodos';

export const Footer = () => {
    const visibleTodos = useVisibleTodos();
    const visibleTodosCount = visibleTodos.length;
    return (
        <footer>
            <span>
                {visibleTodosCount} {visibleTodosCount === 1 ? 'item' : 'items'} left!
            </span>
            <ul>
                <li>
                    <Link to={{ search: `${FilterURLParameter}=${FilterAll}` }}>All</Link>
                </li>
                <li>
                    <Link to={{ search: `${FilterURLParameter}=${FilterActive}` }}>Active</Link>
                </li>
                <li>
                    <Link to={{ search: `${FilterURLParameter}=${FilterCompleted}` }}>Completed</Link>
                </li>
            </ul>
        </footer>
    );
};
