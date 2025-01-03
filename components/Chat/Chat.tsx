import { Message } from "@/types";
import { FC } from "react";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";
import { ResetChat } from "./ResetChat";
import EditPopup from './EditPopup';

interface Props {
  messages: Message[];
  index: string;
  initPrompt: string;
  system: string;
  loading: boolean;
  onSend: (message: Message) => void;
  onReset: () => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setSystem: React.Dispatch<React.SetStateAction<string>>;
}

export const Chat: FC<Props> = ({ messages, loading, onSend, onReset, setSystem, index, initPrompt, system }) => {
  return (
    <>
      {/* <div className="flex flex-row justify-between items-center mb-4 sm:mb-8">
        <ResetChat onReset={onReset} />
      </div> */}
      <EditPopup index={index} onSend={onSend} setSystem={setSystem} initPrompt={initPrompt} system={system} />
      <div className="flex flex-col rounded-lg px-2 sm:p-4 sm:border border-neutral-300">
        {messages.map((message, index) => (
          <div
            key={index}
            className="my-1 sm:my-1.5"
          >
            <ChatMessage message={message} />
          </div>
        ))}

        {loading && (
          <div className="my-1 sm:my-1.5">
            <ChatLoader />
          </div>
        )}

        <div className="mt-4 sm:mt-8 bottom-[56px] left-0 w-full">
          <ChatInput onSend={onSend} />
        </div>
      </div>
    </>
  );
};
