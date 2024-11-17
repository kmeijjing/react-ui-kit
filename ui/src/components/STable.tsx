import {
	useState,
	useEffect,
	ReactNode,
	Children,
	isValidElement,
	cloneElement,
	ReactElement,
} from 'react';
import Icon from './Icon';
import SPagination from './SPagination';

export interface Row {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export interface TableColumn {
	name: string;
	label: string;
	field?: ((row: Row) => string) | string;
	align?: 'left' | 'right' | 'center';
	sortable?: boolean;
	format?: (val: string | number, row: Row) => string | number;
	style?: string;
	classes?: string | void;
	headerClasses?: string;
	headerStyle?: string;
	width?: number;
}

export interface Pagination {
	page: number;
	rowsPerPage: number;
	lastPage?: number;
}

export interface STableProps {
	columns: TableColumn[];
	rows: Row[];
	noDataLabel?: string;
	resizable?: boolean;
	useStickyHeader?: boolean;
	loading?: boolean;
	className?: string;
	children?: ReactNode;
	pagination?: Pagination;
}

const ALIGN_CLASS = {
	left: 'text-left',
	center: 'text-center',
	right: 'text-right',
};

const ALIGN_FLEX_CLASS = {
	left: 'justify-start',
	center: 'justify-center',
	right: 'justify-end',
};

const LOADING_STYLE = {
	'--_m': 'conic-gradient(#0000 10%,#000),linear-gradient(#000 0 0) content-box',
	WebkitMask: 'var(--_m)',
	mask: 'var(--_m)',
	WebkitMaskComposite: 'source-out',
	maskComposite: 'subtract',
};

let useSticky: boolean = false;

const STable = ({
	columns,
	rows,
	noDataLabel = '데이터가 없습니다.',
	resizable = false,
	useStickyHeader = false,
	loading = false,
	className = '',
	children,
	pagination,
}: STableProps) => {
	const [columnWidths, setColumnWidths] = useState<number[]>([]);
	const [innerRows, setInnerRows] = useState<Row[]>(rows);
	const [sortDirections, setSortDirections] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState(pagination?.page || 1);

	// setting pagination
	const { rowsPerPage = rows.length, lastPage } = pagination || {};

	const paginatedRows = pagination
		? innerRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
		: innerRows;

	const lastPageNumber =
		lastPage || pagination ? Math.ceil(rows.length / rowsPerPage) : 1;

	const handleUpdatePagination = (page: number) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		setInnerRows(rows);
		setCurrentPage(pagination?.page || 1); // 초기화 또는 새로고침 시 초기 페이지로 설정
	}, [rows, pagination?.page]);

	const handleResize = (index: number, event: React.MouseEvent) => {
		const startX = event.clientX;
		const startWidth = columnWidths[index];

		const handleMouseMove = (moveEvent: MouseEvent) => {
			const newWidth = Math.max(startWidth + moveEvent.clientX - startX, 50);
			setColumnWidths(
				(prevWidths) =>
					prevWidths.map((width, idx) => (idx === index ? newWidth : width)) // 최소 너비 50px
			);
		};

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	const compareValues = (
		a: string | number,
		b: string | number,
		direction: 'asc' | 'desc',
		format?: (val: string | number, row: Row) => string | number
	) => {
		const valueA = format ? format(a, {}) : a; // format 사용 시
		const valueB = format ? format(b, {}) : b; // format 사용 시

		if (valueA < valueB) return direction === 'asc' ? -1 : 1;
		if (valueA > valueB) return direction === 'asc' ? 1 : -1;
		return 0; // equal
	};

	const handleSort = (index: number) => {
		const newSort = sortDirections[index] === 'asc' ? 'desc' : 'asc';
		setSortDirections((prevDir) =>
			prevDir.map((dir, idx) => (idx === index ? newSort : dir))
		);

		const sortedArr = [...innerRows].sort((a, b) => {
			const field = columns[index].field;
			const column = columns[index] as TableColumn;
			return compareValues(
				typeof field === 'string' ? a[field] : field?.(a),
				typeof field === 'string' ? b[field] : field?.(b),
				newSort,
				column.format
			);
		});

		setInnerRows(sortedArr);
	};

	useEffect(() => {
		setColumnWidths(columns.map((col) => col.width || 100));
		setSortDirections(columns.map((col) => (col.sortable ? 'asc' : '')));
	}, [columns]);

	useEffect(() => {
		setInnerRows(rows);
	}, [rows]);

	useEffect(() => {
		useSticky = useStickyHeader;
	}, [useStickyHeader]);

	const getRowData = (column: TableColumn, row: Row) => {
		const { field, format, name } = column;

		// 기본 필드 선택
		const value = field
			? typeof field === 'string'
				? row[field]
				: field(row)
			: row[name];

		// 포맷 적용
		return format ? format(value, row) : value;
	};

	const renderLoading = () => (
		<div className='s-table__loading absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40'>
			<div
				className='loading aspect-square w-50pxr animate-spin rounded-full bg-positive p-8pxr transition-all'
				style={LOADING_STYLE}
			></div>
		</div>
	);

	const renderNoData = () => (
		<tr>
			<td
				colSpan={columns.length}
				className='before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-white before:bg-opacity-40 before:content-[""]'
			>
				<div className='relative z-50 flex min-h-100pxr items-center justify-center text-Grey_Default '>
					{noDataLabel}
				</div>
			</td>
		</tr>
	);

	const renderCell = (row: Row, column: TableColumn, rowIndex: number) => {
		const cellContent = Children.toArray(children).find(
			(child) =>
				isValidElement(child) && child.props['body-cell-name'] === column.name
		);

		return cellContent ? (
			cloneElement(cellContent as ReactElement, { row, column, rowIndex })
		) : (
			<td
				key={column.name}
				className={[
					'h-48pxr bg-white px-16pxr py-0',
					ALIGN_CLASS[column.align || 'left'],
					rowIndex > 0 ? 'border-t border-t-Grey_Lighten-3' : '',
				].join(' ')}
			>
				{getRowData(column, row)}
			</td>
		);
	};

	const renderRows = () =>
		paginatedRows.map((row, rowIndex) => (
			<tr
				key={rowIndex}
				className='hover:bg-Grey_Lighten-6'
			>
				{columns.map((column) => renderCell(row, column, rowIndex))}
			</tr>
		));

	const renderHeaderCell = (column: TableColumn, colIdx: number) => {
		const headerContent = Children.toArray(children).find(
			(child) =>
				isValidElement(child) && child.props['header-cell-name'] === column.name
		);

		return headerContent ? (
			cloneElement(headerContent as React.ReactElement, {
				column,
				width: columnWidths[colIdx],
			})
		) : (
			<th
				key={column.name}
				className={[
					'relative h-36pxr border-b border-b-Grey_Lighten-3 bg-Blue_C_Lighten-8 px-16pxr py-0 font-medium',
					ALIGN_CLASS[column.align || 'left'],
					useStickyHeader ? 'sticky top-0' : '',
				].join(' ')}
				style={{
					minWidth: `${(columnWidths[colIdx] as number) / 12}rem`,
					maxWidth: `${(columnWidths[colIdx] as number) / 12}rem`,
					width: `${(columnWidths[colIdx] as number) / 12}rem`,
				}}
			>
				<div
					className={[
						'flex items-center',
						ALIGN_FLEX_CLASS[column.align || 'left'],
					].join(' ')}
				>
					<span className='truncate'>{column.label}</span>
					{column.sortable && (
						<button
							className='ml-4pxr'
							onClick={() => handleSort(colIdx)}
						>
							<Icon
								name={sortDirections[colIdx] === 'asc' ? 'LineDown_12' : 'LineUp_12'}
								color='Grey_Default'
							/>
						</button>
					)}
				</div>
				{resizable && colIdx !== columns.length - 1 && (
					<div
						className='absolute right-0 top-1/2 z-50 h-16pxr w-4pxr -translate-y-1/2 cursor-col-resize border-l border-r border-Grey_Lighten-2'
						onMouseDown={(evt) => handleResize(colIdx, evt)}
					/>
				)}
			</th>
		);
	};

	// const useTablePagination = () => {
	// 	const { page, rowsPerPage } = pagination as Pagination;

	// 	const isServerSide = useMemo(() => {
	// 		return pagination?.rowsPerPage as number === 0;
	// 	}, [pagination])

	// 	const firstRowIndex = useMemo(() => {
	// 		return (page - 1) * rowsPerPage
	// 	}, [pagination]);

	// 	const lastRowIndex = useMemo(() => {
	// 		const { page, rowsPerPage } = pagination as Pagination;
	// 		return page * rowsPerPage
	// 	}, [pagination]);

	// 	const isFirstPage = useMemo(() => {
	// 		const { page } = pagination as Pagination;
	// 		return page === 1;
	// 	}, [pagination]);

	// 	const pagesNumber = useMemo(() => {
	// 		const { rowsPerPage } = pagination as Pagination;

	// 			return rowsPerPage === 0
	// 				? 1
	// 				: Math.max(
	// 						1,
	// 						Math.ceil(rows.length / rowsPerPage)
	// 				)

	// 	}, [pagination]);

	// 	const isLastPage = useMemo(() => {
	// 		const { page } = pagination as Pagination;

	// 		return lastRowIndex === 0
	// 				? true
	// 				: page >= pagesNumber
	// 	}, [pagination]);

	// 	console.log('firstRowIndex : ', firstRowIndex)
	// 	console.log('lastRowIndex : ', lastRowIndex)
	// 	console.log('isFirstPage : ', isFirstPage)
	// 	console.log('pagesNumber : ', pagesNumber)
	// 	console.log('isLastPage : ', isLastPage)

	// 	return {
	// 		isServerSide,
	// 		firstRowIndex,
	// 		lastRowIndex,
	// 		isFirstPage,
	// 		pagesNumber,
	// 		isLastPage,
	// 	}
	// }

	// const {
	//  firstRowIndex,
	//  lastRowIndex,
	//  isFirstPage,
	//  isLastPage,
	//  pagesNumber,
	// } = useTablePagination()

	return (
		<>
			<div
				className={[
					's-table relative w-full rounded-8pxr border border-Grey_Lighten-3',
					loading ? 'overflow-hidden' : 'overflow-auto',
					className,
				].join(' ')}
			>
				{loading && renderLoading()}
				<div className={['s-table__inner'].join(' ')}>
					<table
						className={[
							's-table__containter min-w-full table-fixed border-separate border-spacing-0',
						].join(' ')}
					>
						<thead>
							<tr className='border-b border-b-Grey_Lighten-3'>
								{columns.map((column, colIdx) => renderHeaderCell(column, colIdx))}
							</tr>
						</thead>

						<tbody>{paginatedRows.length > 0 ? renderRows() : renderNoData()}</tbody>
					</table>
				</div>
			</div>
			{pagination && (
				<div className='pagination__container flex h-58pxr items-center justify-center rounded-8pxr border border-t-0 border-Grey_Lighten-3 bg-Grey_Lighten-6'>
					<SPagination
						currentPage={currentPage}
						lastPage={lastPageNumber}
						onChange={(page: number) => handleUpdatePagination(page)}
					/>
				</div>
			)}
		</>
	);
};

export default STable;

export interface TableTdProps {
	children:
		| ReactNode
		| ((props: { row: Row; column: TableColumn; rowIndex: number }) => ReactNode);
	row?: Row;
	column?: TableColumn;
	className?: string;
	rowIndex?: number;
}

STable.Td = ({
	children,
	row = {},
	column = {} as TableColumn,
	rowIndex = 0 as number,
	className = '',
}: TableTdProps) => (
	<td
		className={[
			'h-48pxr bg-white px-16pxr py-0',
			ALIGN_CLASS[column?.align || 'left'],
			rowIndex > 0 ? 'border-t border-t-Grey_Lighten-3' : '',
			className,
		].join(' ')}
	>
		{typeof children === 'function'
			? children({ row, column, rowIndex })
			: children}
	</td>
);

export interface TableThProps {
	children: ReactNode | ((props: { column: TableColumn }) => ReactNode);
	column?: TableColumn;
	width?: number;
	className?: string;
}

STable.Th = ({
	children,
	column = {} as TableColumn,
	width,
	className = '',
}: TableThProps) => (
	<th
		className={[
			'relative h-36pxr border-b border-b-Grey_Lighten-3 bg-Blue_C_Lighten-8 px-16pxr py-0 font-medium',
			ALIGN_CLASS[column?.align || 'left'],
			useSticky ? 'sticky top-0' : '',
			className,
		].join(' ')}
		style={{
			minWidth: `${(width as number) / 12}rem`,
			maxWidth: `${(width as number) / 12}rem`,
			width: `${(width as number) / 12}rem`,
		}}
	>
		{typeof children === 'function' ? children({ column }) : children}
	</th>
);
