import React, { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import SCheckbox from '../components/SCheckbox';

describe('SCheckbox', () => {
	it('should render with a label', () => {
		const { getByText } = render(
			<SCheckbox
				label='Test Label'
				checked={false}
			/>
		);
		expect(getByText('Test Label')).toBeInTheDocument();
	});

	it('should handle boolean checked state correctly', () => {
		const handleChange = vi.fn();
		const { getByRole } = render(
			<SCheckbox
				label='Test Checkbox'
				checked={false}
				onChange={handleChange}
			/>
		);
		const checkbox = getByRole('checkbox');

		// Initial state is unchecked
		expect(checkbox).not.toBeChecked();

		// Simulate click the checkbox
		fireEvent.click(checkbox);
		expect(handleChange).toHaveBeenCalledWith(true);
		expect(checkbox).toBeChecked();
	});

	it('should handle array checked state correctly', () => {
		const handleChange = vi.fn();
		const { getByRole } = render(
			<SCheckbox
				label='Test Checkbox'
				checked={['item1']}
				val='item2'
				onChange={handleChange}
			/>
		);
		const checkbox = getByRole('checkbox');

		// Initial state is unchecked because 'item2' is not in the array
		expect(checkbox).not.toBeChecked();

		// Simulate click the checkbox
		fireEvent.click(checkbox);
		expect(handleChange).toHaveBeenCalledWith(['item1', 'item2']);
		expect(checkbox).toBeChecked();
	});

	it('should handle disabling correctly', () => {
		const handleChange = vi.fn();
		const { getByRole } = render(
			<SCheckbox
				label='Test Checkbox'
				checked={false}
				disabled={true}
				onChange={handleChange}
			/>
		);
		const checkbox = getByRole('checkbox');

		// Checkbox should be disabled
		expect(checkbox).toBeDisabled();

		// Simulate click the checkbox
		fireEvent.click(checkbox);
		expect(handleChange).not.toHaveBeenCalled();
	});

	it('should update state when checked prop changes', () => {
		const { getByRole, rerender } = render(
			<SCheckbox
				label='Test Checkbox'
				checked={false}
				val='item1'
			/>
		);
		const checkbox = getByRole('checkbox');

		// Initially unchecked
		expect(checkbox).not.toBeChecked();

		// Rerender with checked set to true
		rerender(
			<SCheckbox
				label='Test Checkbox'
				checked={['item1']}
				val='item1'
			/>
		);
		expect(checkbox).toBeChecked();
	});
});
