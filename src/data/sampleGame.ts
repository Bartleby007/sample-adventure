import { Game, GameRoom, GameItem, GameInteraction } from '../types/game';

const rooms: { [id: string]: GameRoom } = {
  entrance: {
    id: 'entrance',
    name: 'Mysterious Entrance',
    description: 'You stand before an ancient stone doorway covered in strange symbols. The air is thick with mystery and the faint smell of old parchment. To the north, a dimly lit corridor beckons.',
    exits: { north: 'corridor' },
    items: [
      {
        id: 'note',
        name: 'Crumpled Note',
        description: 'A yellowed piece of paper with barely legible writing: "The key lies where shadows dance with light."',
        canTake: true
      }
    ],
    interactions: [
      {
        id: 'examine_symbols',
        name: 'Examine Symbols',
        description: 'Ancient runes that seem to shimmer in the dim light',
        result: 'The symbols appear to be some kind of warning or riddle. They seem to pulse with an otherworldly energy.'
      }
    ]
  },
  
  corridor: {
    id: 'corridor',
    name: 'Shadowy Corridor',
    description: 'A long, narrow hallway stretches before you. Flickering torches cast dancing shadows on the weathered stone walls. You can go east to what appears to be a library, west to a locked door, or south back to the entrance.',
    exits: { east: 'library', west: 'lockedroom', south: 'entrance' },
    interactions: [
      {
        id: 'examine_shadows',
        name: 'Examine Shadows',
        description: 'The dancing shadows on the wall',
        result: 'As you study the shadows more closely, you notice they form patterns that seem almost... intentional. Like a message written in darkness.'
      }
    ]
  },
  
  library: {
    id: 'library',
    name: 'Ancient Library',
    description: 'Towering bookshelves line the walls, filled with dusty tomes and scrolls. A single beam of sunlight filters through a high window, illuminating particles of dust floating in the air. An old desk sits in the center of the room.',
    exits: { west: 'corridor' },
    items: [
      {
        id: 'book',
        name: 'Leather-bound Book',
        description: 'An old book titled "Secrets of the Ancient Order". Its pages contain cryptic diagrams and incantations.',
        canTake: true
      }
    ],
    interactions: [
      {
        id: 'search_desk',
        name: 'Search Desk',
        description: 'An ornate wooden desk covered in papers',
        result: 'You find various papers and quills, but hidden in a secret drawer, you discover an ornate brass key!',
        action: () => {
          // This would add the key to inventory
        }
      }
    ]
  },
  
  lockedroom: {
    id: 'lockedroom',
    name: 'Locked Chamber',
    description: 'A heavy wooden door blocks your path. An intricate lock mechanism sits in the center, waiting for the right key.',
    exits: { east: 'corridor' },
    interactions: [
      {
        id: 'use_key',
        name: 'Use Brass Key',
        description: 'Try to unlock the door with the brass key',
        requiredItem: 'key',
        result: 'The key turns with a satisfying click! The door swings open to reveal the treasure chamber beyond.',
        action: () => {
          // This would change the room or add new exit
        }
      }
    ]
  }
};

export const sampleGame: Game = {
  title: 'The Mysterious Chamber',
  description: 'A short adventure game demonstrating text and point-and-click mechanics.',
  startingRoom: 'entrance',
  rooms
};