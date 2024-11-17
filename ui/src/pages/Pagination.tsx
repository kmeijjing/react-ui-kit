import React from 'react';
import SPagination from '../components/SPagination';

const Pagination = () => {
	return (
		<div className='h-6000 flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>Pagination</b>
			</div>
			<div className=''>
				<SPagination
					currentPage={1}
					lastPage={50}
				/>

				<SPagination
					currentPage={1}
					lastPage={50}
					usePerPageSelect
				/>
			</div>
		</div>
	);
};

export default Pagination;
