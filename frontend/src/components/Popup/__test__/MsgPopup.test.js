import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MsgPopup from '../MsgPopup';


describe('MsgPopup Component', () => {


let getByText, getByRole, queryByRole;

    const mockSetOpen = jest.fn();
    const mockOnClick = jest.fn();

beforeEach(() => {
        ({ getByText, getByRole, queryByRole } = render(
            <MsgPopup 
                isOpen={true}
                setOpen={mockSetOpen}
                popupText={'Are you sure you want to proceed?'}
                onClick={mockOnClick}
            />
        ));

});

it('renders the provided message', () => {
    const messageText = getByText('Are you sure you want to proceed?');
    expect(messageText).toBeInTheDocument();
});

it('closes the dialog when "NO" is clicked', async () => {
    const noButton = getByText('NO');
    fireEvent.click(noButton);

    await waitFor(() => {
        expect(mockSetOpen).toHaveBeenCalledWith(false);
    });
});

it('executes onClick and closes the dialog when "YES" is clicked', async () => {
    const yesButton = getByText('YES');
    fireEvent.click(yesButton);

    await waitFor(() => {
        expect(mockSetOpen).toHaveBeenCalledWith(false);
        expect(mockOnClick).toHaveBeenCalled();
    });
});

});