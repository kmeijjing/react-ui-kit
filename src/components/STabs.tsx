import type { ReactElement } from 'react';

type Child = ReactElement;

export interface Tab {
	label: string;
	value: string;
	badge?: string;
	badgeColor?: string;
	badgeTextColor?: string;
	link?: string;
	disabled?: boolean;
	tabClassName?: string;
}

export interface STabsProps {
	tabs: Tab[];
	model: string;
	onChange: (value: string) => void;
	className?: string;
	children?: Child[];
  /**
	 * Tabs size
	 */
  size?: 'sm' | 'lg'
}

const STabs = ({
	tabs,
	model,
	onChange,
	className = '',
 size ='lg',
	children,
}: STabsProps) => {
 const tabSize = {
		sm: 'py-2.5 px-6.5',
		lg: 'py-4 px-10.5',
	};

	return (
		<section className='flex flex-col'>
  <div className={[
   'relative flex flex-nowrap w-full items-center justify-start gap-1.5 before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:bg-Blue_C_Default', 
   className
   ].join(' ')}
  >
				{tabs.map((tab) => (
						<a
       key={tab.value}
       href={tab.link || '#'}
       aria-current={model === tab.value ? 'page' : undefined}
       onClick={(e) => {
        e.preventDefault();
        if (!tab.disabled && !!tab.value) onChange(tab.value);
       }}
       className={[
        'cursor-pointer rounded-t-1.5 border-x border-t inline-flex flex-nowrap tab gap-4 items-center',
        tabSize[size],
        model === tab.value
         ? 'border-Blue_C_Default bg-white font-bold text-Blue_C_Default'
         : 'border-Grey_Lighten-2 bg-Grey_Lighten-5 text-Grey_Default',
       ].join(' ')}
						>
							<span>{tab.label}</span>
							{tab.badge && (
								<span
									className={[
          'badge text-[10px] rounded-1.5 py-[1px] flex items-center px-2',
          model === tab.value 
          ? `text-${tab.badgeTextColor || 'white'} bg-${tab.badgeColor || 'positive'}`
          : 'text-Grey_Darken-1 bg-Grey_Lighten-4',
          ].join(' ')}
          >
									{tab.badge}
								</span>
							)}
						</a>
				))}
			</div>
			<div className='mt-4'>
				{children?.map((child) =>
					child.props.value === model ? child : null
				)}
			</div>
		</section>
	);
};

export default STabs;
