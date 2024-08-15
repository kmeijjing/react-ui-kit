import colors from '../css/colors.ts'
import Svg from './Svg.tsx'
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
 /**
   * Button disable
   */
 disabled?: boolean;
}

export const SButton = ({
 label,
 size = 'sm',
 color = 'Blue_B_Default',
 outline = false,
 icon,
 disabled,
 noHover,
 className,
 ...props
}: ButtonProps) => {
 const argColor = colors[color] || color
 const propsColor = !outline ? `bg-[${argColor}] text-white` : `text-[${argColor}] border border-[${argColor}]`

 const propsSize = {
  xs: !icon ? 'px-2 py-0.5' : 'p-1',
  sm: !icon ? 'py-1 px-3' : 'p-1.5',
  md: !icon ? 'py-1 px-5' : 'p-[0.563rem]',
  lg: !icon ? 'py-4 px-7' : 'p-[1.438rem]',
 }

 const disableClass = 'disabled:bg-Grey_Lighten-3 disabled:border disabled:border-Grey_Lighten-2 disabled:text-Grey_Default disabled:cursor-not-allowed'

 const iconMargin = label ? 'mr-1' : ''

 const hover = 'hover:overflow-hidden hover:relative hover:before:w-full hover:before:h-full hover:before:top-0 hover:before:left-0 hover:before:absolute'

 const hoverClass = !outline 
 ? 'hover:before:bg-black hover:before:opacity-10' 
 : `hover:before:bg-[${argColor}] hover:before:opacity-20`

 return (
  <button
   className={[
    's-button rounded-4 text-xs leading-5 inline-flex items-center',
    propsColor,
    propsSize[size],
    disabled ? disableClass : !noHover ? `${hoverClass} ${hover}` : '' ,
    className,
   ].join(' ')}
   {...props}
   disabled={disabled}
  >
   {icon && (
    !icon.includes('.svg')
     ? <Svg svgString={icon} className={iconMargin} />
     : <img className={iconMargin} src={icon}></img>
   )}
   {label}
  </button>
 );
};
