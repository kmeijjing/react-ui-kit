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
 const [checked, setChecked] = useState(false)

 const handleChange =() => {
  setChecked((prev) => !prev)
  onClick(value)
 }
	return (
		<label className='inline-flex items-center cursor-pointer'>
			<input
				value={value}
    checked={checked}
				hidden
				name={name}
    onChange={handleChange}
			/>
			<span
				className={[
					'block w-5.5 h-5.5 mr-2.5 border border-Grey_Default rounded-2 aria-disabled:bg-Grey_Lighten-4 aria-disabled:border-Grey_Lighten-2',
					checked ? 'bg-Blue_C_Default' : 'bg-white',
				].join(' ')}
				aria-disabled={disabled}
			>
    {checked && <CheckboxIcon />}
			</span>
			<span>{label}</span>
   checked{checked}
		</label>
	);
};

export default SCheckbox;
