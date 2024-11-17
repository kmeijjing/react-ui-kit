import type { Meta, StoryObj } from '@storybook/react';
import SSelect from '../components/SSelect';

const meta = {
	title: 'SSelect',
	component: SSelect,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
	{ label: '옵션 1', value: '1' },
	{ label: '옵션 2', value: '2' },
	{ label: '옵션 3', value: '3' },
	{ label: '긴 텍스트 옵션 4입니다', value: '4' },
];

export const Default: Story = {
	args: {
		options,
		value: null,
		onChange: (option) => console.log('선택된 옵션:', option),
		placeholder: '선택해주세요',
	},
};

export const WithLabel: Story = {
	args: {
		...Default.args,
		label: '라벨',
	},
};

export const WithSelectedValue: Story = {
	args: {
		...Default.args,
		value: options[0],
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true,
	},
};

export const ManyOptions: Story = {
	args: {
		...Default.args,
		options: [
			...options,
			{ label: '옵션 5', value: '5' },
			{ label: '옵션 6', value: '6' },
			{ label: '옵션 7', value: '7' },
			{ label: '옵션 8', value: '8' },
			{ label: '옵션 9', value: '9' },
			{ label: '옵션 10', value: '10' },
		],
	},
};
