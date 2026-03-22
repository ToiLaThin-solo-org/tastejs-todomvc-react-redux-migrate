//must be hoisted (top-level), if after Header, it already use the real module
jest.mock('@/hooks/useTodoDispatch', () => ({
    useTodoDispatch: jest.fn(),
}));

import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/Header/Header';
import { useTodoDispatch } from '@/hooks/useTodoDispatch';

describe('Header component', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useTodoDispatch as jest.Mock).mockReturnValue(mockDispatch);
    });

    it('should render as expected snapshot', () => {
        const { asFragment } = render(<Header />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render expected title and input placeholder', () => {
        render(<Header />);

        expect(screen.getByText('todos')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    });

    it('should dispatch Add action when press Enter', () => {
        render(<Header />);

        const inputElement = screen.getByPlaceholderText('What needs to be done?');
        fireEvent.change(inputElement, { target: { value: 'some value' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'Add',
            text: 'some value',
        });
    });
});
