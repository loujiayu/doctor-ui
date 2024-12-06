import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Message, MedResponse } from "@/types";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

const HomeStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  padding: 30
};

export default function Home() {
  return <div style={HomeStyle}>
    <ChatWrapper name="Symptoms" index="1" />
    {/* <ChatWrapper name="Vital Signs"/>
    <ChatWrapper name="Age & Sex" />
    <ChatWrapper name="Lab Results"/>
    <ChatWrapper name="Medication List"/>
    <ChatWrapper name="Past Medical History (PMH)"/> */}
  </div>
}

interface ChatWrapperProps {
  name: string;
  index: string;
}

async function convertDataToResponse(data: ReadableStream<Uint8Array>) {
  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let accumulatedText = "";

  // Read the entire stream and accumulate the text
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    accumulatedText += decoder.decode(value, { stream: true });
  }

  try {
    // Parse the accumulated text to JSON and return it as a MedResponse object
    const response = JSON.parse(accumulatedText) as MedResponse;
    return response;
  } catch (error) {
    console.error("Failed to parse response:", error);
    return null; // or you can throw an error if needed
  }
}

const ChatWrapper: React.FC<ChatWrapperProps> = ({ name, index }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [threadId, setThreadId] = useState<string>();
  const [system, setSystem] = useState<string>("");
  const [initPrompt, setInitPrompt] = useState<string>("");
  const hasRun = useRef(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (message: Message, cleanup: boolean = false) => {
    let updatedMessages = [...messages, message];
    if (cleanup) {
      updatedMessages = [message];
    }

    setMessages(updatedMessages);
    setLoading(true);

    const params = new URLSearchParams({
      prompt: message.content,
    });
    
    if (threadId) {
      params.append('thread_id', threadId!);
    }

    // const systemMessage: Message = { role: "system", content: system! };
    // payloadMessages.unshift(systemMessage);
    const response = await fetch(`${process.env.API_URL}/chat?${params}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // Make sure to set the content type
      },
      body: JSON.stringify({
        messages: updatedMessages
      }),
    });

    if (response.status != 200) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    const data = response.body;

    if (!data) {
      return;
    }

    setLoading(false);

    const chatResponse: any = await convertDataToResponse(data);

    setMessages((messages) => [
      ...messages,
      {
        role: "assistant",
        content: chatResponse.response
      }
    ]);
  };

  const fetchInitPrompt = async () => {
    setInitPrompt("jfal")
    const response = await fetch(`${process.env.API_URL}/fetchprompt`);
    if (!response.body) {
      return;
    }

    const data: any = await convertDataToResponse(response.body)
    if (!data) {
      return;
    }
    return data[index];
  }

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! I'm an AI assistant. I can generate health-related prompts based on synthetic and device data, providing real-time feedback and visual metrics.`
      }
    ]);
  };

  useEffect(() => {
    if (!hasRun.current) {
      console.log("This effect runs only once, even in StrictMode.");
      hasRun.current = true;

      fetchInitPrompt().then(prompt => {

        handleSend({role: 'user', content: prompt});
      })
    }
  }, []);


  return (
    <div className="flex justify-center"> {/* Centering the ChatWrapper */}
      <div className="w-[800px] h-[600px]"> {/* Fixed width set to 400px */}
        <div className="flex">
          <div>{name}</div>

          <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10 max-h-[500px]">
            <div className="max-w-[800px] mx-auto mt-4 sm:mt-12">
              <Chat
                messages={messages}
                loading={loading}
                setMessages={setMessages}
                index={index}
                setSystem={setSystem}
                onSend={handleSend}
                onReset={handleReset}
              />
              <div ref={messagesEndRef} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
