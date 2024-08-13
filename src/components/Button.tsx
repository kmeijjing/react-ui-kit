import colors from '../css/colors.ts'
export interface ButtonProps {
 /**
  * How large should the button be?
  */
 size?: 'xs' | 'sm' | 'md' | 'lg';
 /**
  * What background color to use
  */
 color?: keyof typeof colors;
 /**
  * Did you use Button hover style?
  */
 noHover?: boolean;
 /**
  * Button contents
  */
 label?: string;
 /**
  * Optional click handler
  */
 onClick?: () => void;
 /**
  * Button ClassName
  */
 className?: string;
 /**
  * Button type
  */
 type?: HTMLButtonElement['type'];
 /**
  * Button Outline
  */
 outline?: boolean;
 /**
  * Button Icon
  */
 icon?: string;
}

export const Button = ({
 label,
 size = 'sm',
 color = 'Blue_B_Default',
 outline = false,
 ...props
}: ButtonProps) => {
 const propsColor = !outline ? `bg-[${colors[color]}] text-white` : `text-[${colors[color]}] border-[${colors[color]}]`

 const propsSize = {
  xs: 'px-2 py-0.5',
  sm: 'py-1 px-3',
  md: 'py-1 px-5',
  lg: 'py-4 px-7'
 }

 return (
  <button
   className={['s-button rounded-4 text-xs leading-5', propsColor, propsSize[size]].join(' ')}
   {...props}
  >
   {label}
  </button>
 );
};
