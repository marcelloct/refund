import { Outlet } from 'react-router';
import logo from '../assets/logo.svg';

export function AuthLayout() {
  return (
    <div className="w-screen h-screen bg-customGray-400 flex flex-col justify-center items-center text-customGray-100 px-8">
      <main className="bg-customGray-500 p-8 rounded-md flex flex-col items-center w-full md:w-115.5 pt-12">
        <img src={logo} alt="logo" className="mb-6" />
        <Outlet />
      </main>
    </div>
  );
}
