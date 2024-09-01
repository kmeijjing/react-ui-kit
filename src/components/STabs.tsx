import React from 'react';

export interface Tab {
	label: string;
	value: string;
	link?: string;
	disabled?: boolean;
	tabClassName?: string;
}

export interface STabsProps {
	tabs: Tab[];
	model: string;
	onChange: (value: string) => void;
	className?: string;
	children?: React.ReactNode;
}

const STabs = ({
	tabs,
	model,
	onChange,
	className = '',
	children,
}: STabsProps) => {
	return (
		<>
			<ul
				className={`tabs flex flex-nowrap border-b border-positive text-center ${className}`}
			>
				{tabs.map((tab) => (
					<li
						key={tab.value}
						className='cursor-pointer'
					>
						<a
							href={tab.link || '#'}
							aria-current={model === tab.value ? 'page' : undefined}
							onClick={(e) => {
								e.preventDefault();
								if (!tab.disabled && !!tab.value) onChange(tab.value);
							}}
							className={`tab mr-4 inline-block rounded-t-lg border border-b-0 border-Grey_Lighten-2 bg-Grey_Lighten-5 px-32 py-12 text-Grey_Default hover:bg-Grey_Lighten-4 ${model === tab.value && 'border-positive !bg-[white] font-bold text-positive hover:bg-[#ECF1FC]'}`}
						>
							{tab.label}
						</a>
					</li>
				))}
			</ul>
			<div className='mt-4'>
				{React.Children.map(children, (child) =>
					React.isValidElement(child) && child.props.value === model ? child : null
				)}
			</div>
		</>
	);
};

export default STabs;
