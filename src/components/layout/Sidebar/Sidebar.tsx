import AvatarView from "../../Shared/Avatar";
import { Sidebar } from "flowbite-react";
import logo from "../../../assets/favicon.ico";

import { PiBooksDuotone, PiStudent } from "react-icons/pi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { GrMoney } from "react-icons/gr";

export function SidebarNav() {
  return (
    <Sidebar className="bg-gray-900">
      <Sidebar.Logo href="#" img={logo} imgAlt="logo">
        <div className="text-gray-900">KinderCare</div>
      </Sidebar.Logo>
      <Sidebar.Items className="text-start">
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/" icon={AiOutlineHome}>
            Home
          </Sidebar.Item>
          <Sidebar.Item href="/my-classes" icon={BiCategory}>My Classes</Sidebar.Item>
          <Sidebar.Item href="/messages" icon={IoChatboxEllipsesOutline} label="3" labelColor="dark">
            Messaging
          </Sidebar.Item>
          <Sidebar.Item href={`/student-list`} icon={PiStudent}>
            Students
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={GrMoney}>
            Billing
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={PiBooksDuotone}>
            Learning
          </Sidebar.Item>

        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#">
            <AvatarView
              firstName="Steven"
              lastName="Jobs"
              imgURL="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    // <div className="h-full w-full rounded-lg overflow-hidden shadow-lg bg-gray-900 max-w-[20rem] p-4 shadow-xl shadow-gray-900/5">
    //   <div className="px-6 py-4">
    //     <div className="font-bold text-xl mb-2">
    //       KinderCare
    //     </div>
    //   </div>
    //   <div className="flex flex-col justify-between h-5/6">
    //     <div>
    //         <ul>
    //             <li>Home</li>
    //             <li>My Classes</li>
    //             <li>Messaging</li>
    //             <li>Student List</li>
    //             <li>Billing</li>
    //             <li>Learning</li>
    //         </ul>
    //     </div>
    //     <div>
    //       <button className="outline bg-gray-900 hover:bg-blue-700 text-white font-bold p-4 rounded w-full">
    //         <AvatarView firstName="Steven" lastName="Jobs" imgURL="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"/>
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
