import type { Meta, StoryObj } from '@storybook/react';

import SPagination, { type SPaginationProps } from '../components/SPagination';

const meta = {
	title: 'SPagination',
	component: SPagination,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SPagination>;

export default meta;

type Story = StoryObj<SPaginationProps>;

export const Default: Story = {
	args: {
		lastPage: 1000,
		currentPage: 254,
		perPage: 10,
	},
};

export const PerPage1: Story = {
	args: {
		lastPage: 1000,
		currentPage: 254,
		perPage: 1,
	},
};
