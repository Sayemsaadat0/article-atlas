import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'leading-none transition-all disabled:bg-slate-300 cursor-pointer text-w-small-regular-16 ',
  {
    variants: {
      variant: {
        core: 'rounded-[8px]  text-white py-3 px-8 bg-black hover:bg-black/80 transform hover:scale-105 transition-all duration-200 shadow-lg  transition-all',

        outline:
          'rounded-[8px]  text-s py-3 px-8 border border-black text-black transform hover:scale-105 transition-all duration-200 shadow-lg  transition-all',

        ghost: 'rounded-[8px] bg-s-white text-black py-2 px-3  hover:bg-s-gray transition-all',

        icon: 'rounded-[8px] bg-transparent text-black py-2 px-3  hover:underline transition-all',
      },
    },
    defaultVariants: {
      variant: 'core',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label: string;
  icon?: any;
  reverse?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  label,
  icon,
  reverse = false,
  ...props
}: ButtonProps) => {
  return (
    <button className={`${cn(buttonVariants({ variant, className }))}`} {...props}>
      <div
        className={
          icon &&
          ` flex justify-center items-center   ${reverse ? 'flex-row-reverse ' : 'flex-row'}`
        }
      >
        <span className="whitespace-nowrap   px-3  ">{label}</span>
        {/* md:px-[32px] */}
        {icon && (
          <span>
            <>{icon}</>
          </span>
        )}
      </div>
    </button>
  );
};

export default Button;
