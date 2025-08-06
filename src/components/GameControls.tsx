import React from 'react';
import { Save, Upload, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  onSave: () => void;
  onLoad: () => void;
  onReset: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onSave, onLoad, onReset }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-lg font-semibold text-green-300 mb-3">Game Controls</h3>
      
      <div className="space-y-2">
        <button
          onClick={onSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded transition-colors flex items-center justify-center"
        >
          <Save className="mr-2" size={16} />
          Save Game
        </button>
        
        <button
          onClick={onLoad}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded transition-colors flex items-center justify-center"
        >
          <Upload className="mr-2" size={16} />
          Load Game
        </button>
        
        <button
          onClick={onReset}
          className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded transition-colors flex items-center justify-center"
        >
          <RotateCcw className="mr-2" size={16} />
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameControls;