import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Message, MedResponse, Prompt } from "@/types";
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
    <ChatWrapper name="Vital Signs" index="2"/>
    <ChatWrapper name="Age & Sex" index="3"/>
    <ChatWrapper name="Lab Results" index="4"/>
    <ChatWrapper name="Medication List" index="5"/>
    <ChatWrapper name="Past Medical History (PMH)" index="6"/>
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

  const handleSend = async (message: Message, cleanup: boolean = false, systemString: string = "") => {
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

    const systemMessage: Message = { role: "system", content: systemString! };
    const payloadMessages = updatedMessages.slice();
    payloadMessages.unshift(systemMessage);
    const response = await fetch(`${process.env.API_URL}/chat?${params}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // Make sure to set the content type
      },
      body: JSON.stringify({
        messages: payloadMessages
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
    const response = await fetch(`${process.env.API_URL}/fetchprompt`);
    if (!response.body) {
      return;
    }

    const data: any = await convertDataToResponse(response.body)
    if (!data) {
      return;
    }

    try {
      const aiPrompt = JSON.parse(data[index]) as Prompt;
      setInitPrompt(aiPrompt.prompt)
      setSystem(aiPrompt.system);
      return aiPrompt;

    } catch (error) {
      console.log(error);
      console.log(index, "prompt parsing error");
      setInitPrompt("undefined")
      setSystem("undefined");
      return {
        prompt: "",
        system: ""
      };
    }
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

        if (prompt?.system != null) {
          handleSend({role: 'user', content: prompt?.prompt!}, true, prompt?.system);
        }
      })
    }
  }, []);


  return (
    <div className="flex justify-center"> {/* Centering the ChatWrapper */}
      <div className="w-[800px] h-[1200px]"> {/* Fixed width set to 400px */}
        <div className="flex">
          <div>{name}</div>

          <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10 max-h-[1000px]">
            <div className="max-w-[800px] mx-auto mt-4 sm:mt-12">
              <Chat
                messages={messages}
                loading={loading}
                initPrompt={initPrompt}
                system={system}
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
