import logo from "../public/mountain.png";

export default function Footer() {
  return (
    <footer className="p-4 bg-primary-100 border-gray-200 rounded-t-md shadow-2xl md:px-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <img src={logo} className="h-8 mr-3" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Wanderlust
          </span>
        </div>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-primary-300 sm:mx-auto lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center">
        © <div className="hover:underline">Wanderlust Inc.</div> All Rights
        Reserved.
      </span>
    </footer>
  );
}
