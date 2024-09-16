import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SChip from '../components/SChip';
import '@testing-library/jest-dom';

describe('SChip', () => {
	it('renders chip with children content', () => {
		render(<SChip value={true}>Test Chip</SChip>);
		const chipElement = screen.getByText('Test Chip');
		expect(chipElement).toBeInTheDocument();
	});

	it('renders chip with input when useInput is true', () => {
		render(
			<SChip
				value={true}
				useInput
				inputValue='Use Input Chip'
			/>
		);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toHaveTextContent('Use Input Chip');
	});

	it('calls onInput when input value is changed', () => {
		const onInputMock = vi.fn();
		render(
			<SChip
				value={true}
				useInput
				inputValue='Initial'
				onInput={onInputMock}
			/>
		);

		const inputElement = screen.getByRole('textbox');
		fireEvent.input(inputElement, {
			target: { textContent: 'Updated' },
		});

		expect(onInputMock).toHaveBeenCalledWith('Updated');
	});

	it('calls onRemove when removable and close icon is clicked', () => {
		const onRemoveMock = vi.fn();
		render(
			<SChip
				value={true}
				removable
				onRemove={onRemoveMock}
			>
				Removable Chip
			</SChip>
		);

		const removeIcon = screen.getByTestId('close-btn');
		fireEvent.click(removeIcon);
		expect(onRemoveMock).toHaveBeenCalled();
	});

	it('chip becomes invisible after remove icon is clicked', () => {
		render(
			<SChip
				value={true}
				removable
			>
				Removable Chip
			</SChip>
		);

		const removeIcon = screen.getByTestId('close-btn');
		fireEvent.click(removeIcon);
		expect(screen.queryByText('Removable Chip')).not.toBeInTheDocument();
	});

	it('handles Enter key and removes focus on input', () => {
		render(
			<SChip
				value={true}
				useInput
				inputValue='Test'
			/>
		);

		const inputElement = screen.getByRole('textbox');
		fireEvent.keyDown(inputElement, { key: 'Enter' });

		expect(inputElement).not.toHaveFocus();
	});

	it('applies correct class for rounded prop', () => {
		render(
			<SChip
				value={true}
				rounded
			>
				Rounded Chip
			</SChip>
		);
		const chipElement = screen.getByText('Rounded Chip');
		expect(chipElement).toHaveClass('rounded-14');
	});

	it('applies correct class for clickable prop', () => {
		render(
			<SChip
				value={true}
				clickable
			>
				Clickable Chip
			</SChip>
		);
		const chipElement = screen.getByText('Clickable Chip');
		expect(chipElement).toHaveClass('cursor-pointer');
	});

	it('does not render chip when value is false', () => {
		render(<SChip value={false}>Invisible Chip</SChip>);
		expect(screen.queryByText('Invisible Chip')).not.toBeInTheDocument();
	});
});
