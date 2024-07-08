import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import EditParticipant from '../EditParticipant';
import '@testing-library/jest-dom/extend-expect';

describe('EditParticipant Component', () => {
    const mockParticipant = {
        participantInfo: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phoneNum: '1234567890',
            tagsInfo: ['Student'],
            isWillContact: false,
        },
        isGift: false,
        isWIllReceiveReport: false,
        isComplete: false,
        note: '',
    };

    it('renders edit button correctly', () => {
        const { getByTestId } = render(<EditParticipant participant={mockParticipant} />);
        expect(getByTestId('EditIconBtn')).toBeInTheDocument();
    });

    it('opens dialog on edit button click', () => {
        const { getByTestId, getByText } = render(<EditParticipant participant={mockParticipant} />);
        fireEvent.click(getByTestId('EditIconBtn'));
        expect(getByText('Edit Participant')).toBeInTheDocument();
    });

    it('changes input value correctly', () => {
        const { getByTestId, getByLabelText } = render(<EditParticipant participant={mockParticipant} />);
        fireEvent.click(getByTestId('EditIconBtn'));
        const emailInput = getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: 'new.email@example.com' } });
        expect(emailInput.value).toBe('new.email@example.com');
    });

    it('closes dialog on cancel button click', async () => {
        const { getByTestId, getByText, queryByText } = render(<EditParticipant participant={mockParticipant} />);
        fireEvent.click(getByTestId('EditIconBtn'));
        const cancelButton = getByText('Cancel');
        fireEvent.click(cancelButton);
        fireEvent.click(getByText('YES'));
        await waitFor(() => {
            expect(queryByText('Edit Participant')).not.toBeInTheDocument();
        });
    });

    it('saves changes on save button click', async () => {
        const { getByTestId, getByLabelText, getByText, queryByText } = render(<EditParticipant participant={mockParticipant} onSave={jest.fn().mockReturnValue(true)}/>);
        fireEvent.click(getByTestId('EditIconBtn'));
        const emailInput = getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: 'new.email@example.com' } });
        const saveButton = getByText('Save');
        fireEvent.click(saveButton);
        await waitFor(() => {
            expect(getByText('OK')).toBeInTheDocument();
        });
        fireEvent.click(getByText('OK'));
        await waitFor(() => {
            expect(queryByText('Edit Participant')).not.toBeInTheDocument();
        });
    });

});
