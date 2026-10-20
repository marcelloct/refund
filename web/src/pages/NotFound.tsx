export function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-customGray-400">
      <span className="text-8xl text-customGray-200 font-bold mb-2">404</span>
      <span className="text-lg text-customGray-200 uppercase font-medium tracking-wide">
        Page not found
      </span>
      <a
        href="/"
        className="underline underline-offset-4 text-customGreen-100 hover:text-customGreen-200 transition ease-linear font-bold mt-8"
      >
        Back
      </a>
    </div>
  );
}
