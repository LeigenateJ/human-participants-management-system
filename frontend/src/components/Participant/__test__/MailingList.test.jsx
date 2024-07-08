import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MailingList from '../MailingList';
import '@testing-library/jest-dom/extend-expect';
import { StudyParticipantContext } from '../../../providers/StudyPaticipantsProvider';
import { studyParticipantContext} from '../../../providers/__test__/providerTestData';

describe('MailingList Component', () => {
    it('renders without crashing', () => {
        render(
            <StudyParticipantContext.Provider value={studyParticipantContext}>
                <MailingList context={StudyParticipantContext} open={true} onClose={jest.fn()} />
            </StudyParticipantContext.Provider>
        );
    });

    it('shows empty mailing list message when no participants are selected', () => {
        const { getByText } = render(
            <StudyParticipantContext.Provider value={studyParticipantContext}>
                <MailingList context={StudyParticipantContext} open={true} onClose={jest.fn()} />
            </StudyParticipantContext.Provider>
        );
        expect(getByText('Mailing list is empty. Select participants to get their mailing list.')).toBeInTheDocument();
    });

    it('shows emails of selected participants', () => {
        const selectedRows = ['000000000000000000000051', '000000000000000000000052'];
        const { getByText } = render(
            <StudyParticipantContext.Provider value={studyParticipantContext}>
                <MailingList context={StudyParticipantContext} selectedRows={selectedRows} open={true} onClose={jest.fn()} />
            </StudyParticipantContext.Provider>
        );
        expect(getByText('david_anderson@sample.org, william_williams@mailbox.org')).toBeInTheDocument();
    });

    it('closes the dialog when Close button is clicked', () => {
        const onCloseMock = jest.fn();
        render(
            <StudyParticipantContext.Provider value={studyParticipantContext}>
                <MailingList context={StudyParticipantContext} open={true} onClose={onCloseMock} />
            </StudyParticipantContext.Provider>
        );
        fireEvent.click(screen.getByText('Close'));
        expect(onCloseMock).toHaveBeenCalled();
    });
});
