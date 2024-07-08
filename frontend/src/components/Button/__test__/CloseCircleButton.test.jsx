import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CloseCircleButton from '../CloseCircleButton';

describe('<CloseCircleButton />', () => {
    let mockOnClick;

    beforeEach(() => {
        mockOnClick = jest.fn();
        render(<CloseCircleButton popupText="Are you sure?" onClick={mockOnClick} />);
    });

    it('should not display the dialog by default', () => {
        expect(screen.queryByText('Are you sure?')).toBeNull();
    });

    it('should display the dialog when the button is clicked', () => {
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(screen.getByText('Are you sure?')).not.toBeNull();
    });

    it('should call the onClick function and close the dialog when YES is clicked', async () => {
        const button = screen.getByRole('button');
        fireEvent.click(button);
        const yesButton = screen.getByText('YES');
        fireEvent.click(yesButton);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(screen.queryByText('Are you sure?')).toBeNull());
    });

    it('should close the dialog when NO is clicked', async () => {
        const button = screen.getByRole('button');
        fireEvent.click(button);
        const noButton = screen.getByText('NO');
        fireEvent.click(noButton);
        await waitFor(() => expect(screen.queryByText('Are you sure?')).toBeNull());
    });
});
