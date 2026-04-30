// Main.integration.test.tsx
import { useEffect, useContext } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Main from '@/components/Main/Main';
import TodoProvider, { TodoDispatchContext, TodoActionType, type TodoAction } from '@/contexts/TodoContext';

// Optional but recommended if your app uses router in Footer links:
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Helper component to seed todos into context before rendering Main
function SeedTodos({ todos }: { todos: string[] }) {
    const dispatch = useContext(TodoDispatchContext);

    useEffect(() => {
        if (!dispatch) return;
        todos.forEach((text) => {
            dispatch({ type: TodoActionType.Add, text } satisfies TodoAction);
        });
    }, [dispatch, todos]);

    return null;
}

function renderMain(seed: string[] = []) {
    render(
        <MemoryRouter>
            <TodoProvider>
                <SeedTodos todos={seed} />
                <Main />
            </TodoProvider>
        </MemoryRouter>,
    );
    const user = userEvent.setup();
    return { user };
}

describe('Main', () => {
    it('does not render main section when there are no todos', () => {
        renderMain([]);
        expect(screen.queryByTestId('main')).not.toBeInTheDocument();
    });

    it('toggle-all marks all todos complete, then uncomplete on second click', async () => {
        const { user } = renderMain(['A', 'B', 'C']);

        // wait until seeded todos appear (Main only renders when todos exist)
        await waitFor(() => {
            expect(screen.getByTestId('main')).toBeInTheDocument();
        });

        const toggleAll = screen.getByTestId('toggle-all') as HTMLInputElement;

        // initially not all completed
        expect(toggleAll.checked).toBe(false);

        await user.click(toggleAll);
        await waitFor(() => {
            expect((screen.getByTestId('toggle-all') as HTMLInputElement).checked).toBe(true);
        });

        // click 2: uncomplete all
        await user.click(screen.getByTestId('toggle-all'));
        await waitFor(() => {
            expect((screen.getByTestId('toggle-all') as HTMLInputElement).checked).toBe(false);
        });
    });

    it('clear completed removes completed todos', async () => {
        const { user } = renderMain(['A', 'B']);

        await waitFor(() => {
            expect(screen.getByTestId('main')).toBeInTheDocument();
        });

        // complete all first
        await user.click(screen.getByTestId('toggle-all'));

        // then clear completed via Footer button/control
        // adjust selector based on your Footer markup
        await user.click(screen.getByText(/clear completed/i));

        await waitFor(() => {
            // after clearing, no todos => Main returns null
            expect(screen.queryByTestId('main')).not.toBeInTheDocument();
        });
    });
});
