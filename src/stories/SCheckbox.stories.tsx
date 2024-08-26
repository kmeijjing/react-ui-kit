import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SCheckbox from '../components/SCheckbox';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'SCheckbox',
	component: SCheckbox,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		label: { control: 'text' },
		checked: { control: 'select', options: [true, false, null] },
	},
	args: { onClick: fn() },
} satisfies Meta<typeof SCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'label',
		value: 'value',
		checked: false,
	},
};

export const Checked: Story = {
	args: {
		label: 'label',
		value: 'value',
		checked: true,
	},
};

export const Indeterminate: Story = {
 args: {
		label: 'label',
		value: 'value',
		checked: null,
	},
};

export const CheckedDisabled: Story = {
	args: {
		label: 'label',
		value: 'value',
		checked: true,
  disabled: true
	},
};

export const IndeterminateDisabled: Story = {
	args: {
		label: 'label',
		value: 'value',
		checked: null,
  disabled: true
	},
};

export const Disabled: Story = {
	args: {
		label: 'label',
		value: 'value',
		checked: false,
  disabled: true
	},
};