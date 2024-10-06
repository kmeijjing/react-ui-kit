import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import STooltip from '../components/STooltip'; // STooltip 컴포넌트의 경로

describe('STooltip', () => {
	it('renders the button and tooltip correctly', () => {
		render(
			<STooltip
				label='Tooltip Button'
				icon='HelpOutline_24'
				placement='top'
			>
				<STooltip.Body>Tooltip Content</STooltip.Body>
			</STooltip>
		);

		const button = screen.getByRole('button', { name: /Tooltip Button/i });
		expect(button).toBeInTheDocument();
	});

	it('show tooltip on hover', async () => {
		render(
			<STooltip
				label='Tooltip Button'
				icon='Info'
				placement='top'
			>
				<STooltip.Body>Tooltip Content</STooltip.Body>
			</STooltip>
		);

		const button = screen.getByRole('button', { name: /Tooltip Button/i });

		// 마우스 오버 이벤트를 발생시켜 툴팁을 보여줍니다.
		fireEvent.mouseOver(button);

		const tooltip = await waitFor(() => screen.getByText(/Tooltip Content/i));
		expect(tooltip).toBeInTheDocument();
	});

	it('hide tooltip on mouse leave', async () => {
		render(
			<STooltip
				label='Tooltip Button'
				icon='Info'
				placement='top'
			>
				<STooltip.Body>Tooltip Content</STooltip.Body>
			</STooltip>
		);

		const button = screen.getByRole('button', { name: /Tooltip Button/i });

		// 마우스 오버 이벤트를 발생시켜 툴팁을 보여줍니다.
		fireEvent.mouseOver(button);
		const tooltip = await waitFor(() => screen.getByText(/Tooltip Content/i));
		expect(tooltip).toBeInTheDocument();

		// 마우스가 버튼에서 떠날 때 툴팁이 사라지는지 확인합니다.
		fireEvent.mouseLeave(button);
		await waitFor(() => expect(tooltip).not.toBeInTheDocument());
	});

	it('show and hide tooltip with value prop', async () => {
		const { rerender } = render(
			<STooltip
				label='Tooltip Button'
				icon='Info'
				value={true}
			>
				<STooltip.Body>Tooltip Content</STooltip.Body>
			</STooltip>
		);

		// 'value' prop에 따라 툴팁이 표시되는지 확인합니다.
		const tooltip = await waitFor(() => screen.getByText(/Tooltip Content/i));
		expect(tooltip).toBeInTheDocument();

		// prop을 false로 변경하면 툴팁이 사라짐
		rerender(
			<STooltip
				label='Tooltip Button'
				icon='Info'
				value={false}
			>
				<STooltip.Body>Tooltip Content</STooltip.Body>
			</STooltip>
		);
		await waitFor(() => expect(tooltip).not.toBeInTheDocument());
	});

	it('closes tooltip when the close button is clicked in popover mode', async () => {
		render(
			<STooltip
				label='Tooltip Button'
				icon='Info'
				usePopover
			>
				<STooltip.Body>Popover Content</STooltip.Body>
			</STooltip>
		);

		const button = screen.getByRole('button', { name: /Tooltip Button/i });

		// 툴팁 버튼 클릭 시 툴팁이 나타나는지 확인
		fireEvent.click(button);
		const tooltip = await waitFor(() =>
			screen.getByText((content) => content === 'Popover Content')
		);
		expect(tooltip).toBeInTheDocument();

		// 툴팁 내부의 닫기 버튼 클릭
		const closeButton = screen.getByTestId('close-btn');
		fireEvent.click(closeButton);

		// 닫기 버튼을 클릭하면 툴팁이 사라지는지 확인
		await waitFor(() => expect(tooltip).not.toBeInTheDocument());
	});
});
