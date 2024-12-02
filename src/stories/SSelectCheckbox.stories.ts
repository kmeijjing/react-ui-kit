import type { Meta, StoryObj } from '@storybook/react';
import SSelectCheckbox from '../components/SSelectCheckbox';

const meta = {
	title: 'SSelectCheckbox',
	component: SSelectCheckbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof SSelectCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
	{ label: 'option 1', value: 1 },
	{ label: 'option 2', value: 2 },
	{ label: 'option 3', value: 3 },
	{ label: 'option 4', value: 4 },
	{ label: 'option 5', value: 5 },
	{ label: 'option 6', value: 6 },
	{ label: 'option 7', value: 7 },
	{ label: 'option 8', value: 8 },
	{ label: 'option 9', value: 9 },
	{ label: 'option 10', value: 10 },
	{ label: 'option 11', value: 11 },
	{ label: 'option 12', value: 12 },
];

const optionsWithDisable = [
	{ label: 'option 1', value: 1 },
	{ label: 'option 2', value: 2 },
	{ label: 'option 3', value: 3 },
	{ label: 'option 4', value: 4, disabled: true },
	{ label: 'option 5', value: 5 },
	{ label: 'option 6', value: 6 },
	{ label: 'option 7', value: 7 },
	{ label: 'option 8', value: 8, disabled: true },
	{ label: 'option 9', value: 9 },
	{ label: 'option 10', value: 10 },
	{ label: 'option 11', value: 11 },
	{ label: 'option 12', value: 12 },
];
export const DefaultSelect: Story = {
	args: {
		classname: 'w-150pxr',
		options,
	},
};

export const DisabledSelect: Story = {
	args: {
		classname: 'w-150pxr',
		options,
		disabled: true,
	},
};

export const SelectWithDisableItem: Story = {
	args: {
		classname: 'w-150pxr',
		options: optionsWithDisable,
	},
};
