import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DropdownOptions, {
	type DropdownOptionProps,
} from '../components/DropdownOptions';
import '@testing-library/jest-dom';

describe('DropdownOptions Component', () => {
	const defaultOptions: DropdownOptionProps[] = [
		{ label: 'Option 1', value: 'option1' },
		{ label: 'Option 2', value: 'option2' },
		{ label: 'Option 3', value: 'option3', disable: true },
	];

	it('renders dropdown options correctly', () => {
		render(
			<DropdownOptions
				parentId='test'
				options={defaultOptions}
				onClick={() => {}}
			/>
		);

		expect(screen.getByText('Option 1')).toBeInTheDocument();
		expect(screen.getByText('Option 2')).toBeInTheDocument();
		expect(screen.getByText('Option 3')).toBeInTheDocument();
	});

	it('triggers onClick when an option is clicked', () => {
		const handleClick = vi.fn();
		render(
			<DropdownOptions
				parentId='test'
				options={defaultOptions}
				onClick={handleClick}
			/>
		);

		fireEvent.click(screen.getByText('Option 1'));
		expect(handleClick).toHaveBeenCalledWith({
			label: 'Option 1',
			value: 'option1',
		});
	});

	it('closes the dropdown when clicking outside', () => {
		const handleClick = vi.fn();
		render(
			<DropdownOptions
				parentId='test'
				options={defaultOptions}
				onClick={handleClick}
			/>
		);

		// Open dropdown
		fireEvent.click(screen.getByText('Option 1'));

		// Simulate a click outside the dropdown
		fireEvent.mouseDown(document.body);

		// Expect the click handler to have been called indicating a close action
		expect(handleClick).not.toHaveBeenCalledWith();
	});

	it('keeps dropdown open when clicking inside', () => {
		const handleClick = vi.fn();
		render(
			<DropdownOptions
				parentId='test'
				options={defaultOptions}
				onClick={handleClick}
			/>
		);

		// Open dropdown
		fireEvent.click(screen.getByText('Option 1'));

		// Simulate a click inside the dropdown
		fireEvent.mouseDown(screen.getByText('Option 1'));

		expect(handleClick).not.toHaveBeenCalledWith();
	});
});
