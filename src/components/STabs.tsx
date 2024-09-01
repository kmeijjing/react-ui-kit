import React from 'react';

export interface Tabs {
	label: string;
	value?: string;
	link?: string;
	disabled?: boolean;
	tabClassName?: string;
}

export interface STabsProps {
	tabs: Tabs[];
	model: string;
	onChange: (value: string) => void;
	className?: string;
	disabled?: boolean;
	children?: React.ReactNode;
}

const STabs = ({ tabs, model, onChange, children }: STabsProps) => {
	return (
		<>
			<ul className='tabs flex flex-nowrap border-b border-positive text-center '>
				{tabs.map((tab) => (
					<li
						key={tab.value}
						className='cursor-pointer'
					>
						<a
							href={tab.link}
							aria-current='page'
							onClick={() => {
								if (!!tab.value) onChange(tab.value);
							}}
							className={`tab mr-4 inline-block rounded-t-lg border border-b-0 border-Grey_Lighten-2 bg-Grey_Lighten-5 px-32 py-12 text-Grey_Default hover:bg-Grey_Lighten-4 ${model === tab.value && 'border-positive !bg-white font-bold text-positive hover:bg-[#ECF1FC]'}`}
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