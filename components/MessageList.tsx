import { useEffect, useRef } from 'react';
import { Message } from '@/app/page';
import { UserIcon, CpuChipIcon } from '@heroicons/react/24/solid';

type MessageListProps = {
  messages: Message[];
};

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`py-8 px-4 ${
              message.role === 'assistant' ? 'bg-gray-800' : 'bg-gray-900'
            }`}
          >
            <div className="flex gap-4 max-w-3xl mx-auto">
              <div className={`flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center ${
                message.role === 'assistant' ? 'bg-green-600' : 'bg-blue-600'
              }`}>
                {message.role === 'assistant' ? (
                  <CpuChipIcon className="w-5 h-5 text-white" />
                ) : (
                  <UserIcon className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex-1 text-gray-200 whitespace-pre-wrap">
                {message.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
