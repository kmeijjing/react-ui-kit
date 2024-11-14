import {
	useState,
	useRef,
	useEffect,
	ReactNode,
	Children,
	isValidElement,
} from 'react';
import { createPortal } from 'react-dom';
import SButton, { type SButtonProps } from './SButton.tsx';
import Icon from './Icon.tsx';
import colors from '../css/colors.ts';
import { TooltipArrow } from '../assets/TooltipArrowIcon.tsx';

export interface STooltipProps {
	trigger?: 'hover' | 'click';
	value?: boolean;
	usePopover?: boolean;
	useClose?: boolean;
	children: ReactNode;
	icon?: string;
	label?: string;
	color?: keyof typeof colors;
	buttonOptions?: SButtonProps;
	className?: string;
	placement?: 'top' | 'bottom' | 'left' | 'right';
	tooltipClassName?: string;
	offset?: [number, number];
}

const STooltip = ({
	trigger = 'hover',
	value,
	usePopover = false,
	useClose = false,
	children,
	icon,
	label,
	color,
	buttonOptions,
	className = '',
	placement = 'bottom',
	tooltipClassName = '',
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

		setTooltipClass(`translate-y-0`);
		setTooltipStyles({
			top: `${(top + window.scrollY) / 12}rem`,
			left: `${(left + window.scrollX) / 12}rem`,
		});
	};

	const handleMouseEnter = () => trigger === 'hover' && setShowTooltip(true);
	const handleMouseLeave = () => trigger === 'hover' && setShowTooltip(false);
	const handleClick = () => trigger === 'click' && setShowTooltip(!showTooltip);

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
			setTooltipClass('-translate-y-10pxr');
		}
	}, [value]);

	const ARROW_CLASS = {
		top: ' left-1/2 -translate-x-1/2 -bottom-12pxr',
		bottom: 'rotate-180 left-1/2 -translate-x-1/2 -top-12pxr',
		left: '-rotate-90 top-1/2 -translate-y-1/2 -right-12pxr',
		right: 'rotate-90 top-1/2 -translate-y-1/2 -left-12pxr',
	};

	const sections = {
		Title: null as ReactNode,
		Body: null as ReactNode,
		Footer: null as ReactNode,
	};

	Children.forEach(children, (child) => {
		if (isValidElement(child)) {
			switch (child.type) {
				case STooltip.Title:
					sections.Title = child;
					break;
				case STooltip.Body:
					sections.Body = child;
					break;
				case STooltip.Footer:
					sections.Footer = child;
					break;
				default:
					break;
			}
		}
	});

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
					/>
				)}
			</div>

			{createPortal(
				showTooltip && (
					<div
						ref={tooltipElement}
						className={[
							's-tooltip__content absolute z-50 box-border rounded-4pxr bg-Blue_B_Darken-2 leading-20pxr text-white shadow-tooltip transition-transform',
							!usePopover ? 'px-20pxr py-8pxr' : 'px-16pxr py-10pxr',
							!usePopover && useClose ? 'pr-36pxr' : '',
							tooltipClass,
							tooltipClassName,
						].join(' ')}
						style={tooltipStyles}
					>
						<TooltipArrow
							className={[
								's-tooltip__arrow absolute z-40',
								ARROW_CLASS[placement],
							].join(' ')}
						/>

						{useClose && (
							<div
								data-testid='close-btn'
								className={[
									'bsolute absolute right-0 top-0 cursor-pointer p-12pxr',
								].join(' ')}
								onClick={() => setShowTooltip(false)}
							>
								<Icon
									name='Close_12'
									color='Blue_B_Darken-2'
								/>
							</div>
						)}

						{/* Render Title, Body, Footer in correct order */}
						{sections.Title}
						{sections.Body}
						{sections.Footer}
					</div>
				),
				document.body
			)}
		</div>
	);
};

export interface TooltipSectionProps {
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
	<div className={['mt-9pxr', className].join(' ')}>{children}</div>
);

export default STooltip;
