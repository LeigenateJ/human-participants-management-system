import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditStudyTemplate from '../EditStudyTemplate';
import userEvent from '@testing-library/user-event';


jest.mock('../../Popup/OptionPopup', () => () => <div>OptionPopup</div>);
jest.mock('../../Common/Navbar', () => () => <div>Navbar</div>);
jest.mock('../../../hooks/useCurrentUser', () => ({
    useCurrentUser: jest.fn(() => ({ user: { userId: '64fe98fdae1ff28bdcd455a7' } })),
}));



describe('EditStudyTemplate', () => {

    let mockSetStudyData;
    let mockHandleSubmit;

    const initialStudyData = {
        studyCode: 'Study101',
        studyName: 'A Study about Test',
        description: 'Yes',
        creator: 'mockUserId',
        researcherList: ['mockUserId'],
        studyType: 'interview',
        isAnonymous: true,
        anonymousParticipantNum: '50',
        participantNum: '100',
        recruitmentStartDate: '2022-11-11T00:00:00.000Z',
        recruitmentCloseDate: '2023-09-11T00:00:00.000Z',
        location: [ "Room101" ],
        surveyLink: 'https://example.com/survey001',
        driveLink: 'https://drive.google.com/drive/folders/1234567890',
        isClosed: false
    };
    
    
    beforeEach(() => {
        mockSetStudyData = jest.fn();
        mockHandleSubmit = jest.fn();
        render(
            <MemoryRouter initialEntries={['/studyDetail']}>
                <EditStudyTemplate 
                    isEditMode={true}
                    studyData={initialStudyData}
                    setStudyData={mockSetStudyData}
                    handleSubmit={mockHandleSubmit}
                />
            </MemoryRouter>
        );
    });
        // You can now add your individual test cases, similar to what we discussed before
    it('renders the EditStudyTemplate component', () => {
        // Sample test to check the presence of a text field
        const studyNameField = screen.getByLabelText(/Study Name/i);
        expect(studyNameField).toBeInTheDocument();
    });

    it('should render the "Study Code" input', () => {
        const input = screen.getByLabelText(/Study Code/i);
        expect(input).toBeInTheDocument();
    });

    it('should render the "Is Your Study Anonymous?" label', () => {
        const label = screen.getByText(/Is Your Study Anonymous?/i);
        expect(label).toBeInTheDocument();
    });

    it('should render the study type dropdown', () => {
        const dropdown = screen.getByTestId('studyTypeInput');
        expect(dropdown).toBeInTheDocument();
    });

    it('should render the "Yes" radio option for anonymity', () => {
        const yesRadio = screen.getByLabelText(/Yes/i);
        expect(yesRadio).toBeInTheDocument();
    });

    it('should render the "Project Start Date" and "Project Close Date" inputs', () => {
        const startDate = screen.getByText(/Project Start Date/i);
        const closeDate = screen.getByText(/Project Close Date/i);
        expect(startDate).toBeInTheDocument();
        expect(closeDate).toBeInTheDocument();
    });


    it('should display a button to save the form', () => {
        const button = screen.getByText(/SAVE/i);
        expect(button).toBeInTheDocument();
    });

    it('should display an anonymous participants input when "Yes" is selected',async() => {
        const yesRadio = screen.getByLabelText(/Yes/i);
        fireEvent.click(yesRadio);
        const input = await screen.findByTestId("AnonymousParticipantInput");
        expect(input).toBeInTheDocument();
    });
});