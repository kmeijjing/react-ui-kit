import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SButton from '../components/SButton';
import colors from '../css/colors';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'SButton',
  component: SButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
   color: { control: 'select', options: Object.keys(colors) },
   icon: { control: 'text' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof SButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Color: Story = {
  args: {
    color: 'Blue_B_Default',
    label: 'Button',
  },
};

export const Outline: Story = {
 args: {
   color: 'Blue_B_Default',
   label: 'Button',
   outline: true,
 },
};

const icon = 'M1.86664 8H14.1333@@stroke: currentColor; stroke-linecap: round;&&M8 1.8667L8 14.1334@@stroke: currentColor; stroke-linecap: round;|0 0 16 16'

export const Icon: Story = {
 args: {
   icon,
   label: 'Icon Button',
   size:'sm',
 },
};

export const IconWithOutline: Story = {
 args: {
   icon,
   label: 'Icon Button',
   size:"md",
   outline: true,
   noHover: true,
   className: ""
 },
};


export const IconWithoutLabel: Story = {
 args: {
   icon,
   size: 'xs',
 },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Button',
  },
};

export const Medium: Story = {
 args: {
   size: 'md',
   label: 'Button',
 },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Button',
  },
};

export const XSmall: Story = {
 args: {
   size: 'xs',
   label: 'Button',
 },
};
