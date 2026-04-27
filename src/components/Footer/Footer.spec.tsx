import { render, screen } from '@testing-library/react';
import { Footer, FooterProps } from '@/components/Footer/Footer';
import { MemoryRouter } from 'react-router-dom';
import { FilterActive, FilterAll, FilterCompleted, FilterURLParameter } from '@/types/Filter';
import userEvent from '@testing-library/user-event';

describe('Footer', () => {
    const renderFooter = (props: Partial<FooterProps> = {}) => {
        const defaultProps = {
            activeTodosCount: 2,
            completedTodosCount: 1,
            onClearCompleted: jest.fn(),
        };
        render(
            <MemoryRouter>
                <Footer {...defaultProps} {...props} />
            </MemoryRouter>,
        );
    };

    it('renders active todo count correctly', () => {
        renderFooter({ activeTodosCount: 1 });
        expect(screen.getByText('1 item left!')).toBeInTheDocument();
    });

    it('renders plural todo count correctly', () => {
        renderFooter({ activeTodosCount: 2 });
        expect(screen.getByText('2 items left!')).toBeInTheDocument();
    });

    it('renders zero todos count', () => {
        renderFooter({ activeTodosCount: 0 });
        expect(screen.getByText('0 items left!')).toBeInTheDocument();
    });

    it('renders filter links with correct query params', () => {
        renderFooter();
        const allLink = screen.getByText('All');
        const activeLink = screen.getByText('Active');
        const completedLink = screen.getByText('Completed');

        expect(allLink).toHaveAttribute('href', expect.stringContaining(`${FilterURLParameter}=${FilterAll}`));
        expect(activeLink).toHaveAttribute('href', expect.stringContaining(`${FilterURLParameter}=${FilterActive}`));
        expect(completedLink).toHaveAttribute(
            'href',
            expect.stringContaining(`${FilterURLParameter}=${FilterCompleted}`),
        );
    });

    it('shows clear completed button when there are completed todos', () => {
        renderFooter({ completedTodosCount: 1 });
        expect(screen.getByText('Clear completed')).toBeInTheDocument();
    });

    it('does not show clear button when no completed todos', () => {
        renderFooter({ completedTodosCount: 0 });
        expect(screen.queryByText('Clear completed')).not.toBeInTheDocument();
    });

    it('calls onClearCompleted when button is clicked', async () => {
        const onClearCompleted = jest.fn();
        renderFooter({ completedTodosCount: 1, onClearCompleted });
        const user = userEvent.setup();
        await user.click(screen.getByText('Clear completed'));
        expect(onClearCompleted).toHaveBeenCalledTimes(1);
    });
});
