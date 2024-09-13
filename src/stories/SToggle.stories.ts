import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SToggle, { SToggleProps } from '../components/SToggle';

// 스토리북 메타데이터

const meta = {
	title: 'SToggle',
	component: SToggle,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: {
				type: 'select',
				options: ['switch', 'button'],
			},
		},
		value: { control: 'boolean' },
		disabled: { control: 'boolean' },
		label: { control: 'text' },
		children: { control: 'text' },
		onChange: fn(),
	},
} satisfies Meta<typeof SToggle>;

export default meta;

type Story = StoryObj<SToggleProps>;

export const DefaultToggle: Story = {
	args: {
		type: 'switch',
		value: true,
	},
};

export const DisabledToggle: Story = {
	args: {
		value: true,
		disabled: true,
		children: 'rounded Toggle',
	},
};

export const ToggleWithLabel: Story = {
	args: {
		value: true,
		label: 'Default Switch Toggle',
	},
};

export const ButtonToggleTrue: Story = {
	args: {
		type: 'button',
		value: true,
		children: 'Button Toggle',
	},
};

export const ButtonToggleFalse: Story = {
	args: {
		type: 'button',
		value: false,
		children: 'Button Toggle',
	},
};

export const DisabledButtonToggle: Story = {
	args: {
		type: 'button',
		value: true,
		disabled: true,
		children: 'Disabled Button Toggle',
	},
};

export const ButtonToggleWithLabel: Story = {
	args: {
		type: 'button',
		value: true,
		children: 'Button Toggle',
		label: 'Button Toggle With Label',
	},
};
