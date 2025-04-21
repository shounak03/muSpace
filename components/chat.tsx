// app/components/Chat.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { chatService } from '@/lib/chat-service';
import { Message } from '../types/index';
import { getMail } from '@/app/action';

interface ChatProps {
  spaceId: string;
}

export default function Chat({ spaceId }: ChatProps) {
  const [email, setEmail] = useState('')
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isAtBottom = useRef(true);
 
    async function fetchMail() {
        const mail = await getMail()
        setEmail(mail)
    }
    useEffect(()=>{
        fetchMail()
    },[])

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    if (messagesEndRef.current && isAtBottom.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check if user is at bottom when scrolling
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      isAtBottom.current = Math.abs(scrollHeight - scrollTop - clientHeight) < 10;
    }
  };


  useEffect(() => {
    const loadInitialMessages = async () => {
      setLoading(true);
      chatService.reset();
      const initialMessages = await chatService.fetchMessages(spaceId);
      console.log("ini msgs = ",initialMessages);
      
      setMessages(initialMessages);
      setLoading(false);
    };

    loadInitialMessages();

    return () => {
      chatService.reset();
    };
  }, [spaceId]);


  useEffect(() => {
    let isMounted = true;

    const pollMessages = async () => {
      while (isMounted) {
        const newMessages = await chatService.fetchMessages(spaceId);
        console.log(newMessages);
        
        if (isMounted && newMessages.length > 0) {
          setMessages(prevMessages => {

            const existingIds = new Set(prevMessages.map(msg => msg.id));
            const uniqueNewMessages = newMessages.filter(msg => !existingIds.has(msg.id));
            
            if (uniqueNewMessages.length === 0) return prevMessages;
            
            return [...prevMessages, ...uniqueNewMessages];
          });
        }
        
        
      }
    };

    pollMessages();

    return () => {
      isMounted = false;
    };
  }, [spaceId]);


  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Optimistically add message to UI
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      content: newMessage,
    //   userId: session.user.id as string,
      user: {
    //     id: session.user.id as string,
        // name: session.user.name,
            email :email,
      },
      spaceId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setMessages(prev => [...prev, optimisticMessage]);
    setNewMessage('');
    
    // Send to server
    await chatService.sendMessage({
      content: newMessage,
      spaceId,
    });
    
    // Force scroll to bottom
    isAtBottom.current = true;
    scrollToBottom();
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    const messageDate = new Date(date);
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow overflow-hidden mt-7">
      <div className="px-4 py-3 bg-gray-700 border-b border-gray-600">
        <h3 className="text-lg font-medium text-white">Chat</h3>
      </div>

      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto" onScroll={handleScroll}>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-400">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isCurrentUser = message.user.email === email

              return (
                <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} items-end max-w-[75%] gap-2`}
                  >
                    <div>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-100"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      </div>
                      <div className={`text-xs text-gray-400 mt-1 ${isCurrentUser ? "text-right" : "text-left"}`}>
                        {message.user.email} • {formatTime(message.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 bg-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={!newMessage.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
