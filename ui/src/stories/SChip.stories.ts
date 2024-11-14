import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SChip, { SChipProps } from '../components/SChip';

// 스토리북 메타데이터

const meta = {
	title: 'SChip',
	component: SChip,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		value: { control: 'boolean' },
		rounded: { control: 'boolean' },
		removable: { control: 'boolean' },
		useInput: { control: 'boolean' },
		inputValue: { control: 'text' },
		className: { control: 'text' },
		onRemove: fn(),
		onInput: fn(),
	},
} satisfies Meta<typeof SChip>;

export default meta;

type Story = StoryObj<SChipProps>;

export const DefaultChip: Story = {
	args: {
		value: true,
		children: 'default chip',
	},
};

export const RoundedChip: Story = {
	args: {
		value: true,
		rounded: true,
		children: 'rounded chip',
	},
};

export const ClickableChip: Story = {
	args: {
		value: true,
		clickable: true,
		children: 'clickable chip',
	},
};

export const RemovableChip: Story = {
	args: {
		value: true,
		removable: true,
		children: 'removable chip',
	},
};

export const UseInputChip: Story = {
	args: {
		value: true,
		removable: true,
		useInput: true,
		inputValue: 'use input chip',
	},
};
