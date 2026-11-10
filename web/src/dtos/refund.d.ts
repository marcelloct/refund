type RefundAPIResponse = {
  id: string;
  name: string;
  category: CategoriesAPIEnum;
  status: StatusAPIEnum;
  amount: number;
  filename: string;
  user: {
    name: string;
  };
};

type RefundsPaginationAPIResponse = {
  refunds: RefundAPIResponse[];
  pagination: {
    page: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
  };
};
