import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SSelectCheckbox from '../components/SSelectCheckbox';
import { DropdownOptionProps } from '../components/DropdownOptionsWithCheckbox';
import React from 'react';
import '@testing-library/jest-dom';

const mockOptions: DropdownOptionProps[] = [
	{ label: 'Option 1', value: 1 },
	{ label: 'Option 2', value: 2 },
	{ label: 'Option 3', value: 3 },
];

const mockOnChange = vi.fn();

describe('SSelectCheckbox', () => {
	beforeEach(() => {
		cleanup();
	});

	it('renders correctly with options', () => {
		render(
			<SSelectCheckbox
				options={mockOptions}
				value={[]}
				onChange={mockOnChange}
			/>
		);

		// Check if the options are displayed
		expect(screen.getByText('선택')).toBeInTheDocument(); // Placeholder
	});

	it('opens and closes the dropdown when clicked', async () => {
		render(
			<SSelectCheckbox
				options={mockOptions}
				value={[]}
				onChange={mockOnChange}
			/>
		);

		// Initially, the dropdown should be closed
		const dropdown = screen.queryByRole('option-list');
		expect(dropdown).toBeNull();

		// Click to open the dropdown
		const select = screen.getByTestId('s-select-checkbox');
		fireEvent.click(select);

		// Check if the dropdown opens
		expect(await screen.findByRole('option-list')).toBeInTheDocument();

		// Click again to close the dropdown
		fireEvent.click(select);

		// Check if the dropdown closes
		expect(screen.queryByRole('option-list')).toBeNull();
	});

	it('selects and unselects options correctly', async () => {
		render(
			<SSelectCheckbox
				options={mockOptions}
				value={[]}
				onChange={mockOnChange}
			/>
		);

		// Open dropdown
		const select = screen.getByTestId('s-select-checkbox');
		fireEvent.click(select);

		// Click on Option 1 (now you should be able to find the options inside a listbox)
		fireEvent.click(screen.getByRole('option', { name: 'Option 1' }));
		expect(mockOnChange).toHaveBeenCalledWith([{ label: 'Option 1', value: 1 }]);

		// Click again to unselect Option 1
		fireEvent.click(screen.getByRole('option', { name: 'Option 1' }));
		expect(mockOnChange).toHaveBeenCalledWith([]);
	});

	it('does not allow interaction when disabled', async () => {
		render(
			<SSelectCheckbox
				options={mockOptions}
				value={[]}
				onChange={mockOnChange}
				disabled={true}
			/>
		);

		// The dropdown should not open when clicked
		const select = screen.getByTestId('s-select-checkbox');
		fireEvent.click(select);

		// The dropdown should not open
		expect(screen.queryByRole('option-list')).toBeNull();

		// Check if the disabled state works correctly
		expect(select).toHaveClass('cursor-not-allowed');
	});
});
