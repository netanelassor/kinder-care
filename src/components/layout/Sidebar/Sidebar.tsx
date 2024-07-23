import UserAvatar from "../../Shared/Avatar";
import { Sidebar } from "flowbite-react";
import logo from "../../../assets/favicon.ico";
import { PiBooksDuotone, PiStudent, PiWechatLogoDuotone } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { GrMoney } from "react-icons/gr";
import { NavItemType } from "./SidebarItem.type";
import { NavLink } from "react-router-dom";

export function SidebarNav() {
  const SidebarList: NavItemType[] = [
    {
      name: "Home",
      routeName: "/home",
      iconName: IoHomeOutline,
      icon: <IoHomeOutline />,
    },
    {
      name: "My Classes",
      routeName: "/my-classes",
      iconName: BiCategory,
      icon: <BiCategory />,
    },
    {
      name: "Messaging",
      routeName: "/messages",
      iconName: PiWechatLogoDuotone,
      icon: <PiWechatLogoDuotone />,
    },
    {
      name: "Students",
      routeName: "/students",
      iconName: PiStudent,
      icon: <PiStudent />,
    },
    { name: "Billing", routeName: "", iconName: GrMoney, icon: <GrMoney /> },
    {
      name: "Learning",
      routeName: "",
      iconName: PiBooksDuotone,
      icon: <PiBooksDuotone />,
    },
  ];

  const activeUser = {
    firstName: "Steven",
    lastName: "Jobs",
    profilePic:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  return (
    <Sidebar>
      <Sidebar.Logo href="/" img={logo} imgAlt="logo">
        <div>KinderCare</div>
      </Sidebar.Logo>
      <Sidebar.Items className="text-start">
        <Sidebar.ItemGroup>
          {SidebarList.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={item.routeName}
                  className={({ isActive, isPending }) =>
                    `flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group ${
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-gray-200 dark:bg-gray-700"
                        : ""
                    }`
                  }
                >
                  {item.icon}
                  <span className="ms-3">{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#">
            <UserAvatar
              firstName={activeUser.firstName}
              lastName={activeUser.lastName}
              imgURL={activeUser.profilePic}
            />
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
