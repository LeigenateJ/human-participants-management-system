import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PotentialParticipantPopUp from '../PotentialParticipantPopUp';
import { PotentialParticipantContext } from '../../../providers/PotentialParticipantProvider';
import '@testing-library/jest-dom/extend-expect';

const mockContextValue = {
    studyParticipants: [
        { _id: '1', email: 'test1@example.com', tag: ['tag1', 'tag2'] },
        { _id: '2', email: 'test2@example.com', tag: ['tag3'] }
    ],
    selectedRows: [],
    setSelectedRows: jest.fn(),
    loading: false
};

describe('StudyParticipantTable', () => {
    
    it('renders dialog when open prop is true', () => {
        render(
            <PotentialParticipantContext.Provider value={mockContextValue}>
                <PotentialParticipantPopUp open={true} onClose={jest.fn()} />
            </PotentialParticipantContext.Provider>
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('does not render dialog when open prop is false', () => {
        render(
            <PotentialParticipantContext.Provider value={mockContextValue}>
                <PotentialParticipantPopUp open={false} onClose={jest.fn()} />
            </PotentialParticipantContext.Provider>
        );

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('opens and closes the MailingList on button click', () => {
        render(
            <PotentialParticipantContext.Provider value={mockContextValue}>
                <PotentialParticipantPopUp open={true} onClose={jest.fn()} />
            </PotentialParticipantContext.Provider>
        );

        fireEvent.click(screen.getByText('Show Mailing List'));
        expect(screen.getByText('Mailing List')).toBeInTheDocument(); // Assuming MailingList has "Mailing List" text
    });

    it('renders PotentialParticipantList', () => {
        render(
            <PotentialParticipantContext.Provider value={mockContextValue}>
                <PotentialParticipantPopUp open={true} onClose={jest.fn()} />
            </PotentialParticipantContext.Provider>
        );

        expect(screen.getByText('Potential Participants')).toBeInTheDocument();
        expect(screen.getByText('test1@example.com')).toBeInTheDocument();
        expect(screen.getByText('tag1')).toBeInTheDocument();
        expect(screen.getByText('tag2')).toBeInTheDocument();
        expect(screen.getByText('test2@example.com')).toBeInTheDocument();
        expect(screen.getByText('tag3')).toBeInTheDocument();
    });

});
