import { Card } from "flowbite-react";
import PageHeader from "../Layout/PageHeader/PageHeader";
import ChatList from "./ChatList/ChatList";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function ChatCenter(): JSX.Element {
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  function selectConversation(id:any){
    setSelectedConversationId(id);
  };

  return (
    <>
      <PageHeader title="Message Center" />
      <Card className="w-full block shadow-lg pointer flex flex-col font-medium gap-6 p-0">
        <div className="flex">
        <ChatList selectConversation={selectConversation} selectedConversationId={selectedConversationId}></ChatList>
        {selectedConversationId && (
        <Outlet></Outlet>
      )}
        {/* <ChatContent></ChatContent> */}
        </div>
      </Card>
    </>
  );
}
