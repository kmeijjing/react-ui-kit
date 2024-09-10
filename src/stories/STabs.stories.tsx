import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import STabs, { type STabsProps } from '../components/STabs';
import STabPanel from '../components/STabPanel';

const meta = {
	title: 'STabs',
	component: STabs,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: { onChange: fn() },
} satisfies Meta<typeof STabs>;

export default meta;

type Story = StoryObj<STabsProps>;

export const Default: Story = {
	args: {
		model: 'tab1',
		tabs: [
			{ label: 'Tab 1', value: 'tab1', badge: 'tab1' },
			{ label: 'Tab 2', value: 'tab2', badge: 'tab2' },
			{ label: 'Tab 3', value: 'tab3' },
		],
		onChange: (value: string) => {
			console.log('Selected Tab:', value);
		},
	},
	render: (args: STabsProps) => {
		const [selectedTab, setSelectedTab] = useState(args.model);

		const handleChange = (value: string) => {
			setSelectedTab(value);
			args.onChange(value);
		};

		return (
			<STabs
				{...args}
				model={selectedTab}
				onChange={handleChange}
			>
				<STabPanel value='tab1'>This is Tab 1 content</STabPanel>
				<STabPanel value='tab2'>This is Tab 2 content</STabPanel>
				<STabPanel value='tab3'>This is Tab 3 content</STabPanel>
			</STabs>
		);
	},
};

export const TabsWithLinks: Story = {
	args: {
		model: 'tab1',
		tabs: [
			{ label: 'Tab 1', value: 'tab1', link: '/tab1' },
			{ label: 'Tab 2', value: 'tab2', link: '/tab2' },
			{ label: 'Tab 3', value: 'tab3', link: '/tab3' },
		],
	},
};

export const SizeSm: Story = {
	args: {
		model: 'tab1',
  size: 'sm',
		tabs: [
			{ label: 'Tab 1', value: 'tab1', link: '/tab1' },
			{ label: 'Tab 2', value: 'tab2', link: '/tab2' },
			{ label: 'Tab 3', value: 'tab3', link: '/tab3' },
		],
	},
};

export const SizeLg: Story = {
	args: {
		model: 'tab1',
  size: 'lg',
		tabs: [
			{ label: 'Tab 1', value: 'tab1', link: '/tab1' },
			{ label: 'Tab 2', value: 'tab2', link: '/tab2' },
			{ label: 'Tab 3', value: 'tab3', link: '/tab3' },
		],
	},
};
