import { useState, useRef, useEffect } from 'react';
import { Conversation, Message } from '@/app/page';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import MessageList from './MessageList';

type ChatInterfaceProps = {
  conversation: Conversation | undefined;
  onUpdateConversation: (conversation: Conversation) => void;
  onNewConversation: () => void;
};

export default function ChatInterface({
  conversation,
  onUpdateConversation,
  onNewConversation,
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    // If no conversation exists, create one
    if (!conversation) {
      onNewConversation();
      return;
    }

    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, userMessage],
      title: conversation.messages.length === 0 ? input.trim().slice(0, 30) : conversation.title,
    };

    onUpdateConversation(updatedConversation);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedConversation.messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      onUpdateConversation({
        ...updatedConversation,
        messages: [...updatedConversation.messages, assistantMessage],
      });
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure you have set up your OpenAI API key in the .env.local file.',
        timestamp: new Date(),
      };
      onUpdateConversation({
        ...updatedConversation,
        messages: [...updatedConversation.messages, errorMessage],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {conversation && conversation.messages.length > 0 ? (
        <MessageList messages={conversation.messages} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-300">ChatGPT Clone</h1>
            <p>Send a message to start the conversation</p>
          </div>
        </div>
      )}

      <div className="border-t border-gray-800 bg-gray-900 p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3 bg-gray-800 rounded-lg p-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none max-h-32 py-2 px-2"
              rows={1}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
