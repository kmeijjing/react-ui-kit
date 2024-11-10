import STable, { TableColumn } from '../components/STable';

const Table = () => {
	const tableColumns: TableColumn[] = [
		{
			name: 'product_name',
			label: '상품명',
			field: 'product_name',
			sortable: true,
			width: 200,
		},
		{
			name: 'product_code',
			label: '상품 코드',
			field: 'product_code',
			width: 150,
		},
		{
			name: 'option_name',
			label: '옵션명',
			field: 'option_name',
			width: 150,
		},
		{
			name: 'option_code',
			label: '옵션 코드',
			field: 'option_code',
			width: 150,
		},
		{
			name: 'status',
			label: '상태',
			field: 'status',
			width: 100,
			align: 'center',
			sortable: true,
		},
		{
			name: 'action',
			label: '',
			field: '',
			width: 100,
			align: 'center',
		},
	];

	const tableRows = [
		{
			product_name: '상품1',
			product_code: 'P001',
			option_name: '옵션1',
			option_code: 'O001',
			status: '판매중',
			action: <button>삭제</button>,
		},
		{
			product_name: '상품2',
			product_code: 'P002',
			option_name: '옵션2',
			option_code: 'O002',
			status: '판매중',
			action: <button>삭제</button>,
		},
		{
			product_name: '상품3',
			product_code: 'P003',
			option_name: '옵션3',
			option_code: 'O003',
			status: '판매중',
			action: <button>삭제</button>,
		},
		{
			product_name: '상품4',
			product_code: 'P004',
			option_name: '옵션4',
			option_code: 'O004',
			status: '판매중',
			action: <button>삭제</button>,
		},
		{
			product_name: '상품5',
			product_code: 'P005',
			option_name: '옵션5',
			option_code: 'O005',
			status: '판매중',
			action: <button>삭제</button>,
		},
	];
	return (
		<>
			<STable
				columns={tableColumns}
				rows={tableRows}
				resizable
			/>

			<STable
				columns={tableColumns}
				rows={tableRows}
				useStickyHeader
				className='h-160pxr'
			/>

			<STable
				columns={tableColumns}
				rows={tableRows}
				useStickyHeader
				className='h-160pxr'
			>
				<STable.Td body-cell-name='product_name'>커스텀</STable.Td>
			</STable>
		</>
	);
};

export default Table;
