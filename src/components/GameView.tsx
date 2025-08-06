import React, { useEffect, useRef } from 'react';
import { GameRoom } from '../types/game';
import { Eye } from 'lucide-react';

interface GameViewProps {
  messages: string[];
  currentRoom: GameRoom;
  onLook: () => void;
}

const GameView: React.FC<GameViewProps> = ({ messages, currentRoom, onLook }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-green-300">{currentRoom.name}</h2>
          <button
            onClick={onLook}
            className="bg-gray-700 hover:bg-gray-600 text-green-400 px-3 py-2 rounded transition-colors flex items-center text-sm"
            title="Look around (re-describe room)"
          >
            <Eye className="mr-1" size={16} />
            Look
          </button>
        </div>
        <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
          {currentRoom.image ? (
            <img 
              src={currentRoom.image} 
              alt={currentRoom.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-gray-500 text-lg">
              [Room Illustration]
            </div>
          )}
        </div>
      </div>

      <div className="bg-black rounded-lg p-4 h-64 overflow-y-auto border border-gray-600">
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div 
              key={index}
              className="text-green-400 leading-relaxed animate-fadeIn"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              {message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default GameView;