import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SInput from '../components/SInput';

const meta = {
	title: 'SInput',
	component: SInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SInput>;

export default meta;

type Story = StoryObj<typeof SInput>;

export const Default: Story = {
	args: {
		placeholder: '키워드를 입려해주세요.'
	},
};

export const LabelInput: Story = {
	args: {
		placeholder: '키워드를 입려해주세요.',
		label: 'label',
	}
}

export const InsideLabelInput: Story = {
	args: {
		placeholder: '키워드를 입려해주세요.',
		label: 'label',
		useInsideLabel: true,
	}
}

export const DisablelInput: Story = {
	args: {
		placeholder: '키워드를 입려해주세요.',
		label: 'label',
		useInsideLabel: true,
		disable: true,
	}
}

export const RaadonlyInput: Story = {
	args: {
		placeholder: '키워드를 입려해주세요.',
		label: 'label',
		useInsideLabel: true,
		readonly: true,
	}
}

export const ValidateInput: Story = {
	args: {
		placeholder: '키워드를 입려해주세요.',
		rules: [
			{
					message: "키워드를 입력해주세요.",
					validate: (value) => !!value,
			},
			{
					message: "Must be at least 5 characters",
					validate: (value) => value.length >= 5,
			},
		]
	},
	render: (args) => {
		const [inputValue, setInputValue] = useState('');
		
		return (

			<SInput
				{...args}
				value={inputValue}
				onChange={(evt) => setInputValue(evt.target.value)}
			/>
		)
	}
}
