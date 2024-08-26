import React, { Children, useState } from "react";
import Logo from "../../../public/Logo/Logo.png";
import { menuItems } from "./menusData";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  const [menus, setMenus] = useState(menuItems);

  return (
    <>
      <nav className="shadow-lg sticky top-0 bg-white">
        <div className="w-10/12 mx-auto flex justify-between">
          <img src={Logo} className="w-[90px] h-[50px]" />
          <ul className="flex items-center gap-4">
            {menus.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu.path}
                  className="block py-6 hover:bg-black hover:text-white w-[100px] text-center"
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main>
            <Outlet/>
      </main>

      <footer class="bg-gray-800 py-4 mt-10 h-full">
        <div class="container mx-auto text-center text-white">
            &copy; 2024 MyApp. All rights reserved.
        </div>
    </footer>
    </>
  );
};

export default Layout;
