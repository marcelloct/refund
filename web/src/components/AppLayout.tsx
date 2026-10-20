import { Outlet } from 'react-router';
import { Header } from './Header';

export function AppLayout() {
  return (
    <div className="w-screen h-screen bg-customGray-400 flex flex-col items-center text-customGray-100 px-8">
      <main className="p-3 w-full md:w-150">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
