import { useQuery } from "@tanstack/react-query";
import { TextInput } from "flowbite-react";
import { fetchChatsDetails } from "../Chat.service";
import { useParams } from "react-router-dom";

export default function ChatContent(): JSX.Element {
  const { id } = useParams();

  const {
    data: conversation,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["chat", id],
    queryFn: () => fetchChatsDetails(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {conversation && (
        <div className="w-3/4 flex flex-col rounded-r-lg">
          <div className="bg-gray-900 p-2 px-4 text-start rounded-tr-lg">
            {conversation.participants[0].name}
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {conversation.messages.map((message: any) => (
              <div
                key={message.message_id}
                className={`mb-4 flex  ${
                  message.sender_id === "user1"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex flex-col gap-2 p-2 rounded-lg ${
                    message.sender_id === "user1"
                      ? "bg-green-900"
                      : "bg-gray-700"
                  }`}
                >
                  <div>
                    <div className="text-start text-sm text-red-500">
                      {
                        conversation.participants.find(
                          (p: any) => p.user_id === message.sender_id
                        ).name
                      }
                    </div>
                    <div>{message.text}</div>
                  </div>
                  <div className="text-start text-xs text-gray-400">
                    {new Date(message.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 mb-3">
          <TextInput id="id" name="id" type="text" required />
          </div>

          {/* <MessageInput /> */}
        </div>
      )}
    </>
  );
}
