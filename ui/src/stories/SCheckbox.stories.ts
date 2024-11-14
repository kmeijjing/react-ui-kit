import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SCheckbox from '../components/SCheckbox';

const meta = {
	title: 'SCheckbox',
	component: SCheckbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		checked: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
	args: { onChange: fn() },
} satisfies Meta<typeof SCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checked: Story = {
	args: {
		checked: true,
	},
};

export const Disabled: Story = {
	args: {
		checked: false,
		disabled: true,
	},
};

export const Indeterminate: Story = {
	args: {
		checked: null,
	},
};

export const CheckedAndDisabled: Story = {
	args: {
		checked: true,
		disabled: true,
	},
};

export const Array: Story = {
	args: {
		checked: ['사자', '호랑이', '코끼리'],
		value: '코끼리',
		label: '코끼리',
	},
};
