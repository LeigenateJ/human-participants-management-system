import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ConfirmPopup from '../ConfirmPopup';
import '@testing-library/jest-dom/extend-expect';


beforeEach(() => {

    return { getByText, queryByText, getByRole, queryByRole } = render(
        <ConfirmPopup 
            buttonText={'Save'}
            popupText={'Changes Saved!'}
        />
        );
});

describe('ConfirmPopup Component', () => {

    it('renders confirm button', () => {

        const confirmButton = getByText('Save');
        expect(confirmButton).toBeInTheDocument();

    });

    it('opens and closes the dialog when clicked',async () => {

        const confirmButton = getByText('Save');
        fireEvent.click(confirmButton);

        expect(getByRole('dialog', {name: 'Confirmation'})).toBeInTheDocument();
        expect(getByText('Changes Saved!')).toBeInTheDocument();

        const closeButton = getByRole('button', { name: 'OK'});
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);

        await waitFor(() => {
            expect(queryByRole('dialog', {name: 'Confirmation'})).toBeNull();
        })
    });


})