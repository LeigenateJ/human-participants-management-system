import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SessionMailingList from '../SessionMailingList';
import '@testing-library/jest-dom/extend-expect';

const studyParticipants = [
    {
      _id: "000000000000000000000051",
      studyId: '000000000000000000000011',
      serialNum: 1,
      isActive: true,
      isComplete: false,
      isGift: false,
      isSentGift: false,
      isWIllReceiveReport: false,
      isSentReport: false,
      note: "",
      participantInfo: {
          _id: "000000000000000000000031",
          firstName: "David",
          lastName: "Anderson",
          email: "david_anderson@sample.org",
          phoneNum: "+00 379 158 265",
          isWillContact: true,
          tag: [
              "000000000000000000000041"
          ],
          tagsInfo: [
              "Student"
          ]
      }
  },
];

beforeEach(() => {

    return { getByText, queryByText, getByRole, queryByRole } = render(

        <SessionMailingList participants={studyParticipants}/>

        );
});

describe('SessionMailingList Component', () => {

    it('renders "Mailing List" button', () => {

        const mailingListButton = getByText('Mailing List');
        expect(mailingListButton).toBeInTheDocument();

    });

    it('opens and closes the dialog when clicked',async () => {

        const mailingListButton = getByText('Mailing List');
        fireEvent.click(mailingListButton);

        expect(getByRole('dialog', {name: 'Mailing List'})).toBeInTheDocument();
        expect(getByText('david_anderson@sample.org')).toBeInTheDocument();

        const closeButton = getByRole('button', { name: 'Close'});
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);

        await waitFor(() => {
            expect(queryByRole('dialog', {name: 'Mailing List'})).toBeNull();
        })
    });

})