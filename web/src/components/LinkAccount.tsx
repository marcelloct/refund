type Props = React.ComponentProps<'a'> & {
  linkContext: string;
};

export function LinkAccount({
  linkContext,
  children,
  href = '/',
  ...rest
}: Props) {
  return (
    <div className="text-sm mt-6 mb-2 text-center">
      <span className="mr-1">{linkContext}</span>
      <a
        href={href}
        className="font-semibold text-customGray-100  hover:text-customGreen-200 transition ease-linear"
        {...rest}
      >
        {children}
      </a>
    </div>
  );
}
