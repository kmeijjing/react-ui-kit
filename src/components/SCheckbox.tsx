import { type ChangeEvent, useEffect, useState, type InputHTMLAttributes, useMemo } from 'react';
import { CheckboxIcon, IndeterminateCheckboxIcon } from '../assets/CheckboxIcon';

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
	 * Checkbox value
	 */
	value: string;
	/**
	 * Checkbox checked
	 */
	checked: boolean | null;
	/**
	 * Checkbox name
	 */
	name?: InputHTMLAttributes<HTMLInputElement>['name'];
	/**
	 * Click handler
	 */
	onClick: (arg: boolean | null) => void;
}

const SCheckbox = ({ checked, label, value, name, onClick, disabled = false }: CheckboxProps) => {
	const [isChecked, setIsChecked] = useState(checked);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (disabled) return;
		onClick(event.target.checked);
	};

	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	const isCheckedInIcon = useMemo(() => isChecked !== false, [isChecked]);

	const iconClass = useMemo(
		() =>
			isCheckedInIcon && !disabled
				? 'text-white'
				: isCheckedInIcon && disabled
					? 'text-Grey_Default'
					: !isCheckedInIcon
						? 'text-transparent'
						: '',
		[isCheckedInIcon, disabled]
	);

	return (
		<label
			className={[
				'inline-flex items-center s-checkbox',
				disabled ? 'cursor-not-allowed' : 'cursor-pointer',
			].join(' ')}
		>
			<input
				value={value}
				checked={!!isChecked}
				type='checkbox'
				hidden
				name={name}
				onChange={handleChange}
			/>
			<span
				className={[
					`relative inline-flex items-center justify-center w-5.5 h-5.5 mr-2.5 rounded-2 
     before:border before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-2 
     aria-disabled:bg-Grey_Lighten-4 aria-disabled:before:border-Grey_Lighten-2`,
					isCheckedInIcon
						? 'bg-Blue_C_Default before:border-Blue_C_Default'
						: 'bg-white before:border-Grey_Default',
				].join(' ')}
				aria-disabled={disabled}
			>
				{isChecked === null ? (
					<IndeterminateCheckboxIcon className={iconClass} />
				) : (
					<CheckboxIcon className={iconClass} />
				)}
			</span>
			<span>{label}</span>
		</label>
	);
};

export default SCheckbox;
