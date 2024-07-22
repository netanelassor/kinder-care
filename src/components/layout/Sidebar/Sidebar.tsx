import UserAvatar from "../../Shared/Avatar";
import { Sidebar } from "flowbite-react";
import logo from "../../../assets/favicon.ico";
import { PiBooksDuotone, PiStudent, PiWechatLogoDuotone } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { GrMoney } from "react-icons/gr";
import { NavItemType } from "./SidebarItem.type";
import { Link } from "react-router-dom";

export function SidebarNav() {
  const SidebarList: NavItemType[] = [
    { name: "Home", routeName: "", iconName: IoHomeOutline },
    { name: "My Classes", routeName: "my-classes", iconName: BiCategory },
    {
      name: "Messaging",
      routeName: "messages",
      iconName: PiWechatLogoDuotone,
    },
    { name: "Students", routeName: "student-list", iconName: PiStudent },
    { name: "Billing", routeName: "", iconName: GrMoney },
    { name: "Learning", routeName: "", iconName: PiBooksDuotone },
  ];

  const activeUser = {
    firstName: "Steven",
    lastName: "Jobs",
    profilePic:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };
  return (
    <Sidebar className="bg-gray-900">
      <Sidebar.Logo href="#" img={logo} imgAlt="logo">
        <div className="text-gray-900">KinderCare</div>
      </Sidebar.Logo>
      <Sidebar.Items className="text-start">
        <Sidebar.ItemGroup>
          {SidebarList.map((item, index) => {
            return (
              <Sidebar.Item key={index} icon={item.iconName}>
                <Link to={item.routeName}> {item.name}</Link>
              </Sidebar.Item>
            );
          })}
          ;
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
