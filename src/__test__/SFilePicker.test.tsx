import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import SFilePicker from '../components/SFilePicker';

describe('SFilePicker', () => {
	it('renders with default placeholder', () => {
		render(<SFilePicker />);
		expect(screen.getByText('파일을 선택해주세요.')).toBeInTheDocument();
	});

	it('calls onChange when a file is selected', () => {
		const handleChange = vi.fn();
		render(<SFilePicker onChange={handleChange} />);

		const input = screen.getByTitle('file picker') as HTMLInputElement;
		const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });

		// fireEvent.change 사용 시, target.files를 직접 설정할 수 없기 때문에 mock 처리
		Object.defineProperty(input, 'files', {
			value: [file],
			writable: false,
		});

		fireEvent.change(input);
		expect(handleChange).toHaveBeenCalledWith(file);
	});

	it('clears file when clearable button is clicked', () => {
		const handleChange = vi.fn();
		render(
			<SFilePicker
				onChange={handleChange}
				clearable
			/>
		);

		const input = screen.getByTitle('file picker') as HTMLInputElement;
		const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });

		Object.defineProperty(input, 'files', {
			value: [file],
			writable: false,
		});

		fireEvent.change(input);
		expect(handleChange).toHaveBeenCalledWith(file);

		const clearButton = screen.getByTitle('clearable');
		fireEvent.click(clearButton);

		expect(handleChange).toHaveBeenCalledWith(null);
	});

	it('does not allow file selection when disabled', () => {
		const handleChange = vi.fn();
		render(
			<SFilePicker
				onChange={handleChange}
				disabled
			/>
		);
		const filePicker = screen.getByTestId('s-file-picker');
		fireEvent.click(filePicker);

		expect(handleChange).toHaveBeenCalledWith(null);
	});
});
