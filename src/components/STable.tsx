import { useState, useEffect, useCallback } from 'react';
import Icon from './Icon';

export interface TableColumn {
	name: string;
	label: string;
	field: string;
	align?: 'left' | 'right' | 'center';
	sortable?: boolean;
	format?: (val: any, row: any) => void;
	style?: string;
	classes?: string | void;
	headerClasses?: string;
	headerStyle?: string;
	width?: number;
}

export interface STableProps {
	columns: TableColumn[];
	rows: any[];
	noDataLabel?: string;
	resizable?: boolean;
	useStickyHeader?: boolean;
	height?: number;
	loading?: boolean;
	className?: string;
}

const STable = ({
	columns,
	rows,
	noDataLabel = '데이터가 없습니다.',
	resizable = false,
	useStickyHeader = false,
	height,
	loading = false,
	className = '',
}: STableProps) => {
	const [columnWidths, setColumnWidths] = useState<number[]>([]);
	const [sortDirections, setSortDirections] = useState<string[]>([]);

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

	const handleSort = (index: number) => {
		const newSort = sortDirections[index] === 'asc' ? 'desc' : 'asc';
		setSortDirections((prevDir) =>
			prevDir.map((dir, idx) => (idx === index ? newSort : dir))
		);

		[...rows].sort((a, b) => {
			const field = columns[index].field;
			const column = columns[index] as TableColumn;

			const valA = column.format ? column.format(a[field], a) : a[field];
			const valB = column.format ? column.format(b[field], b) : b[field];

			return newSort === 'asc'
				? valA.localeCompare(valB)
				: valB.localeCompare(valA);
		});
	};

	useEffect(() => {
		setColumnWidths(columns.map((col) => col.width || 100));
		setSortDirections(columns.map((col) => (col.sortable ? 'asc' : '')));
	}, [columns]);

	const loadingStyle = {
		'--_m':
			'conic-gradient(#0000 10%,#000),linear-gradient(#000 0 0) content-box',
		WebkitMask: 'var(--_m)',
		mask: 'var(--_m)',
		WebkitMaskComposite: 'source-out',
		maskComposite: 'subtract',
	};

	const alignClass = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right',
	};

	const alignFlexClass = {
		left: 'justify-start',
		center: 'justify-center',
		right: 'justify-end',
	};

	const renderLoading = () => (
		<div className='s-table__loading absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40'>
			<div
				className='loading aspect-square w-50pxr animate-spin rounded-full bg-positive p-8pxr transition-all'
				style={loadingStyle}
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

	const renderCell = (row: any, column: TableColumn, rowIndex: number) => (
		<td
			key={column.name}
			className={[
				'h-48pxr bg-white px-16pxr py-0',
				alignClass[column.align || 'left'],
				rowIndex > 0 ? 'border-t border-t-Grey_Lighten-3' : '',
			].join(' ')}
		>
			{column.format ? column.format(row[column.field], row) : row[column.field]}
		</td>
	);

	const renderRows = () =>
		rows.map((row, rowIndex) => (
			<tr
				key={rowIndex}
				className='hover:bg-Grey_Lighten-6'
			>
				{columns.map((column) => renderCell(row, column, rowIndex))}
			</tr>
		));

	const renderHeader = () =>
		columns.map((column, colIdx) => (
			<th
				key={column.name}
				className={[
					'relative h-36pxr border-b border-b-Grey_Lighten-3 bg-Blue_C_Lighten-8 px-16pxr py-0 font-medium',
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
						'flex flex-nowrap items-center',
						alignFlexClass[column.align || 'left'],
					].join(' ')}
				>
					{/* 말줄임 처리 추가 */}
					<span className='truncate'>{column.label}</span>

					{/* 정렬 버튼 추가 */}
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
				{resizable && (
					<div
						className='absolute right-0 top-1/2 z-50 h-16pxr w-4pxr -translate-y-1/2 cursor-col-resize border-l border-r border-Grey_Lighten-2'
						onMouseDown={(evt) => handleResize(colIdx, evt)}
					/>
				)}
			</th>
		));

	return (
		<div
			className={[
				's-table relative w-full overflow-hidden rounded-8pxr border border-Grey_Lighten-3',
				`h-${height}pxr`,
				className,
			].join(' ')}
		>
			{loading && renderLoading()}
			<div
				className={['s-table__inner overflow-auto', `h-${height}pxr`].join(' ')}
			>
				<table
					className={[
						's-table__containter min-w-full table-fixed border-separate border-spacing-0',
					].join(' ')}
				>
					<thead>
						<tr className='border-b border-b-Grey_Lighten-3'>{renderHeader()}</tr>
					</thead>

					<tbody>{rows.length === 0 ? renderNoData() : renderRows()}</tbody>
				</table>
			</div>
		</div>
	);
};

export default STable;
