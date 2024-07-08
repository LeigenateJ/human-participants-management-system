import React from 'react';
import { render, screen} from '@testing-library/react';
import ParticipantsTable from '../StudyParticipantTable';
import '@testing-library/jest-dom/extend-expect';
import { StudyResearcherContext } from '../../../providers/StudyResearcherContextProvider';
import { StudyParticipantContext } from '../../../providers/StudyPaticipantsProvider';
import { DataGridContext } from '../../../providers/DataGridProvider';
import { studyParticipantContext, studyResearcherContext_study01, mockDataGridContext } from '../../../providers/__test__/providerTestData';

describe('StudyParticipantTable Component', () => {

    it('renders without crashing', () => {
        render(
            <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
                <DataGridContext.Provider value={mockDataGridContext}>
                    <StudyParticipantContext.Provider value={studyParticipantContext}>
                        <ParticipantsTable />
                    </StudyParticipantContext.Provider>
                </DataGridContext.Provider>
            </StudyResearcherContext.Provider>
        );
        expect(screen.getByText('Serial No.')).toBeInTheDocument();
    });

    it('displays the correct number of participants', () => {
        render(
            <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
                <DataGridContext.Provider value={mockDataGridContext}>
                    <StudyParticipantContext.Provider value={studyParticipantContext}>
                        <ParticipantsTable />
                    </StudyParticipantContext.Provider>
                </DataGridContext.Provider>
            </StudyResearcherContext.Provider>
        );
        const displayedRows = screen.getAllByRole('row');
        console.log(displayedRows[0].outerHTML)
        console.log(displayedRows[1].outerHTML)
        console.log(displayedRows[2].outerHTML)
        // Subtract 1 for the header row
        expect(displayedRows.length - 1).toBe(3);
    });

    it('opens the sub functional toolbar', () => {
        render(
            <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
                <DataGridContext.Provider value={mockDataGridContext}>
                    <StudyParticipantContext.Provider value={studyParticipantContext}>
                        <ParticipantsTable />
                    </StudyParticipantContext.Provider>
                </DataGridContext.Provider>
            </StudyResearcherContext.Provider>
        );
        expect(screen.getByText('Toggle Selected Rows')).toBeInTheDocument();
        expect(screen.getByText('Add Tag to Selected Rows')).toBeInTheDocument();
        expect(screen.getByText('Delete Tag from Selected Rows')).toBeInTheDocument();
        expect(screen.getByText('Delete Selected Participants')).toBeInTheDocument();
    });

    it('shows the correct email for each participant', async () => {
        const {getByText} = render(
            <div style={{ width: '1000px', height: '600px' }}>
            <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
                <DataGridContext.Provider value={mockDataGridContext}>
                    <StudyParticipantContext.Provider value={studyParticipantContext}>
                        <ParticipantsTable />
                    </StudyParticipantContext.Provider>
                </DataGridContext.Provider>
            </StudyResearcherContext.Provider>
            </div>
        );
        expect(getByText('Study001-1')).toBeInTheDocument();
        expect(getByText('David Anderson')).toBeInTheDocument();
        expect(getByText('Study001-2')).toBeInTheDocument();
        expect(getByText('William Williams')).toBeInTheDocument();
    });

});
