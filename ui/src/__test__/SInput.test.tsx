import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SInput, { SInputProps, Rule } from '../components/SInput';

const mockRules: Rule[] = [
	{
		message: '3글자 이상 입력해주세요.',
		validate: (value: string) => value.length >= 3,
	},
];

describe('SInput', () => {
	const setup = (props: Partial<SInputProps> = {}) => {
		const defaultProps: SInputProps = {
			value: '',
			placeholder: '키워드를 입력해주세요.',
			onChange: vi.fn(),
			onBlur: vi.fn(),
			...props,
		};
		return render(<SInput {...defaultProps} />);
	};

	it('renders the input with initial value', () => {
		setup({ value: 'Hello' });

		const input = screen.getByRole('textbox');
		expect(input).toBeInTheDocument();
		expect(input).toHaveValue('Hello');
	});

	it('calls onChange when input value changes', () => {
		const onChangeMock = vi.fn();
		setup({ value: '', onChange: onChangeMock });

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'New value' } });

		// ChangeEvent 호출 확인
		expect(onChangeMock).toHaveBeenCalledTimes(1);
		expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object));
	});

	it('validates input based on rules', () => {
		setup({ value: '', rules: mockRules });

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'Hi' } });
		fireEvent.blur(input);

		expect(screen.getByText('3글자 이상 입력해주세요.')).toBeInTheDocument();

		fireEvent.change(input, { target: { value: 'Hello' } });
		fireEvent.blur(input);

		expect(
			screen.queryByText('3글자 이상 입력해주세요.')
		).not.toBeInTheDocument();
	});

	it('toggles password visibility when the icon is clicked', async () => {
		setup({ type: 'password', value: 'secret', label: 'password' });

		screen.debug();

		const input = screen.getByLabelText('password');
		const toggleButton = screen.getByTestId('password-visible-button');

		// 초기 상태는 비밀번호 숨김 상태
		expect(input).toHaveAttribute('type', 'password');

		// 아이콘 클릭으로 비밀번호 보임 상태로 전환
		fireEvent.click(toggleButton);
		setTimeout(() => {
			expect(input).toHaveAttribute('type', 'text');
		}, 100);

		// 다시 클릭으로 비밀번호 숨김 상태로 복귀
		fireEvent.click(toggleButton);
		expect(input).toHaveAttribute('type', 'password');
	});
});
