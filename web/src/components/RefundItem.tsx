import { classMerge } from '../utils/classMerge';

export type RefundItemProps = {
  id: string;
  name?: string;
  description: string;
  amount: string;
  status: string;
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

      <div className="flex flex-1 justify-center">
        <span
          className={classMerge([
            'inline-block bg-gray-200 text-sm rounded-md px-3 py-[4px]',
            data.status === 'rejected' && 'bg-red-200 text-red-800',
            data.status === 'approved' && 'bg-green-200 text-green-800',
          ])}
        >
          {data.status}
        </span>
      </div>

      <span className="text-sm text-customGray-200 font-semibold">
        <small className="font-normal text-customGray-200">$ </small>
        {data.amount}
      </span>
    </a>
  );
}
