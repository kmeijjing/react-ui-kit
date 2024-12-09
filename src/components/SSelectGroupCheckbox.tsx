import SCheckbox from './SCheckbox';
import Select from './select/Select';

type Option = {
	id: number | string;
	label: string;
};

export type Group = {
	id: number | string;
	label: string;
	options: Option[];
};

export type Selected = (number | string)[];

export interface SSelectGroupCheckboxProps {
	options: Group[];
	selected: Selected;
	setSelected?: (selected: Selected) => void;
}

const SSelectGroupCheckbox = ({
	options,
	selected,
	setSelected,
}: SSelectGroupCheckboxProps) => {
	// 전체 선택/해제
	const toggleSelectAll = (isChecked: boolean) => {
		if (isChecked) {
			const allOptionIds = options.flatMap((group) =>
				group.options.map((opt) => opt.id)
			);
			setSelected?.(allOptionIds);
		} else {
			setSelected?.([]);
		}
	};

	// 그룹 선택/해제
	const toggleGroup = (groupId: number | string, isChecked: boolean) => {
		const groupOptions =
			options
				.find((group) => group.id === groupId)
				?.options.map((opt) => opt.id) || [];
		setSelected?.((prev: Selected) => {
			if (isChecked) {
				return [...new Set([...prev, ...groupOptions])];
			} else {
				return prev.filter((id) => !groupOptions.includes(id));
			}
			// return [];
		});
	};

	// 옵션 선택/해제
	const toggleOption = (optionId: number | string, isChecked: boolean) => {
		setSelected?.((prev: Selected) => {
			if (isChecked) {
				return [...prev, optionId];
			} else {
				return prev.filter((id) => id !== optionId);
			}
		});
	};

	// 체크 상태 계산
	const isOptionChecked = (optionId: number | string) =>
		selected?.includes(optionId);

	const isGroupChecked = (groupId: number | string) => {
		const groupOptions =
			options
				.find((group) => group.id === groupId)
				?.options.map((opt) => opt.id) || [];
		return groupOptions.every((id) => selected?.includes(id));
	};

	const isAllChecked = options
		.flatMap((group) => group.options.map((opt) => opt.id))
		.every((id) => selected?.includes(id));

	return (
		<div className=''>
			<Select selected={''} />
			{/* 전체 선택 */}
			<div className='h-32pxr px-16pxr'>
				<SCheckbox
					checked={isAllChecked}
					label='전체'
					onChange={(val) => toggleSelectAll(val as boolean)}
				/>
			</div>

			{/* 그룹별 체크박스 */}
			{options.map((group) => (
				<div
					key={group.id}
					className=''
				>
					{/* 그룹 선택 */}
					<div className='h-32pxr px-12pxr'>
						<SCheckbox
							checked={isGroupChecked(group.id)}
							label={group.label}
							onChange={(val) => toggleGroup(group.id, val as boolean)}
						/>
					</div>

					{/* 옵션 선택 */}
					<div className=''>
						{group.options.map((option, optionIdx) => (
							<div
								key={optionIdx}
								className='h-32pxr px-16pxr'
							>
								<SCheckbox
									checked={isOptionChecked(option.id)}
									label={option.label}
									onChange={(val) => toggleOption(option.id, val as boolean)}
								/>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default SSelectGroupCheckbox;
