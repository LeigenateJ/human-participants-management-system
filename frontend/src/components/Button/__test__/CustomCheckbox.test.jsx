import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CustomCheckbox from '../CustomCheckbox';

describe('<CustomCheckbox />', () => {
    it('should display unchecked icon by default', () => {
        render(<CustomCheckbox />);
        
        // Check if the unchecked icon is displayed
        const uncheckedIcon = screen.getByTestId('unchecked-icon');
        expect(uncheckedIcon).not.toBeNull();;
    });

    it('should display checked icon when checked', () => {
        render(<CustomCheckbox />);
        
        // Simulate a click event to check the checkbox
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        // Verify that the checked icon is displayed
        const checkedIcon = screen.getByTestId('checked-icon');
        expect(checkedIcon).not.toBeNull();
    });
});
