import { Navigate, useLocation } from 'react-router';
import successSvg from '../assets/success.svg';

export function Confirm() {
  const location = useLocation();

  // Grants that Confirm page cannot be accessed directly by url
  if (!location.state?.fromSubmit) {
    return <Navigate to="/" />;
  }
  return (
    <div className="bg-customGray-500 md:w-150 rounded-lg flex flex-col items-center p-10 gap-6">
      <h1 className="capitalize text-2xl font-bold text-center text-customGreen-100">
        Your request has sent!
      </h1>
      <img src={successSvg} alt="success icon" className="h-28" />
      <p className="text-sm leading-normal text-customGray-200 text-center">
        Now, all you have to do is wait! Your request will be reviewed, and the
        finance department will be in touch with you shortly.
      </p>
      <a
        href="/"
        className="capitalize w-full p-3 text-center bg-customGreen-100 rounded-md text-customGray-500 hover:bg-customGreen-200 transition ease-linear"
      >
        Make a new request
      </a>
    </div>
  );
}
