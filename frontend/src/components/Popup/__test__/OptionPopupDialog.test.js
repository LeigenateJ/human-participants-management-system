import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OptionPopup from '../OptionPopup';

const handleClose = () => {
    return "Closed";
}

beforeEach(() => {

    return { getByText, queryByText, getByRole, queryByRole } = render(
        <OptionPopup 
            buttonText={'Cancel'}
            popupText={'Do you want to cancel?'}
            onClick={handleClose}
        />
        );
});

describe('OptionPopup Component', () => {

    it('renders confirm button', () => {

        const optionButton = getByText('Cancel');
        expect(optionButton).toBeInTheDocument();

    });

    it('opens and closes the dialog when clicked',async () => {

        const optionButton = getByText('Cancel');
        fireEvent.click(optionButton);

        expect(getByRole('dialog')).toBeInTheDocument();
        expect(getByText('Do you want to cancel?')).toBeInTheDocument();

        // Check YES button
        const yesButton = getByRole('button', { name: 'YES'});
        expect(yesButton).toBeInTheDocument();
        fireEvent.click(yesButton);

        await waitFor(() => {
            expect(queryByRole('dialog')).toBeNull();
        })

        // Check No button
        fireEvent.click(optionButton);
        const noButton = getByRole('button', { name: 'NO'});
        expect(noButton).toBeInTheDocument();
        fireEvent.click(noButton);

        await waitFor(() => {
            expect(queryByRole('dialog')).toBeNull();
        })
    });


});