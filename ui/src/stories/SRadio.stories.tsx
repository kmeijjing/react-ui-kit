import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'storybook/internal/preview-api';
import SRadio, { SRadioProps } from '../components/SRadio';

const meta = {
	title: 'SRadio',
	component: SRadio,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
	},
	args: { onChange: fn() },
} satisfies Meta<typeof SRadio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'radio',
		name: 'radio',
		value: 'option 1',
		checked: 'option 1',
	},
	render: function Render(args: SRadioProps) {
		const items = [
			{ label: 'item1', value: 'item1', disabled: false },
			{ label: 'item2', value: 'item2', disabled: false },
			{ label: 'item3', value: 'item3', disabled: false },
		];
		const [selectedValue, setSelectedValue] = useState<string | number>('item3');

		const handleRadioChange = (checked: string | number) => {
			setSelectedValue(checked);
		};

		return (
			<>
				{items.map((item) => (
					<SRadio
						{...args}
						key={item.value}
						name='item'
						label={item.label}
						value={item.value}
						disabled={item.disabled}
						checked={selectedValue}
						className='mx-2 my-1'
						onChange={handleRadioChange}
					/>
				))}
			</>
		);
	},
};

export const UnChecked: Story = {
	args: {
		label: 'radio',
		name: 'radio',
		value: 'option 2',
		checked: 'option 1',
	},
};

export const CheckedAndDisabled: Story = {
	args: {
		label: 'radio disabled',
		name: 'radio disabled',
		value: 'option 1',
		checked: 'option 1',
		disabled: true,
	},
};

export const UnCheckedAndDisabled: Story = {
	args: {
		label: 'radio disabled',
		name: 'radio disabled',
		value: 'option 1',
		checked: 'option 2',
		disabled: true,
	},
};
