import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EmailInputComponent from '../EmailInputComponent';
import { DataGridContext } from '../../../providers/DataGridProvider';
import '@testing-library/jest-dom/extend-expect';

describe('EmailInputComponent', () => {
    const mockSetSelectedRows = jest.fn();
    const mockSetInputEmails = jest.fn();
    const mockSelectRowsByEmails = jest.fn();

    const mockContextValue = {
        selectRowsByEmails: mockSelectRowsByEmails,
    };

    const mockProps = {
        rows: [{ id: 1, email: 'test1@example.com' }, { id: 2, email: 'test2@example.com' }],
        setSelectedRows: mockSetSelectedRows,
        inputEmails: '',
        setInputEmails: mockSetInputEmails,
    };

    it('renders correctly', () => {
        const { getByLabelText, getByText } = render(
            <DataGridContext.Provider value={mockContextValue}>
                <EmailInputComponent {...mockProps} />
            </DataGridContext.Provider>
        );

        expect(getByLabelText('Input Emails')).toBeInTheDocument();
        expect(getByText('Find Rows')).toBeInTheDocument();
        expect(getByText('Clear')).toBeInTheDocument();
    });

    it('updates inputEmails on user input', () => {
        const { getByLabelText } = render(
            <DataGridContext.Provider value={mockContextValue}>
                <EmailInputComponent {...mockProps} />
            </DataGridContext.Provider>
        );

        const input = getByLabelText('Input Emails');
        fireEvent.change(input, { target: { value: 'test1@example.com' } });
        expect(mockSetInputEmails).toHaveBeenCalledWith('test1@example.com');
    });

    it('calls handleSetSelectedRowsByEmails on "Find Rows" button click', () => {
        const { getByText } = render(
            <DataGridContext.Provider value={mockContextValue}>
                <EmailInputComponent {...mockProps} />
            </DataGridContext.Provider>
        );

        fireEvent.click(getByText('Find Rows'));
        expect(mockSetSelectedRows).toHaveBeenCalled();
    });

    it('clears input and selected rows on "Clear" button click', () => {
        const { getByText } = render(
            <DataGridContext.Provider value={mockContextValue}>
                <EmailInputComponent {...mockProps} />
            </DataGridContext.Provider>
        );

        fireEvent.click(getByText('Clear'));
        expect(mockSetInputEmails).toHaveBeenCalledWith('');
        expect(mockSetSelectedRows).toHaveBeenCalledWith([]);
    });

    it('handles Enter key press', () => {
        const { getByLabelText } = render(
            <DataGridContext.Provider value={mockContextValue}>
                <EmailInputComponent {...mockProps} />
            </DataGridContext.Provider>
        );

        const input = getByLabelText('Input Emails');
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(mockSetSelectedRows).toHaveBeenCalled();
    });

    it('handles Escape key press', () => {
        const { getByLabelText } = render(
            <DataGridContext.Provider value={mockContextValue}>
                <EmailInputComponent {...mockProps} />
            </DataGridContext.Provider>
        );

        const input = getByLabelText('Input Emails');
        fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });
        expect(mockSetInputEmails).toHaveBeenCalledWith('');
        expect(mockSetSelectedRows).toHaveBeenCalledWith([]);
    });

});

