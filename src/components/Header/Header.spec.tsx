// Header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
// mock dispatch
// AI generated, to be rewrite later, this is just mock test
const mockDispatch = jest.fn();

jest.mock('../../hooks/useTodoDispatch', () => ({
    useTodoDispatch: () => mockDispatch,
}));

test('should match snapshot', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
});

test('should render title and input', () => {
    render(<Header />);

    expect(screen.getByText('todos')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
});

test('should dispatch when pressing Enter', () => {
    render(<Header />);

    const input = screen.getByPlaceholderText('What needs to be done?');

    fireEvent.change(input, { target: { value: 'learn testing' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'Add',
        text: 'learn testing',
    });
});
