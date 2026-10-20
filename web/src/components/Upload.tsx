import uploadSvg from '../assets/upload.svg';

type Props = React.ComponentProps<'input'> & {
  filename?: string | null;
};

export function Upload({ filename = null, ...rest }: Props) {
  return (
    <div>
      <legend className="uppercase text-xs mb-2 text-inherit pl-1">
        Receipt
      </legend>
      <div className="w-full h-12 flex items-center rounded-lg border border-customGray-300 text-sm text-customGray-100 bg-transparent outline-none">
        <input type="file" id="upload" className="hidden" {...rest} />
        <span className="text-xs text-customGray-100 flex-1 pl-4">
          {filename ?? 'Select a file'}
        </span>
        <label
          htmlFor="upload"
          className="flex h-12 px-4 items-center bg-customGreen-100 rounded-r-lg cursor-pointer disable:opacity-75 hover:bg-customGreen-200 transition ease-linear"
        >
          <img src={uploadSvg} alt="upload" className="h-6" />
        </label>
      </div>
    </div>
  );
}
