// types/sidebar.d.ts

export interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
  }
  
  export interface User {
    role: 'admin' | 'user';
  }
  
