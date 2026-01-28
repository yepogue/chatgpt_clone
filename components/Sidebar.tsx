import { Conversation } from '@/app/page';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

type SidebarProps = {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
};

export default function Sidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}: SidebarProps) {
  return (
    <div className="w-80 bg-gray-950 border-r border-gray-800 flex flex-col">
      <div className="p-4">
        <button
          onClick={onNewConversation}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          New Chat
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`group flex items-center justify-between px-3 py-3 mb-1 rounded-lg cursor-pointer transition-colors ${
              currentConversationId === conversation.id
                ? 'bg-gray-800'
                : 'hover:bg-gray-800'
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <span className="flex-1 text-sm text-gray-200 truncate">
              {conversation.title}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteConversation(conversation.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-opacity"
            >
              <TrashIcon className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
