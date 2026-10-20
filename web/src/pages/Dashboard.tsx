import { useState } from 'react';
import searchSvg from '../assets/search.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Pagination } from '../components/Pagination';
import { RefundItem, type RefundItemProps } from '../components/RefundItem';
import { CATEGORIES } from '../utils/categories';
import { formatCurrency } from '../utils/formatCurrency';

const REFUND_EXAMPLE: RefundItemProps = {
  id: '1',
  name: 'John',
  category: 'Transport',
  amount: formatCurrency(120.99),
  categoryImg: CATEGORIES['transport'].icon,
};

export function Dashboard() {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [totalOfPages, setTotalOfPages] = useState(10);
  const [refunds, setRefunds] = useState<RefundItemProps[]>([REFUND_EXAMPLE]);

  function fetchRefunds(e: React.SubmitEvent) {
    e.preventDefault();
  }

  function handlePagination(action: 'previous' | 'next' | 'first' | 'last') {
    setPage((prevPage) => {
      if (action === 'next' && prevPage < totalOfPages) {
        return prevPage + 1;
      }

      if (action === 'last' && prevPage < totalOfPages) {
        return prevPage * 0 + totalOfPages;
      }

      if (action === 'previous' && prevPage > 1) {
        return prevPage - 1;
      }

      if (action === 'first' && prevPage > 1) {
        return prevPage * 0 + 1;
      }

      return prevPage;
    });
  }

  return (
    <div className="bg-customGray-500 rounded-lg p-10">
      <h1 className="text-customGray-100 font-bold text-xl flex-1">
        Solicitations
      </h1>

      <form
        onSubmit={fetchRefunds}
        className="flex flex-1 items-center justify-between pb-6 border-b border-b-customGray-400 md:grow gap-2 mt-6"
      >
        <Input
          placeholder="Search by solicitation name"
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" variant="icon">
          <img src={searchSvg} alt="search icon" className="h-5" />
        </Button>
      </form>
      <div className="my-6 flex flex-col gap-4 max-h-70 overflow-y-scroll">
        {refunds.map((item) => (
          <RefundItem key={item.id} data={item} href={`/refund/${item.id}`} />
        ))}
      </div>

      <Pagination
        current={page}
        total={totalOfPages}
        onNext={() => handlePagination('next')}
        onPrevious={() => handlePagination('previous')}
        onFirst={() => handlePagination('first')}
        onLast={() => handlePagination('last')}
      />
    </div>
  );
}
