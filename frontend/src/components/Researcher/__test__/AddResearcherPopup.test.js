import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddResearcherPopup from '../AddResearcherPopup';
import { StudyResearcherContext } from '../../../providers/StudyResearcherContextProvider';

// Mock the context to simulate added functionality
const mockAddResearcher = jest.fn();
const mockStudyInfo = {}; // Populate with mock studyInfo if needed

describe('<AddResearcherPopup />', () => {

beforeEach(() => {
    render(
        <StudyResearcherContext.Provider value={{ studyInfo: mockStudyInfo, addResearcher: mockAddResearcher }}>
        <AddResearcherPopup />
        </StudyResearcherContext.Provider>
    );
});

it('renders without crashing', () => {
    screen.getByText('Add New Researcher');
});

it('opens the dialog', () => {
    fireEvent.click(screen.getByText('Add New Researcher'));
    expect(screen.getByText('Add New Reseracher to the System')).toBeInTheDocument();
});
it('displays input fields when dialog is opened', () => {
    const {getAllByText} = render(<AddResearcherPopup />);
    const allAddResearchersButtons = getAllByText("Add New Researcher");    
    fireEvent.click(allAddResearchersButtons[0]);

    expect(screen.getByTestId('First Name')).toBeInTheDocument();
    expect(screen.getByTestId('Last Name')).toBeInTheDocument();
    expect(screen.getByTestId('Email Address')).toBeInTheDocument();
});


it('validates input fields and triggers the addResearcher', async () => {
    fireEvent.click(screen.getByText('Add New Researcher'));
    
    fireEvent.change(screen.getByTestId('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('Email Address'), { target: { value: 'johndoe@example.com' } });

    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
        expect(mockAddResearcher).toHaveBeenCalledWith({
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
        });
    });
});

});
