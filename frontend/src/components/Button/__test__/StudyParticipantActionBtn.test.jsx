import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import StudyParticipantActionBtn from '../StudyParticipantActionBtn';
import { DataGridContext } from '../../../providers/DataGridProvider';
import { StudyParticipantContext } from '../../../providers/StudyPaticipantsProvider';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { studyParticipantContext, studyResearcherContext_study01 } from '../../../providers/__test__/providerTestData';
import { StudyResearcherContext } from '../../../providers/StudyResearcherContextProvider';

describe('<StudyParticipantActionBtn />', () => {
    const mockDataGridContext = {
      selectRowsByEmails: false,
      setSelectRowsByEmails: jest.fn(),
      inputEmails: '',
      sortModel: [],
      filterModel: { items: [] },
      pageModel: {
          page: 0,
          pageSize: 100
      },
      columnVisibility: {
          note: false,
          delete: false
      }
    };
  
    const setup = () => {
        const utils = render(
        
            <div>
                <div data-testid="outside-element" style={{ marginBottom: '500px' }}>Outside Element</div>

                <StudyResearcherContext.Provider value={studyResearcherContext_study01}>
                    <DataGridContext.Provider value={mockDataGridContext}>
                        <StudyParticipantContext.Provider value={studyParticipantContext}>
                            <StudyParticipantActionBtn />
                        </StudyParticipantContext.Provider>
                    </DataGridContext.Provider>
                </StudyResearcherContext.Provider>
            </div>
        );
        const actionsButton = utils.getByText('Actions');
        const outsideElement = utils.getByTestId('outside-element');
        return {
          ...utils,
          actionsButton,
          outsideElement,
        };
      };
      

  it('should open the menu when the Actions button is clicked', () => {
    const { actionsButton, queryByRole } = setup();

    fireEvent.click(actionsButton);
    expect(queryByRole('menu')).toBeInTheDocument();
  });

  it('should open the Gift List modal when "Show Gift List" menu item is clicked', async () => {
    const { actionsButton, getByText } = setup();

    fireEvent.click(actionsButton);
    act(() => {
      fireEvent.click(getByText('Show Gift List'));
    });
    expect(getByText('Gift List')).toBeInTheDocument();
  });

  it('should close the Gift List modal when close button is clicked', async () => {
    const { actionsButton, getByText, queryByText } = setup();

    fireEvent.click(actionsButton);
    act(() => {
      fireEvent.click(getByText('Show Gift List'));
    });
    fireEvent.click(getByText('Close'));
    expect(queryByText('Gift List')).not.toBeInTheDocument();
  });

  it('should toggle the "Select Rows by Emails" when clicked', () => {
    const { actionsButton, getByText } = setup();

    fireEvent.click(actionsButton);
    fireEvent.click(getByText('Select Rows by Emails'));
    expect(mockDataGridContext.setSelectRowsByEmails).toHaveBeenCalledWith(true);
  });

  it('should open the FullScreen view when "View in FullScreen" menu item is clicked', async () => {
    const { actionsButton, getByText } = setup();

    fireEvent.click(actionsButton);
    act(() => {
      fireEvent.click(getByText('View in FullScreen'));
    });
    expect(getByText('Exit fullscreen')).toBeInTheDocument();
  });

  it('should close the FullScreen view when close button is clicked', async () => {
    const { actionsButton, getByText, queryByText } = setup();

    fireEvent.click(actionsButton);
    act(() => {
      fireEvent.click(getByText('View in FullScreen'));
    });
    fireEvent.click(getByText('Exit fullscreen'));
    expect(queryByText('FullScreen Modal Content')).not.toBeInTheDocument();
  });

});
