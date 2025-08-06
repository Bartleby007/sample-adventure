import React from 'react';
import { GameItem } from '../types/game';
import { Package, Eye } from 'lucide-react';

interface InventoryProps {
  items: GameItem[];
  onUseItem: (item: GameItem) => void;
}

const Inventory: React.FC<InventoryProps> = ({ items, onUseItem }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center mb-3">
        <Package className="mr-2 text-green-400" size={20} />
        <h3 className="text-xl font-semibold text-green-300">Inventory</h3>
      </div>
      
      {items.length === 0 ? (
        <p className="text-gray-500 italic">Your inventory is empty.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div 
              key={`${item.id}-${index}`}
              className="bg-gray-700 rounded p-3 border border-gray-600 hover:border-green-500 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-green-400 font-medium">{item.name}</h4>
                  <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                </div>
                <button
                  onClick={() => onUseItem(item)}
                  className="ml-2 p-1 text-green-400 hover:text-green-300 transition-colors"
                  title={`Use ${item.name}`}
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;