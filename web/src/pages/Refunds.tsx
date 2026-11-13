import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { RefundItem, type RefundItemProps } from '../components/RefundItem';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { CATEGORIES } from '../utils/categories';
import { formatCurrency } from '../utils/formatCurrency';

// const REFUND_EXAMPLE: RefundItemProps = {
//   id: '1',
//   name: 'John',
//   category: 'Transport',
//   amount: formatCurrency(120.99),
//   categoryImg: CATEGORIES['transport'].icon,
// };

export function Refunds() {
  const auth = useAuth();
  const [page, setPage] = useState(1);
  const [refunds, setRefunds] = useState<RefundItemProps[]>([]);

  async function fetchRefunds() {
    try {
      const response = await api.get<UserRefundsAPIResponse>(
        `/my-refunds/${auth.session?.user.id}`
      );
      console.log(response);
      const rawRefunds = response.data?.refunds || [];
      setRefunds(
        rawRefunds.map((refund) => ({
          id: refund.id,
          description: refund.name,
          status: refund.status,
          amount: formatCurrency(refund.amount),
          categoryImg: CATEGORIES[refund.category].icon,
        }))
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }
      alert('Unable to load data');
    }
  }

  useEffect(() => {
    fetchRefunds();
  }, [page]);

  return (
    <div className="bg-customGray-500 rounded-lg p-10">
      <h1 className="text-customGray-100 font-bold text-xl flex-1">
        Solicitations
      </h1>

      <div className="my-6 flex flex-col gap-4 max-h-70 overflow-y-scroll">
        {refunds.map((item) => (
          <RefundItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
