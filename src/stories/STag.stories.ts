import type { Meta, StoryObj } from '@storybook/react';

import STag from '../components/STag'
import colors from '../css/colors';

const meta = {
 title: 'STag',
 component: STag,
 parameters: {
  layout: 'centered',
 },
 tags: ['autodocs'],
 argTypes: {
  color: { control: 'select', options: ['grey', 'red', 'orange', 'yellow', 'green', 'blue', 'darkblue', 'indigo'] },
  bgColor: { control: 'select', options: Object.keys(colors) },
  textColor: { control: 'select', options: Object.keys(colors) },
 },
} satisfies Meta<typeof STag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
 args: {
  label: 'Sellmate',
  color: 'blue',
 },
};

export const Color: Story = {
 args: {
  label: 'Sellmate',
  bgColor: 'Blue_C_Lighten-6',
  textColor: 'Blue_C_Default',
 },
};

export const SizeSm: Story = {
 args: {
  label: 'Sellmate',
  color: 'blue',
  size: 'sm'
 },
};

export const SizeMd: Story = {
 args: {
  label: 'Sellmate',
  color: 'blue',
  size: 'md'
 },
};

export const Round: Story = {
 args: {
  label: 'Sellmate',
  color: 'blue',
  round: true,
 },
};


export const RoundSm: Story = {
 args: {
  label: 'Sellmate',
  color: 'blue',
  size: 'sm',
  round: true,
 },
};
