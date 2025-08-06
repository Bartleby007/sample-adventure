# Adventure Game Engine

A flexible web-based adventure game engine that supports both text adventures (like Zork) and point-and-click games (like Submachine).

## Features

- **Dual Game Modes**: Supports both text-based adventures and point-and-click gameplay
- **Room System**: Navigate between different locations with descriptions and interactions
- **Inventory Management**: Collect and use items throughout your adventure
- **Interactive Elements**: Examine objects, solve puzzles, and uncover secrets
- **Save/Load System**: Your progress is automatically saved in the browser
- **Responsive Design**: Works on desktop and mobile devices
- **Easy Customization**: Simple game definition system for creating your own adventures

## How to Create Your Own Game

1. **Define Your Game Structure**: Edit `src/data/sampleGame.ts` to create your own adventure
2. **Add Rooms**: Create room objects with descriptions, exits, items, and interactions
3. **Set Up Items**: Define collectible items with descriptions and properties
4. **Create Interactions**: Add clickable actions that players can perform
5. **Test Your Game**: Use the save/load system to test different paths

## Game Definition Format

```typescript
const myGame: Game = {
  title: "Your Game Title",
  description: "Brief description of your adventure",
  startingRoom: "first_room",
  rooms: {
    first_room: {
      id: "first_room",
      name: "Room Name",
      description: "Detailed room description",
      exits: { north: "second_room" },
      items: [/* array of items */],
      interactions: [/* array of clickable actions */]
    }
  }
};
```

## Sharing Your Games

1. **GitHub Pages**: Push your code to GitHub and enable GitHub Pages
2. **Netlify**: Connect your repository to Netlify for automatic deployments
3. **Local Sharing**: Run `npm run build` and share the `dist` folder

## Tips for Game Design

- **Start Simple**: Begin with a few rooms and expand gradually
- **Clear Descriptions**: Make room descriptions vivid and engaging
- **Logical Puzzles**: Ensure puzzles have clear solutions and hints
- **Test Thoroughly**: Play through your game multiple times
- **Get Feedback**: Share with friends and family for testing

## Building and Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Your adventure awaits!