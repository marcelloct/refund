import { classMerge } from '../utils/classMerge';

type Props = React.ComponentProps<'button'> & {
  isLoading?: boolean;
  variant?: 'base' | 'icon' | 'small';
};

const variants = {
  button: {
    base: 'h-12',
    icon: 'w-12 h-12',
    small: 'w-8 h-8',
  },
};

export function Button({
  children,
  isLoading,
  className,
  type = 'button',
  variant = 'base',
  ...rest
}: Props) {
  return (
    <button
      type={type}
      disabled={isLoading}
      {...rest}
      className={classMerge([
        'flex justify-center items-center rounded-lg bg-customGreen-100 text-customGray-500 cursor-pointer hover:bg-customGreen-200 transition ease-linear disabled:opacity-50 ',
        variants.button[variant],
        isLoading && 'disabled:cursor-progress',
        className,
      ])}
    >
      {children}
    </button>
  );
}
