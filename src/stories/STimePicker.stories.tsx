import type { Meta, StoryObj } from '@storybook/react';
import STimePicker from '../components/STimePicker';

const meta = {
	title: 'STimePicker',
	component: STimePicker,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof STimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: '23:59',
	},
};

export const UseSeconds: Story = {
	args: {
		value: '23:59:59',
		useSeconds: true,
	},
};

export const Use24: Story = {
	args: {
		value: '23:59',
		use24: true,
	},
};

export const WithLabel: Story = {
	args: {
		value: '23:59',
		label: '시간',
	},
};

export const Disabled: Story = {
	args: {
		value: '23:59',
		disabled: true,
	},
};
