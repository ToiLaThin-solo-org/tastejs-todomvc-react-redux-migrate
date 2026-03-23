jest.mock('@/hooks/useTodoDispatch', () => ({
    useTodoDispatch: jest.fn(),
}));

import { Todo } from '@/types/Todo';
import { render, screen } from '@testing-library/react';
import TodoItem from './TodoItem';
import { useTodoDispatch } from '@/hooks/useTodoDispatch';
import userEvent from '@testing-library/user-event';
import { TodoActionType } from '@/contexts/TodoContext';

describe('TodoItem component', () => {
    const mockDispatch = jest.fn();
    const setupComponent = () => {
        const todo: Todo = {
            id: 1,
            text: 'sometext',
            completed: false,
        };
        render(<TodoItem todo={todo}></TodoItem>);
        const user = userEvent.setup();
        return { user, todo };
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useTodoDispatch as jest.Mock).mockReturnValue(mockDispatch);
    });

    it('should render view mode after double click then enter text', async () => {
        const { user } = setupComponent();
        let label = screen.getByTestId('todo-item-label');
        expect(label).toBeInTheDocument();
        const toggle = screen.getByTestId<HTMLInputElement>('todo-item-toggle');
        expect(toggle).toBeInTheDocument();

        //change to edit mode
        await user.dblClick(label);
        const textInput = screen.getByTestId('text-input');
        expect(textInput).toBeInTheDocument();
        expect(textInput).toHaveClass('edit');
        await user.type(textInput, 'something{enter}');

        //then back to view mode
        expect(textInput).not.toBeInTheDocument();
        label = screen.getByTestId('todo-item-label');
        expect(label).toBeInTheDocument();
    });

    it.each([{ text: '' }, { text: '   ' }])(
        'should call todoDispatch Delete on double click then enter empty/whitespace',
        async ({ text }) => {
            const { user, todo } = setupComponent();
            const label = screen.getByTestId('todo-item-label');

            await user.dblClick(label);
            const textInput = screen.getByTestId('text-input');
            await user.type(textInput, `${text}{enter}`);

            expect(mockDispatch).toHaveBeenCalledWith(
                expect.objectContaining({ type: TodoActionType.Delete, id: todo.id }),
            );
        },
    );

    it('should call todoDispatch Edit on double click then enter text', async () => {
        const { user, todo } = setupComponent();
        const label = screen.getByTestId('todo-item-label');

        await user.dblClick(label);
        const textInput = screen.getByTestId('text-input');
        const text = 'something';
        await user.type(textInput, `${text}{enter}`);

        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({ type: TodoActionType.Edit, id: todo.id, todo: { text: text } }),
        );
    });

    it('should call todoDispatch ToggleComplete when check the checkbox', async () => {
        const { user, todo } = setupComponent();
        const toggle = screen.getByTestId<HTMLInputElement>('todo-item-toggle');

        await user.click(toggle);

        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({ type: TodoActionType.ToggleCompleteTodo, id: todo.id }),
        );
    });

    it('should call todoDispatch Delete when click delete button', async () => {
        const { user, todo } = setupComponent();
        const deleteButton = screen.getByTestId<HTMLInputElement>('todo-item-button');

        await user.click(deleteButton);

        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({ type: TodoActionType.Delete, id: todo.id }),
        );
    });
});
