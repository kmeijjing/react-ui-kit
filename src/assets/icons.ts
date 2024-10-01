import { HelpOutline16, HelpOutline24 } from './HelpOutline';
import { SVGProps } from 'react';

export const icons: Record<
	string,
	Record<number, React.ComponentType<SVGProps<SVGSVGElement>>>
> = {
	HelpOutline: {
		16: HelpOutline16,
		24: HelpOutline24,
	},
};
