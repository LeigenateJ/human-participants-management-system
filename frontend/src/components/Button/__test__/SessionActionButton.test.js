import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SessionActionButton from '../SessionActionButton';
import { SessionContext } from '../../../providers/SessionContextProvider';
import { StudyParticipantContext } from '../../../providers/StudyPaticipantsProvider';
import { sessionContext, studyParticipantContext } from '../../../providers/__test__/providerTestData';
import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {
    return { getByText, queryByText, getByRole } = render(
        <StudyParticipantContext.Provider value={studyParticipantContext}>
            <SessionContext.Provider value={sessionContext}>
                <SessionActionButton pageItemId={"000000000000000000000021"}/>
            </SessionContext.Provider>
        </StudyParticipantContext.Provider>
      );
});

describe('SessionActionButton Component', () => {

    it('renders "Action" button', () => {
        const actionText = getByText('Action');
        expect(actionText).toBeInTheDocument();
    });

    it('clicking the action button toggles the menu', async () => {
        const actionText = getByText('Action');
        fireEvent.click(actionText);

        await waitFor(() => {
        expect(getByText('Edit Session')).toBeInTheDocument();
        expect(getByText('View participants')).toBeInTheDocument();
        expect(getByText('Archive Session')).toBeInTheDocument();
        });

        fireEvent.click(actionText);

        await waitFor(() => {
            expect(queryByText('Edit Session')).toBeNull();
            expect(queryByText('View participants')).toBeNull();
            expect(queryByText('Archive Session')).toBeNull();
        });
        
    });

});