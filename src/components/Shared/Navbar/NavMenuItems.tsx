
// Type Definitions
type LinkItem = {
    label: string;
    path: string;
  };
  
  type DropdownColumn = {
    links: LinkItem[];
  };
  
  type MenuItem = {
    label: string;
    path?: string;
    dropdown?: boolean;
    id?: string;
    columns?: DropdownColumn[];
  };
  
  export const menuItems: MenuItem[] = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Services",
      path: "/services",
    },
    {
      label: "Pages",
      dropdown: true,
      id: "PagesDropdown",
      columns: [
        {
          links: [
            { label: "Team", path: "/team" },
            { label: "Booking", path: "/booking" },
            { label: "Signup", path: "/signup" },
            { label: "Login", path: "/login" },
            { label: "FAQ", path: "/faq" },
          ],
        },
      ],
    },
  ];