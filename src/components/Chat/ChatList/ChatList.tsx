import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "../Chat.service";
import { Link } from "react-router-dom";
import Loading from "../../Shared/Loading";

type ChatListProps = {
  selectConversation: any;
  selectedConversationId: any;
};
export default function ChatList({
  selectConversation,
  selectedConversationId,
}: ChatListProps): JSX.Element {
  const {
    data: conversations,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["chat"],
    queryFn: fetchChats,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col w-1/4 border-r border-gray-900 overflow-y-auto rounded-l-lg">
      <div className="bg-gray-700 p-2 px-4 text-start">Chat</div>
      {conversations.map((conversation: any) => (
        <Link
          key={conversation.conversation_id}
          to={`/chat/${conversation.conversation_id}`}
          onClick={() => selectConversation(conversation.conversation_id)}
        >
          <div
            className={`p-3 rounded cursor-pointer hover:bg-gray-900 text-start ${
              selectedConversationId === conversation.conversation_id
                ? "bg-gray-900"
                : ""
            }`}
          >
            <div className="font-bold">
              {conversation.participants.map((p: any) => p.name).join(", ")}
            </div>
            <div className="text-sm text-gray-500">
              {conversation.messages[conversation.messages.length - 1]?.text}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
