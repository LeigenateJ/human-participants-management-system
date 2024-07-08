import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { StudyParticipantContext } from '../../../providers/StudyPaticipantsProvider';
import { SessionContext } from '../../../providers/SessionContextProvider';
import { StudyResearcherContext } from '../../../providers/StudyResearcherContextProvider';
import SessionArchive from '../SessionArchive';
import { sessionContext, studyResearcherContext_study01, studyParticipantContext } from '../../../providers/__test__/providerTestData';
import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {
    return { getByText, queryByText, getByRole, getAllByText } = render(
        <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
            <StudyParticipantContext.Provider value={studyParticipantContext}>
                <SessionContext.Provider value={sessionContext}>
                    <SessionArchive />
                </SessionContext.Provider>
            </StudyParticipantContext.Provider>
        </StudyResearcherContext.Provider>
        );
})

describe('SessionArchive Component' , () => {
    
    it('renders "Archived Sessions" button', () => {

        const archivedSessionsButton = getByText('Archived Sessions');
        expect(archivedSessionsButton).toBeInTheDocument();

    })

    it('opens the dialog when "Archived Sessions" button is clicked', async () => {
        
        const archivedSessionsButton = getByText('Archived Sessions');
        fireEvent.click(archivedSessionsButton);
        
        const dialogTitle = getByText('View Archived Sessions');
        expect(dialogTitle).toBeInTheDocument();

        //Check table header
        expect(getByText('Session Code')).toBeInTheDocument();
        expect(getByText('Date')).toBeInTheDocument();
        expect(getByText('Time')).toBeInTheDocument();
        expect(getByText('Location')).toBeInTheDocument();
        expect(getByText('Participant Number')).toBeInTheDocument();
        expect(getByText('Participant List')).toBeInTheDocument();

        //Check table data
        expect(getByText('SE2023')).toBeInTheDocument();
        expect(getByText('2023-10-30')).toBeInTheDocument();
        expect(getByText('14:00')).toBeInTheDocument();
        expect(getByText('Room 102')).toBeInTheDocument();
        expect(getByText('20')).toBeInTheDocument();
        expect(getByRole('button', { name: 'View participants'})).toBeInTheDocument();
        
        const closeButton = getByRole('button', { name: 'Close'});
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);

        await waitFor(() => {
            expect(queryByText('SE2023')).toBeNull();
        })
        
    })
});