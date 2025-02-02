import type { Meta, StoryObj } from '@storybook/react';
import SFilePicker from '../components/SFilePicker';

const meta = {
	title: 'SFilePicker',
	component: SFilePicker,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SFilePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const Disabled: Story = {
	args: {
		placeholder: '긴 파일 이름이 들어갈 경우 이렇게 절사가 됩니다!!!!!!',
		disabled: true,
		className: '!w-240pxr',
	},
};

export const Clearable: Story = {
	args: {
		placeholder: '파일 선택',
		clearable: true,
	},
};
