import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import STooltip, { STooltipProps } from '../components/STooltip';
import SButton from '../components/SButton';

const meta = {
	title: 'STooltip',
	component: STooltip,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		children: 'tooltip content',
	},
} satisfies Meta<typeof STooltip>;

export default meta;

type Story = StoryObj<typeof STooltip>;

export const BottomTooltip: Story = {
	args: {
		label: 'Hover me!',
	},
	render: (args) => (
		<STooltip {...args}>
			<div>이것은 아래 툴팁입니다.</div>
			<div>이것은 아래 툴팁입니다.</div>
			<div>이것은 아래 툴팁입니다.</div>
		</STooltip>
	),
};

export const TopTooltip: Story = {
	args: {
		label: 'Hover me!',
		icon: 'HelpOutline_24',
		placement: 'top',
	},
	render: (args) => (
		<STooltip {...args}>
			<div>이것은 위쪽 툴팁입니다.</div>
			<div>이것은 위쪽 툴팁입니다.</div>
			<div>이것은 위쪽 툴팁입니다.</div>
		</STooltip>
	),
};

export const LeftTooltip: Story = {
	args: {
		label: 'Hover me!',
		buttonOptions: {
			outline: true,
		},
		color: 'positive',
		placement: 'left',
	},
	render: (args) => (
		<STooltip {...args}>
			<div>이것은 왼쪽 툴팁입니다.</div>
			<div>이것은 왼쪽 툴팁입니다.</div>
			<div>이것은 왼쪽 툴팁입니다.</div>
		</STooltip>
	),
};

export const RightTooltip: Story = {
	args: {
		className: 'text-positive',
		icon: 'Setting_24',
		placement: 'right',
	},
	render: (args) => (
		<STooltip {...args}>
			<div>이것은 오른쪽 툴팁입니다.</div>
			<div>이것은 오른쪽 툴팁입니다.</div>
			<div>이것은 오른쪽 툴팁입니다.</div>
		</STooltip>
	),
};

export const PopoverTooltip: Story = {
	args: {
		label: 'Click me!',
		buttonOptions: {
			outline: true,
		},
		color: 'secondary',
		usePopover: true,
	},
	render: (args) => (
		<STooltip {...args}>
			<STooltip.Title>title</STooltip.Title>
			<STooltip.Body>
				<div>이것은 아래쪽 툴팁입니다.</div>
				<div>이것은 아래쪽 툴팁입니다.</div>
				<div>이것은 아래쪽 툴팁입니다.</div>
			</STooltip.Body>
		</STooltip>
	),
};

export const PopoverButtonTooltip: Story = {
	args: {
		label: 'Click me!',
		buttonOptions: {
			outline: true,
		},
		color: 'secondary',
		placement: 'right',
		usePopover: true,
	},
	render: (args) => (
		<STooltip {...args}>
			<STooltip.Title>title</STooltip.Title>

			<STooltip.Body>
				이것은 아래쪽 툴팁입니다. 이것은 아래쪽 툴팁입니다. 이것은 아래쪽
				툴팁입니다.이것은 아래쪽 툴팁입니다.
			</STooltip.Body>
			<STooltip.Footer className='inline-flex w-full items-center justify-between'>
				<SButton label='button' /> <SButton label='button' />
			</STooltip.Footer>
		</STooltip>
	),
};

export const ValueTooltip: Story = {
	args: {
		label: 'Click me!',
		buttonOptions: {
			outline: true,
		},
		color: 'secondary',
		placement: 'right',
		usePopover: true,
		value: false,
	},
	render: (args: STooltipProps) => {
		const [showTooltip, setShowTooltip] = useState(args.value);

		return (
			<div className='inline-flex items-center'>
				<SButton
					label='show hide tooltip'
					onClick={() => setShowTooltip(!showTooltip)}
				/>

				<STooltip
					{...args}
					value={showTooltip}
				>
					<STooltip.Title>title</STooltip.Title>

					<STooltip.Body>
						이것은 아래쪽 툴팁입니다. 이것은 아래쪽 툴팁입니다. 이것은 아래쪽
						툴팁입니다.이것은 아래쪽 툴팁입니다.
					</STooltip.Body>
					<STooltip.Footer className='inline-flex w-full items-center justify-between'>
						<SButton label='button' /> <SButton label='button' />
					</STooltip.Footer>
				</STooltip>
			</div>
		);
	},
};
