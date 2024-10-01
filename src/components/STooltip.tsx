import { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import SButton, { type SButtonProps } from './SButton';
import Icon from './Icon';
import colors from '../css/colors.ts';
import Tooltip_Arrow from '../assets/Tooltip_Arrow.svg';

export interface STooltipProps {
	children: ReactNode;
	icon?: string;
	label?: string;
	color?: keyof typeof colors;
	outline?: boolean;
	buttonOptions?: SButtonProps;
	className?: string;
	placement?: 'top' | 'bottom' | 'left' | 'right';
	trigger?: 'click' | 'hover';
	delay?: number;
	maxWidth?: number;
	offset?: [number, number];
}

const STooltip = ({
	children,
	icon,
	label,
	color,
	buttonOptions,
	outline = false,
	className = '',
	placement = 'bottom',
	trigger = 'hover',
	delay = 0,
	maxWidth = 300,
	offset = [0, 0],
	...props
}: STooltipProps) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipClass, setTooltipClass] = useState('');
	const [tooltipStyles, setTooltipStyles] = useState({});
	const tooltipElement = useRef<HTMLDivElement | null>(null);
	const buttonElement = useRef<HTMLDivElement | null>(null);
	// 툴팁 위치 설정
	const setTooltipPosition = () => {
		if (buttonElement.current && tooltipElement.current) {
			const tooltipRect = tooltipElement.current.getBoundingClientRect();
			console.log('tooltipRect : ', tooltipRect);
			const referenceRect = buttonElement.current.getBoundingClientRect();
			console.log('referenceRect : ', referenceRect);

			let top = 0,
				left = 0;

			switch (placement) {
				case 'top':
					top = referenceRect.top - tooltipRect.height - 16 + offset[1];
					left =
						referenceRect.left +
						referenceRect.width / 2 -
						tooltipRect.width / 2 +
						offset[0];
					break;
				case 'bottom':
					top = referenceRect.bottom + 16 + offset[1];
					left =
						referenceRect.left +
						referenceRect.width / 2 -
						tooltipRect.width / 2 +
						offset[0];
					break;
				case 'left':
					top =
						referenceRect.top +
						referenceRect.height / 2 -
						tooltipRect.height / 2 +
						offset[1];
					left = referenceRect.left - tooltipRect.width - 14 + offset[0];
					break;
				case 'right':
					top =
						referenceRect.top +
						referenceRect.height / 2 -
						tooltipRect.height / 2 +
						offset[1];
					left = referenceRect.right + 14 + offset[0];
					break;
			}

			setTooltipClass(`max-w-${maxWidth}pxr translate-y-0 transition-transform`);

			setTooltipStyles({
				zIndex: 9999,
				top: `${(top + window.scrollY) / 12}rem`,
				left: `${(left + window.scrollX) / 12}rem`,
			});
		}
	};

	const handleMouseEnter = () => {
		if (trigger === 'hover') {
			setTimeout(() => setShowTooltip(true), delay);
		}
	};

	const handleMouseLeave = () => {
		if (trigger === 'hover') {
			setShowTooltip(false);
		}
	};

	const handleClick = () => {
		if (trigger === 'click') {
			setShowTooltip(!showTooltip);
		}
	};

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
				{!label && icon ? (
					<Icon
						name={icon}
						color={color}
					/>
				) : (
					<SButton
						icon={icon}
						label={label}
						color={color}
						outline={outline}
						{...buttonOptions}
					></SButton>
				)}
			</div>

			{createPortal(
				showTooltip && (
					<div
						ref={tooltipElement}
						className={[
							's-tooltip__content pointer-events-none absolute z-20 box-border rounded-4pxr bg-Blue_B_Darken-2 px-20pxr py-8pxr text-white',
							tooltipClass,
						].join(' ')}
						style={tooltipStyles}
					>
						{children}

						<img
							src={Tooltip_Arrow}
							className={[
								's-tooltip__arrow absolute z-10',
								arrowClass[placement],
							].join(' ')}
						/>
					</div>
				),
				document.body
			)}
		</div>
	);
};

export default STooltip;
