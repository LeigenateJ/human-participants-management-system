import React from 'react';
import { render, fireEvent, waitFor, getByLabelText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResearcherManagePopup from '../ResearcherManagePopup';
import { StudyResearcherContext } from '../../../providers/StudyResearcherContextProvider';



jest.mock('../../../providers/StudyResearcherContextProvider');
jest.mock('../../../utils/request');
jest.mock('../../Popup/OptionPopup', () => (props) => <div data-testid="mockOptionPopup">{props.children}</div>);
jest.mock('../../Popup/MsgPopup', () => (props) => <div data-testid="mockMsgPopup">{props.children}</div>);
jest.mock('../AddResearcherPopup', () => () => <div data-testid="mockAddResearcherPopup"></div>);

// const mockedRequestFunction = jest.fn();
    
describe('ResearcherManagePopup Component', () => {
    let getByText, getByTestId, queryByTestId;
    let mockedRequestFunction = jest.fn()

    beforeEach(() => {
        ({ getByText, getByTestId, queryByTestId } = render(<ResearcherManagePopup />));
    });

    it('renders the "Manage Researchers" button', () => {
        const button = getByText('Manage Researchers');
        expect(button).toBeInTheDocument();
    });


    it('opens the dialog and displays the researcher list', () => {
        const button = getByText('Manage Researchers');
        fireEvent.click(button);

        expect(getByText('Current Reseracher for this Study')).toBeInTheDocument();
        expect(getByTestId('mockAddResearcherPopup')).toBeInTheDocument();
    });

    it('opens and closes the dialog', async() => {
        const { getByRole, getAllByText, queryByRole } = render(<ResearcherManagePopup />);
    
        //Click the "Manage Researchers" button to open the dialog.

        const allManageResearchersButtons = getAllByText("Manage Researchers");
        fireEvent.click(allManageResearchersButtons[0]); // Click the first "Manage Researchers" button
        expect(queryByRole('dialog')).toBeInTheDocument();
    
        // Close the dialog
        fireEvent.click(getByTestId('close-button'));
        await waitFor(() => expect(queryByRole('dialog')).not.toBeInTheDocument());
    });
});