type Props = React.ComponentProps<'input'> & {
  legend?: string;
};

export function Input({ legend, type = 'text', ...rest }: Props) {
  return (
    <fieldset className="flex flex-1 max-h-20 focus-within:text-customGreen-100 text-customGray-200">
      {legend && (
        <legend className="uppercase text-xs mb-2 text-inherit pl-1">
          {legend}
        </legend>
      )}
      <input
        type={type}
        {...rest}
        className="w-full h-12 rounded-lg border border-customGray-300 px-4 text-sm text-customGray-100 bg-transparent outline-none focus:border-2 focus:border-customGreen-100 placeholder-gray-400"
      />
    </fieldset>
  );
}
