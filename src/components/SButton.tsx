import colors from '../css/colors.ts';
import Icon from './Icon.tsx';
export interface SButtonProps {
	/**
	 * Button size
	 */
	size?: 'xs' | 'sm' | 'md' | 'lg';
	/**
	 * Button color
	 * @description Changing background color without outline or text color with outline
	 */
	color?: keyof typeof colors;
	/**
	 * Use button hover
	 */
	noHover?: boolean;
	/**
	 * Button text
	 */
	label?: string;
	/**
	 * Click handler
	 */
	onClick?: () => void;
	/**
	 * Button className
	 */
	className?: string;
	/**
	 * Button type
	 */
	type?: HTMLButtonElement['type'];
	/**
	 * Button outline
	 * @description Outline 'true' means changing the color of the text to the color you specified.
	 */
	outline?: boolean;
	/**
	 * Button icon
	 * @description Icon type should be just svg file path.
	 * @example "<svg width='24' height='24'..." // Icon type string is such as
	 * @example './assets/icons/icon.svg' // and other type is such as
	 */
	icon?: string | JSX.Element;
	/**
	 * Button disable
	 */
	disabled?: boolean;
}

const SButton = ({
	label,
	size = 'sm',
	color = 'Blue_B_Default',
	outline = false,
	icon,
	disabled = false,
	noHover = false,
	className = '',
	...props
}: SButtonProps) => {
	const argColor = colors[color] || color;

	const colorClass = outline
		? `text-[${argColor}] before:rounded-4pxr before:absolute before:top-0 before:left-0 before:w-full before:h-full relative before:border before:border-[${argColor}]`
		: `bg-[${argColor}] text-white`;

	const sizeClasses = {
		xs: 'h-24pxr py-2pxr px-8pxr text-base leading-20pxr',
		sm: 'h-28pxr py-4pxr px-12pxr text-base leading-20pxr',
		md: 'h-34pxr py-4pxr px-20pxr text-16pxr leading-26pxr',
		lg: 'h-62pxr py-16pxr px-28pxr text-18pxr leading-30pxr',
	};

	const disabledClass =
		'disabled:before:top-0 disabled:before:left-0 disabled:before:rounded-4pxr disabled:relative disabled:cursor-not-allowed disabled:bg-Grey_Lighten-3 disabled:text-Grey_Default disabled:before:absolute disabled:before:h-full disabled:before:w-full disabled:before:border disabled:before:border-Grey_Lighten-2';

	const iconMargin = {
		xs: 'mr-4pxr w-12pxr h-12pxr',
		sm: 'mr-4pxr w-16pxr h-16pxr',
		md: 'mr-8pxr w-20pxr h-20pxr',
		lg: 'mr-12pxr w-24pxr h-24pxr',
	};

	const iconClass = label ? iconMargin[size] : '';

	const hoverEffect = !noHover
		? outline
			? `hover:before:bg-${color}/10 hover:before:border-[${argColor}]`
			: 'hover:before:bg-black hover:before:opacity-10'
		: '';

	const finalClassName = [
		's-button rounded-4pxr inline-flex flex-nowrap min-w-24pxr items-center relative whitespace-nowrap',
		sizeClasses[size],
		colorClass,
		disabled ? disabledClass : hoverEffect,
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<button
			className={finalClassName}
			disabled={disabled}
			{...props}
		>
			<div className='inline-flex items-center'>
				{icon &&
					(typeof icon === 'string' ? (
						<Icon
							name={icon}
							className={`icon ${iconClass}`}
						/>
					) : (
						<icon.type className={`icon ${iconClass}`} />
					))}
				{label}
			</div>
		</button>
	);
};

export default SButton;
