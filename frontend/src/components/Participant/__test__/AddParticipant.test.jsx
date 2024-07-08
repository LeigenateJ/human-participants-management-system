import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AddParticipant from '../AddParticipant';
import { StudyParticipantContext } from '../../../providers/StudyPaticipantsProvider';

describe('AddParticipant Component', () => {

    it('should add a participant when the form is submitted', async () => {
        let mockAddParticipants;
        let mockAddStudyParticipants;
        mockAddParticipants = jest.fn().mockResolvedValue({ success: [{ _id: '123' }], existing: [] });
        mockAddStudyParticipants = jest.fn().mockResolvedValue([]);

        const { getByText, getByLabelText } =render(
            <StudyParticipantContext.Provider value={{ 
                addStudyParticipants: mockAddStudyParticipants, 
                addParticipants: mockAddParticipants,
                isAnonymous: false
            }}>
                <AddParticipant/>
            </StudyParticipantContext.Provider>
        );
        userEvent.click(getByText('Add New Participants'));

        // Simulate user filling out the form
        userEvent.type(getByLabelText('First Name'), 'John');
        userEvent.type(getByLabelText('Last Name'), 'Doe');
        userEvent.type(getByLabelText('Email *'), 'john.doe321@example.com');
        userEvent.type(getByLabelText('Phone Number'), '1234567890');

        // Simulate form submission by clicking the "Add" button
        const addButton = getByText('Add');
        userEvent.click(addButton);

        // Check if the participant was added by verifying the mock functions were called correctly
        await waitFor(() => {
            expect(mockAddParticipants).toHaveBeenCalledWith({
                participants: [{
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe321@example.com',
                    phoneNum: '1234567890',
                    isWillContact: false
                }]
            });
        });    

        await waitFor(() => {
                expect(mockAddStudyParticipants).toHaveBeenCalledWith({
                participantIds: ['123']
            });
        });
        userEvent.click(getByText('OK'));
    });

    it('renders without crashing', () => {
        render(
            <StudyParticipantContext.Provider value={{ 
                addStudyParticipants: jest.fn(), 
                addParticipants: jest.fn(), 
                isAnonymous: false 
            }}>
                <AddParticipant/>
            </StudyParticipantContext.Provider>
        );
    });

    it('opens and closes the dialog', async () => {
        const { getByText, queryByText } = render(
            <StudyParticipantContext.Provider value={{ 
                addStudyParticipants: jest.fn(), 
                addParticipants: jest.fn(), 
                isAnonymous: false 
            }}>
                <AddParticipant/>
            </StudyParticipantContext.Provider>
        );
        userEvent.click(getByText('Add New Participants'));
        expect(getByText('Add New Participant')).toBeInTheDocument();
        userEvent.click(getByText('Cancel'));
        waitFor(() => userEvent.click(getByText('Yes')));
        waitFor(() => expect(queryByText('Add New Participant')).not.toBeInTheDocument())
    });

    it('displays correct textfield for non-anonymous study', async () => {
        const { getByText, getByLabelText, findByText } = render(
            <StudyParticipantContext.Provider value={{ 
                addStudyParticipants: jest.fn(), 
                addParticipants: jest.fn(), 
                isAnonymous: false 
            }}>
                <AddParticipant/>
            </StudyParticipantContext.Provider>
        );
        userEvent.click(getByText('Add New Participants'));
        expect(getByText('Add New Participant')).toBeInTheDocument();
        expect(getByLabelText('First Name')).toBeInTheDocument();
        expect(getByLabelText('Last Name')).toBeInTheDocument();
        expect(getByLabelText('Email *')).toBeInTheDocument();
        expect(getByLabelText('Phone Number')).toBeInTheDocument();
    });

    it('displays correct textfield for anonymous study', async () => {
        const { getByText, getByLabelText, queryByLabelText } = render(
            <StudyParticipantContext.Provider value={{ 
                addStudyParticipants: jest.fn(), 
                addParticipants: jest.fn(), 
                isAnonymous: true 
            }}>
                <AddParticipant/>
            </StudyParticipantContext.Provider>
        );
        userEvent.click(getByText('Add New Participants'));
        expect(getByText('Add New Participant')).toBeInTheDocument();
        expect(queryByLabelText('First Name')).not.toBeInTheDocument();
        expect(queryByLabelText('Last Name')).not.toBeInTheDocument();
        expect(getByLabelText('Email *')).toBeInTheDocument();
        expect(queryByLabelText('Phone Number')).not.toBeInTheDocument();
    });

    it('displays error when email is invalid', async () => {
        const { getByText, getByLabelText, findByText } = render(
            <StudyParticipantContext.Provider value={{ 
                addStudyParticipants: jest.fn(), 
                addParticipants: jest.fn(), 
                isAnonymous: false 
            }}>
                <AddParticipant/>
            </StudyParticipantContext.Provider>
        );
        userEvent.click(getByText('Add New Participants'));
        const emailInput = getByLabelText('Email *');
        userEvent.type(emailInput, 'invalid-email');
        userEvent.click(getByText('Add'));
        const errorMessages = await screen.findAllByText('Invalid email format');
        expect(errorMessages.length).toBeGreaterThan(0);
    });

    it('handles file upload', () => {
        const { getByText, getByLabelText } = render(
            <StudyParticipantContext.Provider value={{ 
                addStudyParticipants: jest.fn(), 
                addParticipants: jest.fn(), 
                isAnonymous: false 
            }}>
                <AddParticipant/>
            </StudyParticipantContext.Provider>
        );
        userEvent.click(getByText('Add New Participants'));
        const fileInput = getByLabelText(/upload a csv file/i);
        const file = new File(['email,firstName,lastName,phoneNum'], 'participants.csv', { type: 'text/csv' });
        userEvent.upload(fileInput, file);
        expect(screen.getByText('participants.csv')).toBeInTheDocument();
    });

    it('handles file deletion', async () => {
        const { getByText, getByLabelText, getByTestId } = render(
            <StudyParticipantContext.Provider value={{ 
                addStudyParticipants: jest.fn(), 
                addParticipants: jest.fn(), 
                isAnonymous: false 
            }}>
                <AddParticipant/>
            </StudyParticipantContext.Provider>
        );
        userEvent.click(getByText('Add New Participants'));
        const fileInput = getByLabelText(/upload a csv file/i);
        const file = new File(['email,firstName,lastName,phoneNum'], 'participants.csv', { type: 'text/csv' });
        userEvent.upload(fileInput, file);
        expect(screen.getByText('participants.csv')).toBeInTheDocument();
        userEvent.click(getByTestId('close-button'));
        waitFor(() => userEvent.click(getByText('Yes')));
        waitFor(() => {
            expect(queryByText('participants.csv')).not.toBeInTheDocument();
        });
    });

    it('displays error when phone number is invalid', async () => {
        const { getByText, getByLabelText } = render(
            <StudyParticipantContext.Provider value={{ 
                addStudyParticipants: jest.fn(), 
                addParticipants: jest.fn(), 
                isAnonymous: false 
            }}>
                <AddParticipant/>
            </StudyParticipantContext.Provider>
        );
        userEvent.click(getByText('Add New Participants'));
        const emailInput = getByLabelText('Email *');
        userEvent.type(emailInput, 'test@test.com');
        const phoneInput = getByLabelText('Phone Number');
        userEvent.type(phoneInput, 'phone123456');
        userEvent.click(getByText('Add'));
        await waitFor(() => {
            expect(screen.getByText('Invalid phone number format')).toBeInTheDocument();
        });
    });

    it('handles isWillContact checkbox', () => {
        const { getByText, getByLabelText } = render(
            <StudyParticipantContext.Provider value={{ 
                addStudyParticipants: jest.fn(), 
                addParticipants: jest.fn(), 
                isAnonymous: false 
            }}>
                <AddParticipant/>
            </StudyParticipantContext.Provider>
        );
        userEvent.click(getByText('Add New Participants'));
        const checkbox = getByLabelText(/this participant is willing to join in the future studies./i);
        expect(checkbox).not.toBeChecked();
        userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });
});
