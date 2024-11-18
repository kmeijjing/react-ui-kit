import { useCallback, useEffect, useRef, useState } from 'react';

export interface DropdownOptionProps {
	label: string;
	value: string | number;
	disable?: boolean;
	display?: boolean;
}

interface DropdownOptionsProps {
	parentId: string;
	options: DropdownOptionProps[];
	onClick: (arg: DropdownOptionProps) => void;
}

interface OptionStyle {
	top: string;
	left: string;
	minWidth: string;
	maxHeight?: string;
}

const INITIAL_STYLE: OptionStyle = {
	top: '0rem',
	left: '0rem',
	minWidth: '0rem',
};
const MAX_HEIGHT = 300; // 최대 높이
const SPACING = 4; // 옵션 간격
const VIEWPORT_MARGIN = 12; // 화면 위아래 여백 추가

const DropdownOptions = ({
	parentId,
	options = [],
	onClick,
}: DropdownOptionsProps) => {
	const ulRef = useRef<HTMLUListElement>(null);
	const [optionStyle, setOptionStyle] = useState<OptionStyle>(INITIAL_STYLE);

	const getAvailableSpace = useCallback((parentRect: DOMRect) => {
		const windowHeight = window.innerHeight;
		return {
			bottom: windowHeight - parentRect.bottom - VIEWPORT_MARGIN,
			top: parentRect.top - VIEWPORT_MARGIN,
		};
	}, []);

	const calculateDropdownHeight = useCallback((actualHeight: number) => {
		return Math.min(actualHeight, MAX_HEIGHT);
	}, []);

	const calculatePosition = useCallback((): OptionStyle => {
		const parent = document.getElementById(parentId);
		if (!parent || !ulRef.current) return INITIAL_STYLE;

		const parentRect = parent.getBoundingClientRect();
		const { bottom: bottomSpace, top: topSpace } = getAvailableSpace(parentRect);
		const dropdownHeight = calculateDropdownHeight(ulRef.current.scrollHeight);

		const showAbove = bottomSpace < dropdownHeight && topSpace > bottomSpace;
		const windowHeight = window.innerHeight;

		return {
			top: showAbove
				? `${Math.max(VIEWPORT_MARGIN, parentRect.top - dropdownHeight - SPACING) / 12}rem`
				: `${Math.min(windowHeight - VIEWPORT_MARGIN - dropdownHeight, parentRect.bottom + SPACING) / 12}rem`,
			left: `${parentRect.left / 12}rem`,
			minWidth: `${parentRect.width / 12}rem`,
			maxHeight: `${dropdownHeight / 12}rem`,
		};
	}, [calculateDropdownHeight, getAvailableSpace, parentId]);

	const updatePosition = useCallback(() => {
		const newPosition = calculatePosition();
		if (newPosition) {
			setOptionStyle(newPosition);
		}
	}, [calculatePosition]);

	const handleOptionClick = useCallback(
		(e: React.MouseEvent, option: DropdownOptionProps) => {
			e.stopPropagation(); // 이벤트 전파 중단

			if (!option.disable) onClick?.(option);
		},
		[onClick]
	);

	useEffect(() => {
		// 초기 위치 설정
		requestAnimationFrame(updatePosition);

		window.addEventListener('scroll', updatePosition, true);
		window.addEventListener('resize', updatePosition);

		return () => {
			window.removeEventListener('scroll', updatePosition, true);
			window.removeEventListener('resize', updatePosition);
		};
	}, [updatePosition]);

	return (
		<ul
			ref={ulRef}
			id={`s-dropdown__options--${parentId}`}
			className='s-dropdown__options fixed z-[999] overflow-y-auto rounded-2pxr bg-white shadow-dropdownOptions'
			style={optionStyle}
		>
			{options.map(
				(opt, idx) =>
					opt.display !== false && (
						<li
							key={`s-dropdown__option--${idx}`}
							className={[
								'px-12pxr py-4pxr text-Grey_Darken-4 hover:bg-Blue_C_Default hover:text-white aria-disabled:bg-white aria-disabled:text-Grey_Lighten-1',
								opt?.disable ? 'cursor-not-allowed' : 'cursor-pointer',
							].join(' ')}
							aria-disabled={opt.disable}
							onClick={(e) => handleOptionClick(e, opt)}
						>
							{typeof opt === 'string' ? (
								<div className='whitespace-nowrap'>{opt}</div>
							) : (
								<div
									dangerouslySetInnerHTML={{ __html: opt.label }}
									className='whitespace-nowrap'
								></div>
							)}
						</li>
					)
			)}
		</ul>
	);
};

export default DropdownOptions;
