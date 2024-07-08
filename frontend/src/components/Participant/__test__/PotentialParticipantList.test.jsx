import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { PotentialParticipantContext } from '../../../providers/PotentialParticipantProvider';
import PotentialParticipantList from '../PotentialParticipantList';

describe('potentialParticipantList', () => {

    const mockContextValue = {
        studyParticipants: [
            { _id: '1', email: 'test1@example.com', tag: ['tag1', 'tag2'] },
            { _id: '2', email: 'test2@example.com', tag: ['tag3'] }
        ],
        selectedRows: [],
        setSelectedRows: jest.fn(),
        loading: false
    };

    it('renders participants and their tags correctly', () => {
        render(
            <PotentialParticipantContext.Provider value={mockContextValue}>
                <PotentialParticipantList />
            </PotentialParticipantContext.Provider>
        );

        expect(screen.getByText('test1@example.com')).toBeInTheDocument();
        expect(screen.getByText('tag1')).toBeInTheDocument();
        expect(screen.getByText('tag2')).toBeInTheDocument();
        expect(screen.getByText('test2@example.com')).toBeInTheDocument();
        expect(screen.getByText('tag3')).toBeInTheDocument();
    });

    it('allows selection of rows', () => {
        render(
            <PotentialParticipantContext.Provider value={mockContextValue}>
                <PotentialParticipantList />
            </PotentialParticipantContext.Provider>
        );

        fireEvent.click(screen.getAllByRole('checkbox')[0]);
        expect(mockContextValue.setSelectedRows).toHaveBeenCalled();
    });

    it('displays custom no rows overlay when no participants available', () => {
        const emptyMock = {
            ...mockContextValue,
            studyParticipants: []
        };

        render(
            <PotentialParticipantContext.Provider value={emptyMock}>
                <PotentialParticipantList />
            </PotentialParticipantContext.Provider>
        );
        expect(screen.getByText('No Participants')).toBeInTheDocument();
    });

});
