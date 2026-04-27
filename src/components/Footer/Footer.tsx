import { Link } from 'react-router-dom';
import { FilterActive, FilterAll, FilterCompleted, FilterURLParameter } from '@/types/Filter';

export type FooterProps = {
    activeTodosCount: number;
    completedTodosCount: number;
    onClearCompleted: () => void;
};
export const Footer = ({ activeTodosCount, completedTodosCount, onClearCompleted }: FooterProps) => {
    return (
        <footer className="footer" data-testid="footer">
            <span className="todo-count">
                {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left!
            </span>
            <ul className="filters" data-testid="footer-navigation">
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
            {completedTodosCount > 0 ? (
                <button className="clear-completed" onClick={onClearCompleted}>
                    Clear completed
                </button>
            ) : null}
        </footer>
    );
};
