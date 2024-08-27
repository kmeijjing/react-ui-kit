import { createPortal } from 'react-dom';
import { useId, useState } from 'react';
import colors from '../css/colors.ts';
import DropdownIcon from '../assets/DropdownIcon.tsx';
import DropdownOptions, { type DropdownOptionProps } from './DropdownOptions.tsx';

export interface DropdownProps {
	/**
	 * Dropdown size
	 */
	size?: 'xs' | 'sm' | 'md';
	/**
	 * Dropdown color
	 * @description Changing background color without outline or text color with outline
	 */
	color?: keyof typeof colors;
	/**
	 * Dropdown text
	 */
	label: string;
	/**
	 * Click handler
	 */
	onClick: (arg: DropdownOptionProps) => void;
	/**
	 * Dropdown options
	 * @description Options can using HTML code
	 * @example [{ label: '<span style="color: red">label</span>', value: 'label' }]
	 */
	options: DropdownOptionProps[];
	/**
	 * Dropdown outline
	 * @description Outline 'true' means changing the color of the text to the color you specified.
	 */
	outline?: boolean;
	/**
	 * Dropdown disable
	 */
	disabled?: boolean;
	/**
	 * Dropdown className
	 */
	className?: string;
}

const SDropdown = ({
	label,
	size = 'sm',
	color = 'Blue_B_Default',
	outline = false,
	disabled,
	className,
	options,
	onClick,
	...props
}: DropdownProps) => {
	const argColor = colors[color] || color;
	const propsColor = !outline
		? `bg-[${argColor}] text-white`
		: `text-[${argColor}] before:rounded-4 before:absolute before:top-0 before:left-0 before:w-full before:h-full relative before:border before:border-[${argColor}]`;

	const propsLabelPadding = {
		xs: 'py-0.5 pl-2.5 pr-2',
		sm: 'py-1.5 pl-4 pr-3.5',
		md: 'py-1.5 pl-6.5 pr-5.5',
	};

	const propsIconPadding = {
		xs: 'p-2',
		sm: 'p-2.5',
		md: 'py-[0.917rem] px-4', // 11px 12px
	};

	const disableClass =
		'disabled:relative disabled:bg-Grey_Lighten-3 disabled:before:rounded-4 disabled:before:absolute disabled:before:w-full disabled:before:h-full disabled:before:top-0 disabled:before:left-0 disabled:before:border disabled:before:border-Grey_Lighten-2 disabled:text-Grey_Default disabled:cursor-not-allowed';

	const hover =
		'hover:overflow-hidden hover:relative hover:before:w-full hover:before:h-full hover:before:top-0 hover:before:left-0 hover:before:absolute';

	const hoverClass = !outline
		? 'hover:before:bg-black hover:before:opacity-10'
		: `hover:before:bg-${color}/10 hover:before:border hover:before:border-[${argColor}]`;

	const [isOpen, setIsOpen] = useState(false);
	const id = useId();

	const handleClick = (arg?: DropdownOptionProps) => {
		setIsOpen((prev) => !prev);
		if (arg) {
			onClick(arg);
		}
	};

	return (
		<>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				id={`s-dropdown--${id}`}
				className={[
					'inline-flex items-center rounded-1.5 before:rounded-1.5',
					propsColor,
					disabled ? disableClass : `${hoverClass} ${hover}`,
					className,
				].join(' ')}
				disabled={disabled}
				{...props}
			>
				<span className={[propsLabelPadding[size]].join(' ')}>{label}</span>
				<span
					className={[
						propsIconPadding[size],
						'border-l',
						disabled
							? 'border-Grey_Lighten-2'
							: outline
								? `border-[${argColor}]`
								: 'border-dropdownInner',
					].join(' ')}
				>
					<DropdownIcon
						className={disabled ? 'text-Grey_Default' : outline ? `text-[${argColor}]` : 'text-white'}
					/>
				</span>
			</button>
			{isOpen &&
				createPortal(
					<DropdownOptions
						onClick={handleClick}
						parentId={id}
						options={options}
					/>,
					document.body
				)}
		</>
	);
};
export default SDropdown;
