import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { StudyParticipantContext } from '../../../providers/StudyPaticipantsProvider';
import { SessionContext } from '../../../providers/SessionContextProvider';
import { StudyResearcherContext } from '../../../providers/StudyResearcherContextProvider';
import { sessionContext, studyParticipantContext, studyResearcherContext_study01 } from '../../../providers/__test__/providerTestData';
import CreateEditSession from '../CreateEditSession';

describe('CreateEditSession Component - Create', () => {
    beforeEach(() => {
        return { getByText, queryByText, getByRole, getByDisplayValue } = render(
            <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
                <StudyParticipantContext.Provider value={studyParticipantContext}>
                    <SessionContext.Provider value={sessionContext}>
                        <CreateEditSession create={true} targetSessionId={null}/>
                    </SessionContext.Provider>
                </StudyParticipantContext.Provider>
            </StudyResearcherContext.Provider>  
          );
    });

    it('renders correctly', () => {
        expect(getByText('New Session')).toBeInTheDocument();
    });

    it('handle create button click open', async () => {
        const createButton = getByText('New Session');
        fireEvent.click(createButton);

        await waitFor(() => {
            expect(getByRole('dialog')).toBeInTheDocument();
            expect(getByText('Create New Session')).toBeInTheDocument();
            expect(getByText(`0/${studyParticipantContext.studyParticipants.length} selected`)).toBeInTheDocument();
            expect(getByText('Serial Number: Study001-1')).toBeInTheDocument();
            expect(getByText('Email: david_anderson@sample.org')).toBeInTheDocument();
            expect(getByText('Serial Number: Study001-2')).toBeInTheDocument();
            expect(getByText('Email: william_williams@mailbox.org')).toBeInTheDocument();
            expect(getByText('Serial Number: Study001-3')).toBeInTheDocument();
            expect(getByText('Email: jameliu@mailbox.org')).toBeInTheDocument();
        })
        
    });

    it('handle input change', async () => {

        const createButton = getByText('New Session');
        fireEvent.click(createButton);

        fireEvent.change(getByRole('textbox', {name:'Write your notes here'}), {target: {value: 'Test notes'}})

        await waitFor(() => {
            expect(getByDisplayValue('Test notes')).toBeInTheDocument();
        })
    })

});

describe('CreateEditSession Component - Edit', () => {
    beforeEach(() => {
        return { getByText, queryByText, getByRole, getByDisplayValue } = render(
            <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
                <StudyParticipantContext.Provider value={studyParticipantContext}>
                    <SessionContext.Provider value={sessionContext}>
                        <CreateEditSession create={false} targetSessionId={"000000000000000000000021"}/>
                    </SessionContext.Provider>
                </StudyParticipantContext.Provider>
            </StudyResearcherContext.Provider>  
          );
    });

    it('renders correctly', () => {
        expect(getByText('Edit Session')).toBeInTheDocument();
    });

    it('handle edit button click open', async () => {
        const editButton = getByText('Edit Session');
        fireEvent.click(editButton);

        await waitFor(() => {
            expect(getByRole('dialog')).toBeInTheDocument();
            expect(getByText('Edit Session (Session Code: SE1568)')).toBeInTheDocument();
            expect(getByDisplayValue('2023-10-19')).toBeInTheDocument();
            expect(getByDisplayValue('14:00')).toBeInTheDocument();
            expect(getByDisplayValue('Room 152')).toBeInTheDocument();
            expect(getByDisplayValue(20)).toBeInTheDocument();
            expect(getByDisplayValue('Take some notes')).toBeInTheDocument();
            expect(getByText(`0/${sessionContext.sessions[0].participantList.length} selected`)).toBeInTheDocument();
            expect(getByText('Serial Number: Study001-1')).toBeInTheDocument();
            expect(getByText('Email: david_anderson@sample.org')).toBeInTheDocument();
        })
        
    });

})