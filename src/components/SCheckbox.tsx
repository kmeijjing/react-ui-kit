import { useState, type InputHTMLAttributes } from 'react';
import CheckboxIcon from '../assets/CheckboxIcon';

export interface CheckboxProps {
	/**
	 * Checkbox disable
	 */
	disabled?: boolean;
	/**
	 * Checkbox className
	 */
	className?: string;
	/**
	 * Checkbox text
	 */
	label: string;
	/**
	 * Checkbox model
	 */
	value: InputHTMLAttributes<HTMLInputElement>['value'];
	/**
	 * Checkbox name
	 */
	name?: InputHTMLAttributes<HTMLInputElement>['name'];
	/**
	 * Click handler
	 */
	onClick: (arg: InputHTMLAttributes<HTMLInputElement>['value']) => void;
}

const SCheckbox = ({ label, value, name, onClick, disabled = false }: CheckboxProps) => {
	const [checked, setChecked] = useState(false);

	const handleChange = () => {
		setChecked((prev) => !prev);
		onClick(value);
	};
	return (
		<label className='inline-flex items-center cursor-pointer s-checkbox'>
			<input
				value={value}
				checked={checked}
				type='checkbox'
				hidden
				name={name}
				onChange={handleChange}
			/>
			<span
				className={[
					'relative inline-flex items-center justify-center w-5.5 h-5.5 mr-2.5 before:border before:absolute before:top-0 before:left-0 before:w-full before:h-full rounded-2 before:rounded-2 aria-disabled:bg-Grey_Lighten-4 aria-disabled:before:border-Grey_Lighten-2',
					checked
						? 'bg-Blue_C_Default before:border-Blue_C_Default'
						: 'bg-white before:border-Grey_Default',
				].join(' ')}
				aria-disabled={disabled}
			>
				{
					<CheckboxIcon
						className={checked && !disabled ? 'text-white' : disabled ? 'text-Grey_Default' : 'text-transparent'}
					/>
				}
			</span>
			<span>{label}</span>
		</label>
	);
};

export default SCheckbox;
