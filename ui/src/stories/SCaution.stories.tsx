import type { Meta, StoryObj } from '@storybook/react';

import SCaution, { type SCautionProps } from '../components/SCaution';

const meta = {
	component: SCaution,
	title: 'SCaution',
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SCaution>;

export default meta;

type Story = StoryObj<SCautionProps>;

export const Default: Story = {
	args: {
		messages: [
			'Pizza ipsum dolor meat lovers buffalo.',
			'Platter pork NY pizza pizza steak beef dolor sautéed fresh.',
			'Extra Philly green platter red pork ipsum broccoli bbq Chicago.',
			'Party ham and string pepperoni pineapple broccoli extra.',
			'Pork tomato chicken bacon ham anchovies.',
			'Bacon mouth personal pineapple pork extra.',
			'Pineapple fresh pie bbq fresh pizza pizza meat.',
			'Style Hawaiian ricotta spinach burnt ham wing green mayo.',
		],
	},
};

export const HTML: Story = {
	args: {
		messages: [
			'Pizza ipsum dolor meat lovers buffalo.',
			'Platter pork <strong class="text-Red_Default">NY</strong> pizza pizza steak beef dolor sautéed fresh.',
		],
	},
};

export const HTMLModal: Story = {
	args: {
		useModal: true,
		messages: [
			'Pizza ipsum dolor meat lovers buffalo.',
			'Platter pork <strong class="text-Red_Default">NY</strong> pizza pizza steak beef dolor sautéed fresh.',
		],
	},
};

export const Modal1: Story = {
	args: {
		useModal: true,
		messages: [
			'Pizza ipsum dolor meat lovers buffalo.',
			'Platter pork NY pizza pizza steak beef dolor sautéed fresh.',
		],
	},
};

export const Modal2: Story = {
	args: {
		useModal: true,
		messageClassName: 'bg-Grey_Lighten-6',
		messages: [
			'Pizza ipsum dolor meat lovers buffalo.',
			'Platter pork NY pizza pizza steak beef dolor sautéed fresh.',
		],
	},
};
