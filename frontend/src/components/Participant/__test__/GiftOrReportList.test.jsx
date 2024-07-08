import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import GiftList from '../GiftOrReportList';
import '@testing-library/jest-dom/extend-expect';
import { StudyResearcherContext } from '../../../providers/StudyResearcherContextProvider';
import { StudyParticipantContext } from '../../../providers/StudyPaticipantsProvider';
import { DataGridContext } from '../../../providers/DataGridProvider';
import { studyParticipantContext, studyResearcherContext_study01, mockDataGridContext } from '../../../providers/__test__/providerTestData';

describe('GiftList Component', () => {

    it('renders without crashing', () => {
        render(
            <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
                <DataGridContext.Provider value={mockDataGridContext}>
                    <StudyParticipantContext.Provider value={studyParticipantContext}>
                        <GiftList type="gift" open={true} onClose={jest.fn()} />
                    </StudyParticipantContext.Provider>
                </DataGridContext.Provider>
            </StudyResearcherContext.Provider>
        );
    });

    it('shows the correct title based on type', () => {
        render(
            <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
                <DataGridContext.Provider value={mockDataGridContext}>
                    <StudyParticipantContext.Provider value={studyParticipantContext}>
                        <GiftList type="report" open={true} onClose={jest.fn()} />
                    </StudyParticipantContext.Provider>
                </DataGridContext.Provider>
            </StudyResearcherContext.Provider>
        );
        expect(screen.getByText('Report Recipients List')).toBeInTheDocument();
    });

    it('opens the mailing list when "Show Mailing List" button is clicked', () => {
        render(
            <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
                <DataGridContext.Provider value={mockDataGridContext}>
                    <StudyParticipantContext.Provider value={studyParticipantContext}>
                        <GiftList type="gift" open={true} onClose={jest.fn()} />
                    </StudyParticipantContext.Provider>
                </DataGridContext.Provider>
            </StudyResearcherContext.Provider>
        );
        fireEvent.click(screen.getByText('Show Mailing List'));
        expect(screen.getByText('Mailing List')).toBeInTheDocument();
    });

    it('displays the correct number of participants', () => {
        render(
            <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
                <DataGridContext.Provider value={mockDataGridContext}>
                    <StudyParticipantContext.Provider value={studyParticipantContext}>
                        <GiftList type="gift" open={true} onClose={jest.fn()} />
                    </StudyParticipantContext.Provider>
                </DataGridContext.Provider>
            </StudyResearcherContext.Provider>
        );
        const displayedRows = screen.getAllByRole('row');
        // Subtract 1 for the header row
        expect(displayedRows.length - 1).toBe(3);
    });

    it('toggles the status of a participant when the checkbox is clicked', async () => {
        render(
            <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
                <DataGridContext.Provider value={mockDataGridContext}>
                    <StudyParticipantContext.Provider value={studyParticipantContext}>
                        <GiftList type="gift" open={true} onClose={jest.fn()} />
                    </StudyParticipantContext.Provider>
                </DataGridContext.Provider>
            </StudyResearcherContext.Provider>
        );
        const firstCheckbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(firstCheckbox);
        expect(firstCheckbox).toBeChecked();
    });

    it('shows the correct email for each participant', () => {
        render(
            <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
                <DataGridContext.Provider value={mockDataGridContext}>
                    <StudyParticipantContext.Provider value={studyParticipantContext}>
                        <GiftList type="gift" open={true} onClose={jest.fn()} />
                    </StudyParticipantContext.Provider>
                </DataGridContext.Provider>
            </StudyResearcherContext.Provider>
        );
        studyParticipantContext.studyParticipants.forEach(participant => {
            expect(screen.getByText(participant.participantInfo.email)).toBeInTheDocument();
        });
    });
});
