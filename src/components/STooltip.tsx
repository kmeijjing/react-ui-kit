import { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import SButton, { type SButtonProps } from './SButton';
import Icon from './Icon';
import colors from '../css/colors.ts';
import Tooltip_Arrow from '../assets/Tooltip_Arrow.svg';

export interface STooltipProps {
	value?: boolean;
	usePopover?: boolean;
	children: ReactNode;
	icon?: string;
	label?: string;
	color?: keyof typeof colors;
	buttonOptions?: SButtonProps;
	className?: string;
	placement?: 'top' | 'bottom' | 'left' | 'right';
	delay?: number;
	tooltipClassName?: string;
	offset?: [number, number];
}

const STooltip = ({
	value,
	usePopover = false,
	children,
	icon,
	label,
	color,
	buttonOptions,
	className = '',
	placement = 'bottom',
	delay = 0,
	tooltipClassName,
	offset = [0, 0],
}: STooltipProps) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipClass, setTooltipClass] = useState('');
	const [tooltipStyles, setTooltipStyles] = useState({});
	const tooltipElement = useRef<HTMLDivElement | null>(null);
	const buttonElement = useRef<HTMLDivElement | null>(null);
	// 툴팁 위치 설정
	const setTooltipPosition = () => {
		if (!buttonElement.current || !tooltipElement.current) return;

		const tooltipRect = tooltipElement.current.getBoundingClientRect();
		const referenceRect = buttonElement.current.getBoundingClientRect();

		const positions = {
			top: {
				top: referenceRect.top - tooltipRect.height - 16 + offset[1],
				left:
					referenceRect.left +
					referenceRect.width / 2 -
					tooltipRect.width / 2 +
					offset[0],
			},
			bottom: {
				top: referenceRect.bottom + 16 + offset[1],
				left:
					referenceRect.left +
					referenceRect.width / 2 -
					tooltipRect.width / 2 +
					offset[0],
			},
			left: {
				top:
					referenceRect.top +
					referenceRect.height / 2 -
					tooltipRect.height / 2 +
					offset[1],
				left: referenceRect.left - tooltipRect.width - 14 + offset[0],
			},
			right: {
				top:
					referenceRect.top +
					referenceRect.height / 2 -
					tooltipRect.height / 2 +
					offset[1],
				left: referenceRect.right + 14 + offset[0],
			},
		};

		const { top, left } = positions[placement];

		setTooltipStyles({
			top: `${(top + window.scrollY) / 12}rem`,
			left: `${(left + window.scrollX) / 12}rem`,
		});
		setTooltipClass(`translate-y-0`);
	};

	const handleMouseEnter = () =>
		!usePopover && setTimeout(() => setShowTooltip(true), delay);
	const handleMouseLeave = () => !usePopover && setShowTooltip(false);
	const handleClick = () => usePopover && setShowTooltip(!showTooltip);

	const arrowClass = {
		top: ' left-1/2 -translate-x-1/2 -bottom-12pxr',
		bottom: 'rotate-180 left-1/2 -translate-x-1/2 -top-12pxr',
		left: '-rotate-90 top-1/2 -translate-y-1/2 -right-12pxr',
		right: 'rotate-90 top-1/2 -translate-y-1/2 -left-12pxr',
	};

	useEffect(() => {
		if (showTooltip) {
			setTooltipPosition();
		} else {
			setTooltipClass('-translate-y-10pxr');
		}
	}, [showTooltip]);

	useEffect(() => {
		if (value) {
			setShowTooltip(true);
			setTimeout(() => setTooltipPosition(), 0);
		}
		if (!value) {
			setShowTooltip(false);
		}
	}, [value]);

	return (
		<div
			className={[
				's-tooltip relative inline-block w-fit cursor-pointer',
				className,
			].join(' ')}
		>
			<div
				ref={buttonElement}
				className='s-tooltip__inner'
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
			>
				{icon && !label ? (
					<Icon
						name={icon}
						color={color}
					/>
				) : (
					<SButton
						icon={icon}
						label={label}
						color={color}
						{...buttonOptions}
					></SButton>
				)}
			</div>

			{createPortal(
				showTooltip && (
					<div
						ref={tooltipElement}
						className={[
							's-tooltip__content pointer-events-none absolute z-50 box-border rounded-4pxr bg-Blue_B_Darken-2 leading-20pxr text-white shadow-tooltip transition-transform',
							!usePopover && 'px-20pxr py-8pxr',
							usePopover && 'px-16pxr py-10pxr',
							tooltipClass,
							tooltipClassName,
						].join(' ')}
						style={tooltipStyles}
					>
						{usePopover && (
							<SButton
								icon='Close_12'
								data-testid='close-btn'
								color='Blue_B_Darken-2'
								className='close-btn pointer-events-auto absolute right-0 top-4pxr'
								onClick={() => setShowTooltip(false)}
							/>
						)}

						<img
							src={Tooltip_Arrow}
							className={[
								's-tooltip__arrow absolute z-40',
								arrowClass[placement],
							].join(' ')}
						/>

						{children}
					</div>
				),
				document.body
			)}
		</div>
	);
};

interface TooltipSectionProps {
	children: ReactNode;
	className?: string;
}

STooltip.Title = ({ children, className }: TooltipSectionProps) => (
	<div className={['mb-3pxr font-bold', className].join(' ')}>{children}</div>
);

STooltip.Body = ({ children, className }: TooltipSectionProps) => (
	<div className={['font-medium', className].join(' ')}>{children}</div>
);

STooltip.Footer = ({ children, className }: TooltipSectionProps) => (
	<div className={['pointer-events-auto mt-9pxr', className].join(' ')}>
		{children}
	</div>
);

export default STooltip;
