import DropdownUser from "./DropdownUser";
import { ImMenu } from "react-icons/im";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-10 flex w-full bg-slate-200 drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-row-reverse lg:flex-row  w-full   items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* <!-- Hamburger Toggle BTN --> */}
        <ImMenu
          onClick={(e) => {
            e.stopPropagation();
            props.setSidebarOpen(!props.sidebarOpen);
          }}
          className="z-50 text-3xl block   lg:hidden"
        />

        <span className="">
          <DropdownUser />
        </span>
      </div>
    </header>
  );
};

export default Header;
