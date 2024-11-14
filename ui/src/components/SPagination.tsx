import { useState, useMemo, useEffect } from 'react';
import Icon from './Icon';

export interface SPaginationProps {
	currentPage: number;
	lastPage: number;
	perPage?: 1 | 10;
	className?: string;
	onChange?: (page: number) => void;
}

const BUTTON_WIDTH: Record<number, number> = {
	1: 26,
	2: 36,
	3: 42,
	4: 50,
	5: 58,
};

const SPagination = ({
	currentPage = 1,
	lastPage = 1,
	perPage = 10,
	className = '',
	onChange,
}: SPaginationProps) => {
	const [paginationInfo, setPaginationInfo] = useState<Record<string, number>>({
		lastPage: lastPage,
		currentPage: currentPage,
	});

	const [buttonWidth, setButtonWidth] = useState<number>(BUTTON_WIDTH[1]);

	useEffect(() => {
		setPaginationInfo({
			lastPage: lastPage,
			currentPage: currentPage,
		});
	}, [currentPage, lastPage, perPage]);

	const displayedPageNumber = useMemo(() => {
		const pages = [];
		const { lastPage, currentPage } = paginationInfo;
		const startPage = Math.floor((currentPage - 1) / perPage) * perPage + 1; // 현재 페이지 그룹의 시작 페이지
		const endPage = Math.min(startPage + perPage - 1, lastPage); // 현재 페이지 그룹의 끝 페이지

		// 페이지 번호 생성
		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		return pages;
	}, [paginationInfo, perPage]);

	const arrowButtonClass: string = [
		'flex h-26pxr w-26pxr items-center justify-center rounded-14pxr text-Grey_Darken-5 hover:border hover:border-Blue_B_Lighten-1',
	].join(' ');

	useEffect(() => {
		const maxPageLength: number =
			displayedPageNumber[displayedPageNumber.length - 1].toString().length;

		setButtonWidth(BUTTON_WIDTH[maxPageLength]);
	}, [displayedPageNumber]);

	const handlePageChange = (newPage: number) => {
		if (newPage < 1 || newPage > lastPage) return; // 유효한 페이지 범위 확인
		setPaginationInfo((prev) => ({ ...prev, currentPage: newPage }));
		onChange?.(newPage);
	};

	const handleGroupChange = (direction: 'forward' | 'backward') => {
		const { currentPage } = paginationInfo;

		const newPage =
			direction === 'forward'
				? Math.min(currentPage + perPage, lastPage)
				: Math.max(currentPage - perPage, 1);

		handlePageChange(newPage);
	};

	const isFirstGroup = () => {
		const { currentPage } = paginationInfo;
		return currentPage <= 10; // 첫 번째 그룹 확인
	};

	const isLastGroup = () => {
		const { lastPage, currentPage } = paginationInfo;
		const startPageGroup = Math.floor((currentPage - 1) / perPage) * perPage + 1;
		return startPageGroup + perPage - 1 >= lastPage; // 마지막 그룹 확인
	};

	return (
		<div
			className={[
				's-pagination flex flex-nowrap items-center gap-x-8pxr text-Grey_Darken-2',
				className,
			].join(' ')}
		>
			<div className='prepend-btns flex w-60pxr flex-nowrap items-center gap-x-8pxr'>
				{!isFirstGroup() && (
					<>
						<button
							className={arrowButtonClass}
							onClick={() => handlePageChange(1)}
						>
							<Icon name='ArrowLeftEnd_12' />
						</button>
						<button
							className={arrowButtonClass}
							onClick={() => handleGroupChange('backward')}
						>
							<Icon name='ArrowLeft_12' />
						</button>
					</>
				)}
			</div>

			{displayedPageNumber.map((pageNumber: number) => (
				<button
					key={pageNumber}
					type='button'
					className={[
						'pagination-btn flex h-26pxr items-center justify-center rounded-14pxr',
						perPage !== 1 && paginationInfo.currentPage === pageNumber
							? 'bg-Blue_B_Lighten-1 text-white'
							: perPage !== 1
								? 'hover:border hover:border-Blue_B_Lighten-1 hover:text-Blue_B_Lighten-1'
								: '!cursor-text',
					].join(' ')}
					disabled={paginationInfo.currentPage === pageNumber}
					style={{ width: `${buttonWidth / 12}rem` }}
					onClick={() => handlePageChange(pageNumber)}
				>
					{pageNumber}
				</button>
			))}

			{perPage === 1 && (
				<>
					<div>/</div>
					<div
						className='text-center'
						style={{ width: `${buttonWidth / 12}rem` }}
					>
						{paginationInfo.lastPage}
					</div>
				</>
			)}

			<div className='append-btns flex w-60pxr flex-nowrap items-center gap-x-8pxr'>
				{!isLastGroup() && (
					<>
						<button
							className={arrowButtonClass}
							onClick={() => handleGroupChange('forward')}
						>
							<Icon name='ArrowRight_12' />
						</button>
						<button
							className={arrowButtonClass}
							onClick={() => handlePageChange(lastPage)}
						>
							<Icon name='ArrowRightEnd_12' />
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default SPagination;
