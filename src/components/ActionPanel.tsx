import React from 'react';
import { GameRoom, GameItem, GameInteraction } from '../types/game';
import { ArrowRight, Hand, MessageSquare, Navigation, Eye } from 'lucide-react';

interface ActionPanelProps {
  currentRoom: GameRoom;
  onMove: (direction: string) => void;
  onTakeItem: (item: GameItem) => void;
  onInteract: (interaction: GameInteraction) => void;
  visitedRooms: Set<string>;
  onLook: () => void;
}

const ActionPanel: React.FC<ActionPanelProps> = ({
  currentRoom,
  onMove,
  onTakeItem,
  onInteract,
  visitedRooms,
  onLook
}) => {
  const directions = Object.entries(currentRoom.exits);
  const items = currentRoom.items?.filter(item => !item.hidden) || [];
  const interactions = currentRoom.interactions?.filter(interaction => !interaction.hidden) || [];

  const getDirectionLabel = (direction: string) => {
    const labels: { [key: string]: string } = {
      north: 'North ↑',
      south: 'South ↓',
      east: 'East →',
      west: 'West ←',
      up: 'Up ⬆',
      down: 'Down ⬇',
      northeast: 'Northeast ↗',
      northwest: 'Northwest ↖',
      southeast: 'Southeast ↘',
      southwest: 'Southwest ↙'
    };
    return labels[direction] || direction;
  };

  return (
    <div className="space-y-4">
      {/* Look Command */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <button
          onClick={onLook}
          className="w-full bg-gray-700 hover:bg-gray-600 text-green-400 p-3 rounded transition-colors flex items-center justify-center"
        >
          <Eye className="mr-2" size={16} />
          Look Around
        </button>
      </div>

      {/* Exits */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center mb-3">
          <Navigation className="mr-2 text-green-400" size={20} />
          <h3 className="text-lg font-semibold text-green-300">Exits</h3>
        </div>
        
        {directions.length === 0 ? (
          <p className="text-gray-500 italic">No exits available.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {directions.map(([direction, roomId]) => (
              <button
                key={direction}
                onClick={() => onMove(roomId)}
                className="bg-gray-700 hover:bg-gray-600 text-green-400 px-3 py-2 rounded transition-colors flex items-center justify-between text-sm"
              >
                <span>{getDirectionLabel(direction)}</span>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Items */}
      {items.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center mb-3">
            <Hand className="mr-2 text-green-400" size={20} />
            <h3 className="text-lg font-semibold text-green-300">Items</h3>
          </div>
          
          <div className="space-y-2">
            {items.map((item) => (
              <div 
                key={item.id}
                className="bg-gray-700 rounded p-3 border border-gray-600"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-green-400 font-medium">{item.name}</h4>
                    <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                  </div>
                  {item.canTake && (
                    <button
                      onClick={() => onTakeItem(item)}
                      className="ml-2 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      Take
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactions */}
      {interactions.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center mb-3">
            <MessageSquare className="mr-2 text-green-400" size={20} />
            <h3 className="text-lg font-semibold text-green-300">Actions</h3>
          </div>
          
          <div className="space-y-2">
            {interactions.map((interaction) => (
              <button
                key={interaction.id}
                onClick={() => onInteract(interaction)}
                className="w-full bg-gray-700 hover:bg-gray-600 text-green-400 p-3 rounded transition-colors text-left"
              >
                <div className="font-medium">{interaction.name}</div>
                <div className="text-gray-400 text-sm mt-1">{interaction.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionPanel;