import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SessionParticipantList from '../SessionParticipantList';
import { StudyParticipantContext } from '../../../providers/StudyPaticipantsProvider';
import { SessionContext } from '../../../providers/SessionContextProvider';
import { StudyResearcherContext } from '../../../providers/StudyResearcherContextProvider';
import '@testing-library/jest-dom/extend-expect';
import { sessionContext, studyParticipantContext, studyResearcherContext_study01 } from '../../../providers/__test__/providerTestData';

beforeEach(() => {
    return { getByText, queryByText, getByRole } = render(
        <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
            <StudyParticipantContext.Provider value={studyParticipantContext}>
                <SessionContext.Provider value={sessionContext}>
                    <SessionParticipantList targetSessionId="000000000000000000000021" />
                </SessionContext.Provider>
            </StudyParticipantContext.Provider>
        </StudyResearcherContext.Provider>  
      );
})

describe('SessionParticipantList Component', () => {

    it('renders "View participants" button', () => {

        const viewParticipantsText = getByText('View participants');
        expect(viewParticipantsText).toBeInTheDocument();

      });
      
    it('opens and closes the dialog when clicked',async () => {
      
        const viewParticipantsText = getByText('View participants');
        fireEvent.click(viewParticipantsText);
      
        const dialogTitle = getByText('View Participants');
        expect(dialogTitle).toBeInTheDocument();
        
        //Check table header
        expect(getByText('Serial Number')).toBeInTheDocument();
        expect(getByText('First Name')).toBeInTheDocument();
        expect(getByText('Last Name')).toBeInTheDocument();
        expect(getByText('Email')).toBeInTheDocument();
        expect(getByText('Phone Number')).toBeInTheDocument();
      
        //Check participant data
        expect(getByText('Study001-1')).toBeInTheDocument();
        expect(getByText('David')).toBeInTheDocument();
        expect(getByText('Anderson')).toBeInTheDocument();
        expect(getByText('david_anderson@sample.org')).toBeInTheDocument();
        expect(getByText('+00 379 158 265')).toBeInTheDocument();
      
        const closeButton = getByRole('button', { name: 'Close'});
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);

        await waitFor(() => {
            expect(queryByText('Serial Number')).toBeNull();
        })
      
      });
});

