import { useState } from 'react';
import STooltip from '../components/STooltip';
import SButton from '../components/SButton';

const Tooltip = () => {
	const [showTooltip, setShowTooltip] = useState<boolean>(false);

	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div className='h-100pxr'></div>
			<div>
				<b>Tooltip</b>
			</div>
			<div className='flex items-center justify-center gap-8pxr'>
				<STooltip
					placement='top'
					icon='HelpOutline_24'
					className='text-info'
				>
					<STooltip.Body>
						<div>이것은 위쪽 툴팁입니다.</div>
						<div>이것은 위쪽 툴팁입니다.</div>
						<div>이것은 위쪽 툴팁입니다.</div>
						<div>이것은 위쪽 툴팁입니다.</div>
					</STooltip.Body>
				</STooltip>
				<STooltip
					placement='top'
					label='top Tooltip'
				>
					<STooltip.Body>
						<div>이것은 위쪽 툴팁입니다.</div>
					</STooltip.Body>
				</STooltip>
				<STooltip
					label='bottom Tooltip'
					color='info'
					buttonOptions={{ outline: true }}
				>
					<STooltip.Body>bottom</STooltip.Body>
				</STooltip>
				<STooltip
					placement='right'
					label='right Tooltip'
				>
					<STooltip.Body>
						<div>이것은 오른쪽 툴팁입니다.</div>
						<div>이것은 오른쪽 툴팁입니다.</div>
						<div>이것은 오른쪽 툴팁입니다.</div>
						<div>이것은 오른쪽 툴팁입니다.</div>
						<div>이것은 오른쪽 툴팁입니다.</div>
					</STooltip.Body>
				</STooltip>

				<STooltip
					placement='left'
					label='left Tooltip'
				>
					<STooltip.Body>
						<div>left</div>
					</STooltip.Body>
				</STooltip>

				<STooltip
					trigger='click'
					placement='left'
					icon='HelpOutline_24'
					label='click left Tooltip'
					color='warning'
					useClose
					buttonOptions={{ outline: true }}
				>
					<STooltip.Body>
						<div>이것은 왼쪽 툴팁입니다.</div>
						<div>이것은 왼쪽 툴팁입니다.</div>
						<div>이것은 왼쪽 툴팁입니다.</div>
						<div>이것은 왼쪽 툴팁입니다.</div>
						<div>이것은 왼쪽 툴팁입니다.</div>
					</STooltip.Body>
				</STooltip>
			</div>

			<div className='flex items-center justify-center gap-8pxr'>
				<STooltip
					trigger='click'
					usePopover
					label='usePopover'
					tooltipClassName='max-w-230pxr'
				>
					<STooltip.Body>
						Popovers allow you to provide users with more information in a composite
						way.
					</STooltip.Body>
					<STooltip.Footer className='flex items-center justify-between'>
						<SButton
							color='Blue_B_Darken-2'
							label='button'
							className='!px-0'
						/>{' '}
						<SButton
							color='positive'
							label='Main Button'
						/>
					</STooltip.Footer>
				</STooltip>

				<STooltip
					trigger='click'
					usePopover
					icon='HelpOutline_24'
					label='click trigger@@'
					placement='right'
					useClose
					tooltipClassName='max-w-230pxr'
				>
					<STooltip.Body>
						Popovers allow you to provide users with more information in a composite
						way.
					</STooltip.Body>
					<STooltip.Title>sss</STooltip.Title>
					<STooltip.Footer className='flex items-center justify-between'>
						<SButton
							color='Blue_B_Darken-2'
							label='button'
							className='!px-0'
						/>{' '}
						<SButton
							color='positive'
							label='Main Button'
						/>
					</STooltip.Footer>
				</STooltip>

				<div className='inline-flex items-center'>
					<SButton
						label='show hide tooltip'
						onClick={() => setShowTooltip(!showTooltip)}
					/>

					<STooltip
						trigger='click'
						usePopover
						label='tooltip'
						placement='right'
						value={showTooltip}
					>
						<STooltip.Body>
							이것은 아래쪽 툴팁입니다. 이것은 아래쪽 툴팁입니다. 이것은 아래쪽
							툴팁입니다.이것은 아래쪽 툴팁입니다.
						</STooltip.Body>
					</STooltip>
				</div>
			</div>
		</div>
	);
};

export default Tooltip;
