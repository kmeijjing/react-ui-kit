import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import STimePicker from '../components/STimePicker';

describe('STimePicker', () => {
	it('renders the component with default props', () => {
		render(<STimePicker value='23:30' />);

		waitFor(() => expect(screen.getByText('오후 11:30')).toBeInTheDocument());
	});

	it('increments and decrements time using arrow buttons', () => {
		render(
			<STimePicker
				value='12:30'
				use24
			/>
		);

		const timePicker = screen.getByTestId('s-time-picker');
		fireEvent.click(timePicker);

		// "시간" 증가 버튼 클릭
		const hourUpButton = screen.getByTitle('hour_up');
		fireEvent.click(hourUpButton);

		waitFor(() => expect(screen.getByText('13:30')).toBeInTheDocument());

		// "시간" 감소 버튼 클릭
		const hourDownButton = screen.getByTitle('hour_down');
		fireEvent.click(hourDownButton);

		waitFor(() => expect(screen.getByText('12:30')).toBeInTheDocument());
	});

	it('handles ArrowUp and ArrowDown keys', () => {
		render(<STimePicker value='10:30' />);

		const timePicker = screen.getByTestId('s-time-picker');
		fireEvent.click(timePicker);

		const hourInput = screen.getByTitle('hour-input');
		fireEvent.click(hourInput);

		// 키보드 ArrowUp (시간 증가)
		fireEvent.keyDown(timePicker, { key: 'ArrowUp' });

		waitFor(() => expect(screen.getByText('오전 11:30')).toBeInTheDocument());

		// 키보드 ArrowDown (시간 감소)
		fireEvent.keyDown(timePicker, { key: 'ArrowDown' });
		waitFor(() => expect(screen.getByText('오전 10:30')).toBeInTheDocument());
	});

	it('toggles AM/PM when clicking the period button', () => {
		render(<STimePicker value='11:30' />);

		const timePicker = screen.getByTestId('s-time-picker');
		fireEvent.click(timePicker);

		const pmButton = screen.getByText('오후');
		fireEvent.click(pmButton);

		waitFor(() => expect(screen.getByText('오후 11:30')).toBeInTheDocument());
	});

	it('does not allow editing in disabled mode', () => {
		const handleChange = vi.fn();
		render(
			<STimePicker
				value='12:30'
				onChange={handleChange}
				disabled
			/>
		);

		const timePicker = screen.getByTestId('s-time-picker');
		fireEvent.click(timePicker);

		expect(handleChange).not.toHaveBeenCalled();
	});
});
