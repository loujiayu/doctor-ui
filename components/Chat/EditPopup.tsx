import React, { useState } from 'react';
import { Message } from "@/types";

// App Component
interface AppProps {
  onSend: (message: Message, cleanup: boolean) => void;
  initPrompt: string;
  system: string;
  setSystem: React.Dispatch<React.SetStateAction<string>>;
  index: string;
}

const App: React.FC<AppProps> = ({ onSend, setSystem, index, initPrompt, system }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSend = (newMessages: Message[], cleanup: boolean) => {
    setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    // Passing the messages to the onSend function passed from the parent component
    const systemMessage = newMessages.find(message => message.role == "system");
    setSystem(newMessages.find(message => message.role == "system")?.content!)
    
    const userMessage = newMessages.find(message => message.role == "user");
    onSend(userMessage!, cleanup);

    fetch(`${process.env.API_URL}/editprompt?editprompt`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // Make sure to set the content type
      },
      body: JSON.stringify({
        file_name: index,
        new_content: JSON.stringify({
          system: systemMessage?.content,
          prompt: userMessage?.content
        })
      }),
    })
  };

  return (
    <div>
      <button onClick={openPopup} style={editButtonStyle}>Edit</button>
      {
        system && 
        initPrompt &&
        <Popup
          isOpen={isPopupOpen}
          onClose={closePopup}
          onSend={handleSend} // Pass handleSend to Popup
          system={system}
          user={initPrompt}
        />
      }
      

    </div>
  );
};

// Popup Component
interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  system: string;
  user: string;
  onSend: (messages: Message[], cleanup: boolean) => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, system, user, onSend }) => {
  const [systemText, setSystemText] = useState<string>(system);
  const [userText, setUserText] = useState<string>(user);

  const handleSave = () => {
    // Create the messages in the required format
    const newMessages: Message[] = [
      { role: 'system', content: systemText },
      { role: 'user', content: userText },
    ];

    // Send the messages to the parent component
    onSend(newMessages, true);

    // Close the popup after saving
    onClose();
  };

  // Close the popup if clicking outside of the popup
  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null; // Do not render if the popup is not open

  return (
    <div style={overlayStyle} onClick={handleClickOutside}>
      <div style={popupStyle}>
        <h2>Prompt Edit</h2>
        <div>
          <label>AI role:</label>
          <textarea
            value={systemText}
            onChange={(e) => setSystemText(e.target.value)}
            placeholder="Enter text for System"
            style={textareaStyle}
          />
        </div>
        <div>
          <label>Prompt:</label>
          <textarea
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder="Enter text for User"
            style={textareaStyle}
          />
        </div>
        <div>
          <button onClick={handleSave}>Save</button>
          {/* <button onClick={onClose}>Close</button> */}
        </div>
      </div>
    </div>
  );
};

// Styles for the popup and overlay
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000, // Ensure the overlay is on top of everything
};


// Style for the Edit button
const editButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50', // Green color
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s',
  marginBottom: '20px', // Space between the button and messages section
};

const popupStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  width: '600px', // Adjusted width for large textareas
  textAlign: 'center',
  zIndex: 1001, // Ensure the popup is on top of the overlay
};

const textareaStyle: React.CSSProperties = {
  width: '100%', // Full width of the parent container
  height: '300px', // Doubled the height for a larger textarea
  resize: 'none', // Disable resizing (optional)
  marginTop: '8px',
  padding: '8px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

export default App;
