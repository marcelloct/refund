import { Route, Routes } from 'react-router';

import { AppLayout } from '../components/AppLayout';

import { Confirm } from '../pages/Confirm';
import { NotFound } from '../pages/NotFound';
import { Refund } from '../pages/Refund';
import { Refunds } from '../pages/Refunds';

export function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Refund />} />
        <Route path="/refunds" element={<Refunds />} />
        <Route path="/confirm" element={<Confirm />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
