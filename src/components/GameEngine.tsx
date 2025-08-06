import React, { useState, useEffect } from 'react';
import { Game, GameState, GameRoom, GameItem, GameInteraction } from '../types/game';
import { sampleGame } from '../data/sampleGame';
import GameView from './GameView';
import Inventory from './Inventory';
import ActionPanel from './ActionPanel';
import GameControls from './GameControls';

const GameEngine: React.FC = () => {
  const [game] = useState<Game>(sampleGame);
  const [gameState, setGameState] = useState<GameState>({
    currentRoomId: game.startingRoom,
    inventory: [],
    visitedRooms: new Set([game.startingRoom]),
    gameData: {}
  });
  
  const [currentRoom, setCurrentRoom] = useState<GameRoom>(game.rooms[game.startingRoom]);
  const [messages, setMessages] = useState<string[]>([
    `Welcome to ${game.title}`,
    game.description,
    currentRoom.description
  ]);

  useEffect(() => {
    setCurrentRoom(game.rooms[gameState.currentRoomId]);
  }, [gameState.currentRoomId, game.rooms]);

  const addMessage = (message: string) => {
    setMessages(prev => [...prev, message]);
  };

  const moveToRoom = (roomId: string) => {
    if (!game.rooms[roomId]) {
      addMessage("You can't go that way.");
      return;
    }

    const newRoom = game.rooms[roomId];
    const wasVisited = gameState.visitedRooms.has(roomId);
    
    setGameState(prev => ({
      ...prev,
      currentRoomId: roomId,
      visitedRooms: new Set([...prev.visitedRooms, roomId])
    }));

    if (!wasVisited) {
      addMessage(`You enter the ${newRoom.name}.`);
      addMessage(newRoom.description);
    } else {
      addMessage(`You return to the ${newRoom.name}.`);
    }
  };

  const takeItem = (item: GameItem) => {
    if (!item.canTake) {
      addMessage(`You can't take the ${item.name}.`);
      return;
    }

    setGameState(prev => ({
      ...prev,
      inventory: [...prev.inventory, item]
    }));

    // Remove item from room
    setCurrentRoom(prev => ({
      ...prev,
      items: prev.items?.filter(i => i.id !== item.id) || []
    }));
    
    // Update the game rooms data
    game.rooms[currentRoom.id] = {
      ...game.rooms[currentRoom.id],
      items: currentRoom.items?.filter(i => i.id !== item.id) || []
    };
    
    addMessage(`You take the ${item.name}.`);
  };

  const useItem = (item: GameItem, interaction?: GameInteraction) => {
    if (interaction && interaction.requiredItem === item.id) {
      addMessage(interaction.result);
      if (interaction.action) {
        interaction.action();
      }
    } else {
      addMessage(`You can't use the ${item.name} here.`);
    }
  };

  const performInteraction = (interaction: GameInteraction) => {
    if (interaction.requiredItem) {
      const hasRequiredItem = gameState.inventory.some(item => item.id === interaction.requiredItem);
      if (!hasRequiredItem) {
        addMessage(`You need something to ${interaction.name.toLowerCase()}.`);
        return;
      }
    }

    addMessage(interaction.result);
    if (interaction.action) {
      interaction.action();
    }
  };

  const saveGame = () => {
    try {
      localStorage.setItem('adventureGameSave', JSON.stringify(gameState));
      addMessage('Game saved successfully!');
    } catch (error) {
      addMessage('Failed to save game.');
    }
  };

  const loadGame = () => {
    try {
      const savedState = localStorage.getItem('adventureGameSave');
      if (savedState) {
        const loadedState = JSON.parse(savedState);
        setGameState(loadedState);
        setCurrentRoom(game.rooms[loadedState.currentRoomId]);
        addMessage('Game loaded successfully!');
      } else {
        addMessage('No saved game found.');
      }
    } catch (error) {
      addMessage('Failed to load game.');
    }
  };

  const resetGame = () => {
    setGameState({
      currentRoomId: game.startingRoom,
      inventory: [],
      visitedRooms: new Set([game.startingRoom]),
      gameData: {}
    });
    setMessages([
      `Welcome to ${game.title}`,
      game.description,
      game.rooms[game.startingRoom].description
    ]);
  };

  const lookAround = () => {
    addMessage(`--- ${currentRoom.name} ---`);
    addMessage(currentRoom.description);
    
    const visibleItems = currentRoom.items?.filter(item => !item.hidden) || [];
    if (visibleItems.length > 0) {
      addMessage("You can see:");
      visibleItems.forEach(item => {
        addMessage(`  • ${item.name}: ${item.description}`);
      });
    }
    
    const availableExits = Object.keys(currentRoom.exits);
    if (availableExits.length > 0) {
      addMessage(`Exits: ${availableExits.join(', ')}`);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      <div className="container mx-auto px-4 py-6">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-green-300 mb-2">{game.title}</h1>
          <p className="text-gray-400 text-lg">{game.description}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GameView 
              messages={messages}
              currentRoom={currentRoom}
              onLook={lookAround}
            />
          </div>
          
          <div className="space-y-6">
            <Inventory 
              items={gameState.inventory}
              onUseItem={useItem}
            />
            
            <ActionPanel
              currentRoom={currentRoom}
              onMove={moveToRoom}
              onTakeItem={takeItem}
              onInteract={performInteraction}
              visitedRooms={gameState.visitedRooms}
              onLook={lookAround}
            />
            
            <GameControls
              onSave={saveGame}
              onLoad={loadGame}
              onReset={resetGame}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameEngine;