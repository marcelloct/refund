export type RefundItemProps = {
  id: string;
  name: string;
  description: string;
  amount: string;
  categoryImg: string;
};

type Props = React.ComponentProps<'a'> & {
  data: RefundItemProps;
};

export function RefundItem({ data, ...rest }: Props) {
  return (
    <a
      {...rest}
      className="flex items-center gap-3 hover:bg-customGreen-100/5 cursor-pointer rounded-md p-2"
    >
      <img src={data.categoryImg} alt="category icon" className="h-8" />

      <div className="flex flex-col flex-1">
        <strong className="text-sm text-customGray-100 capitalize">
          {data.name}
        </strong>
        <span className="text-xs text-customGray-200 capitalize">
          {data.description}
        </span>
      </div>

      <span className="text-sm text-customGray-200 font-semibold">
        <small className="font-normal text-customGray-200">$ </small>
        {data.amount}
      </span>
    </a>
  );
}
