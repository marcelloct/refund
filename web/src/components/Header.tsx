import logo from '../assets/logo.svg';
import logout from '../assets/logout.svg';

export function Header() {
  return (
    <header className="w-full flex justify-between">
      <img src={logo} alt="logo" className="my-8" />
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-customGray-200">
          Welcome, Guest
        </span>
        <img
          src={logout}
          alt="logout"
          className="h-5 my-8 cursor-pointer hover:opacity-75 transition ease-linear"
        />
      </div>
    </header>
  );
}
