export interface GameRoom {
  id: string;
  name: string;
  description: string;
  image?: string;
  exits: { [direction: string]: string };
  items?: GameItem[];
  interactions?: GameInteraction[];
  visited?: boolean;
}

export interface GameItem {
  id: string;
  name: string;
  description: string;
  canTake?: boolean;
  hidden?: boolean;
}

export interface GameInteraction {
  id: string;
  name: string;
  description: string;
  requiredItem?: string;
  result: string;
  action?: () => void;
  hidden?: boolean;
}

export interface GameState {
  currentRoomId: string;
  inventory: GameItem[];
  visitedRooms: Set<string>;
  gameData: { [key: string]: any };
}

export interface Game {
  title: string;
  description: string;
  startingRoom: string;
  rooms: { [id: string]: GameRoom };
  globalItems?: GameItem[];
}