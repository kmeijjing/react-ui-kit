import type { ReactElement } from 'react';
import colors from '../css/colors.ts';

type Child = ReactElement;

export interface Tab {
	label: string;
	value: string;
	badge?: string;
	badgeColor?: keyof typeof colors;
	badgeTextColor?: keyof typeof colors;
	link?: string;
	disabled?: boolean;
	tabClassName?: string;
}

export interface STabsProps {
	tabs: Tab[];
	value: string;
	onChange: (value: string) => void;
	className?: string;
	children?: Child[];
	/**
	 * Tabs size
	 */
	size?: 'sm' | 'lg';
}

const STabs = ({
	tabs,
	value,
	onChange,
	className = '',
	size = 'lg',
	children,
}: STabsProps) => {
	const tabSize = {
		sm: 'h-36pxr py-8pxr px-20pxr',
		lg: 'h-44pxr py-12pxr px-32pxr ',
	};

	return (
		<section className='flex flex-col'>
			<div
				className={[
					'flex w-full flex-nowrap items-center justify-start gap-4pxr border-b border-b-positive',
					className,
				].join(' ')}
			>
				{tabs.map((tab) => (
					<a
						key={tab.value}
						href={tab.link || '#'}
						aria-current={value === tab.value ? 'page' : undefined}
						onClick={(e) => {
							e.preventDefault();
							if (!tab.disabled && !!tab.value) onChange(tab.value);
						}}
						className={[
							'tab rounded-t-4pxr inline-flex cursor-pointer flex-nowrap items-center border-x border-t ',
							tabSize[size],
							value === tab.value
								? 'border-Blue_C_Default bg-white font-bold text-Blue_C_Default hover:bg-Blue_C_Default/[0.08]'
								: 'border-Grey_Lighten-2 bg-Grey_Lighten-5 text-Grey_Default hover:bg-Grey_Lighten-4',
						].join(' ')}
					>
						<span>{tab.label}</span>
						{tab.badge && (
							<span
								className={[
									'badge rounded-4pxr text-10pxr ml-4pxr flex h-20pxr items-center px-5pxr py-1pxr',
									value === tab.value
										? `text-[${tab.badgeTextColor ? colors[tab.badgeTextColor] : colors.white}] bg-[${tab.badgeColor ? colors[tab.badgeColor] : colors.Blue_C_Default}]`
										: 'bg-Grey_Lighten-4 text-Grey_Darken-1',
								].join(' ')}
							>
								{tab.badge}
							</span>
						)}
					</a>
				))}
			</div>
			<div>
				{children?.map((child) => (child.props.value === value ? child : null))}
			</div>
		</section>
	);
};

export default STabs;
