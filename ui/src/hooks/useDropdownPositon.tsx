import { RefObject, useCallback, useEffect, useState } from 'react';

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

interface UseDropdownPositionProps {
	parentRef: RefObject<HTMLDivElement | HTMLButtonElement>;
	ulRef: React.RefObject<HTMLUListElement>;
	maxHeight?: number;
	spacing?: number;
	viewportMargin?: number;
}

export const useDropdownPosition = ({
	parentRef,
	ulRef,
	maxHeight = 300,
	spacing = 4,
	viewportMargin = 12,
}: UseDropdownPositionProps) => {
	const [style, setStyle] = useState<OptionStyle>(INITIAL_STYLE);

	const getAvailableSpace = useCallback(
		(parentRect: DOMRect) => {
			const windowHeight = window.innerHeight;
			return {
				bottom: windowHeight - parentRect.bottom - viewportMargin,
				top: parentRect.top - viewportMargin,
			};
		},
		[viewportMargin]
	);

	const calculateDropdownHeight = useCallback(
		(actualHeight: number) => Math.min(actualHeight, maxHeight),
		[maxHeight]
	);

	const calculatePosition = useCallback((): OptionStyle => {
		if (!parentRef.current || !ulRef.current) return INITIAL_STYLE;

		const parentRect = parentRef.current.getBoundingClientRect();
		const { bottom: bottomSpace, top: topSpace } = getAvailableSpace(parentRect);
		const dropdownHeight = calculateDropdownHeight(ulRef.current.scrollHeight);
		const windowHeight = window.innerHeight;

		const showAbove = bottomSpace < dropdownHeight && topSpace > bottomSpace;

		return {
			top: showAbove
				? `${Math.max(viewportMargin, parentRect.top - dropdownHeight - spacing) / 12}rem`
				: `${Math.min(windowHeight - viewportMargin - dropdownHeight, parentRect.bottom + spacing) / 12}rem`,
			left: `${parentRect.left / 12}rem`,
			minWidth: `${parentRect.width / 12}rem`,
			maxHeight: `${dropdownHeight / 12}rem`,
		};
	}, [
		calculateDropdownHeight,
		getAvailableSpace,
		parentRef,
		spacing,
		ulRef,
		viewportMargin,
	]);

	useEffect(() => {
		const updatePosition = () => {
			const newPosition = calculatePosition();
			setStyle(newPosition);
		};

		// 초기 위치 설정
		requestAnimationFrame(updatePosition);

		window.addEventListener('scroll', updatePosition, true);
		window.addEventListener('resize', updatePosition);

		return () => {
			window.removeEventListener('scroll', updatePosition, true);
			window.removeEventListener('resize', updatePosition);
		};
	}, [calculatePosition]);

	return style;
};
