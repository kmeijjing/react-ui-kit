import colors from '../css/colors';

const SLoading = ({
	size = '80pxr',
	color = 'Blue_C_Default',
	type = 1,
	className = '',
}: {
	size?: string;
	color?: keyof typeof colors;
	type?: number;
	className?: string;
}) => {
	return (
		<div
			className={[
				`w-${size} h-${size} text-${color} animate-spin`,
				className,
			].join('')}
		>
			{type === 1 && (
				<svg
					width='100%'
					height='100%'
					viewBox='0 0 81 80'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M74.5005 40C74.5005 44.4649 73.621 48.8862 71.9124 53.0112C70.2037 57.1363 67.6993 60.8844 64.5421 64.0416C61.3849 67.1988 57.6368 69.7032 53.5117 71.4119C49.3866 73.1206 44.9654 74 40.5005 74C36.0355 74 31.6143 73.1206 27.4892 71.4119C23.3642 69.7032 19.616 67.1988 16.4589 64.0416C13.3017 60.8844 10.7972 57.1363 9.08858 53.0112C7.37992 48.8862 6.50049 44.4649 6.50049 40C6.50049 35.535 7.37992 31.1138 9.08859 26.9888C10.7972 22.8637 13.3017 19.1156 16.4589 15.9584C19.6161 12.8012 23.3642 10.2968 27.4893 8.58809C31.6143 6.87943 36.0355 6 40.5005 6C44.9654 6 49.3867 6.87944 53.5117 8.5881C57.6368 10.2968 61.3849 12.8012 64.5421 15.9584C67.6993 19.1156 70.2037 22.8637 71.9124 26.9888C73.621 31.1138 74.5005 35.5351 74.5005 40L74.5005 40Z'
						stroke='#EEEEEE'
						stroke-width='12'
					/>
					<path
						d='M40.5005 6.00001C45.866 6.00001 51.1554 7.26988 55.9362 9.70579C60.7169 12.1417 64.8533 15.6745 68.0071 20.0153C71.1609 24.3561 73.2425 29.3817 74.0819 34.6812C74.9212 39.9807 74.4944 45.4036 72.8364 50.5066C71.1784 55.6095 68.3361 60.2476 64.5421 64.0416C60.7481 67.8357 56.11 70.6779 51.0071 72.3359C45.9041 73.994 40.4812 74.4208 35.1817 73.5814C29.8822 72.742 24.8566 70.6604 20.5158 67.5066'
						stroke='currentColor'
						stroke-width='12'
						stroke-linecap='round'
						strokeMiterlimit='1'
						className='animate-qmatDash'
					/>
				</svg>
			)}

			{type === 2 && (
				<svg
					width='100%'
					height='100%'
					viewBox='25 25 50 50'
					className={['animate-qmatDash', className].join(' ')}
				>
					<circle
						cx='50'
						cy='50'
						r='20'
						fill='none'
						stroke='currentColor'
						strokeWidth='6'
						strokeMiterlimit='1'
					></circle>
				</svg>
			)}
		</div>
	);
};

export default SLoading;
